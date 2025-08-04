import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Developer } from '../models/developer.model';

@Injectable({
  providedIn: 'root',
})
export class DeveloperEditService {
  private editingDeveloperSubject = new BehaviorSubject<Developer | null>(null);
  public editingDeveloper$ = this.editingDeveloperSubject.asObservable();

  setEditingDeveloper(developer: Developer | null): void {
    this.editingDeveloperSubject.next(developer);
  }

  getEditingDeveloper(): Developer | null {
    return this.editingDeveloperSubject.value;
  }

  clearEditingDeveloper(): void {
    this.editingDeveloperSubject.next(null);
  }
}
