import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Developer } from '../models/developer.model';
import * as DevActions from '../store/dev/dev.actions';
import { DevState } from '../store/dev/dev.state';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class DeveloperService {
  constructor(
    private store: Store<{ dev: DevState }>,
    private localStorageService: LocalStorageService
  ) {}

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
    this.localStorageService.addDeveloper(developer);
    this.store.dispatch(DevActions.addDevSuccess(developer));
  }

  loadDevelopers(): void {
    this.store.dispatch(DevActions.loadDevs());
    const developers = this.localStorageService.getDevelopers();
    this.store.dispatch(DevActions.loadDevsSuccess(developers));
  }

  deleteDeveloper(id: string): Observable<void> {
    this.store.dispatch(DevActions.deleteDev(id));
    this.localStorageService.deleteDeveloper(id);
    this.store.dispatch(DevActions.deleteDevSuccess(id));
    return of(void 0);
  }

  updateDeveloper(developer: Developer): void {
    this.store.dispatch(DevActions.updateDev(developer));
    this.localStorageService.updateDeveloper(developer);
    this.store.dispatch(DevActions.updateDevSuccess(developer));
  }
}
