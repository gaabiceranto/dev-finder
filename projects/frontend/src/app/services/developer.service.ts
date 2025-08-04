import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Developer } from '../models/developer.model';
import * as DevActions from '../store/dev/dev.actions';
import { DevState } from '../store/dev/dev.state';

@Injectable({
  providedIn: 'root',
})
export class DeveloperService {
  constructor(private store: Store<{ dev: DevState }>) {}

  getDevelopers(): Observable<Developer[]> {
    return this.store.select((state) => state.dev.developers);
  }

  getLoading(): Observable<boolean> {
    return this.store.select((state) => state.dev.loading);
  }

  getError(): Observable<string | null> {
    return this.store.select((state) => state.dev.error);
  }

  addDeveloper(developer: Developer): void {
    this.store.dispatch(DevActions.addDev(developer));
    this.store.dispatch(DevActions.addDevSuccess(developer));
  }

  loadDevelopers(): void {
    this.store.dispatch(DevActions.loadDevs());
  }

  deleteDeveloper(id: string): Observable<void> {
    this.store.dispatch(DevActions.deleteDev(id));
    return new Observable((observer) => {
      setTimeout(() => {
        this.store.dispatch(DevActions.deleteDevSuccess(id));
        observer.next();
        observer.complete();
      }, 100);
    });
  }

  updateDeveloper(developer: Developer): void {
    this.store.dispatch(DevActions.updateDev(developer));
    this.store.dispatch(DevActions.updateDevSuccess(developer));
  }
}
