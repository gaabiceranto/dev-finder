import { Injectable } from '@angular/core';
import { Developer } from '../models/developer.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly STORAGE_KEY = 'dev-finder-developers';

  getDevelopers(): Developer[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Erro ao carregar desenvolvedores do localStorage:', error);
      return [];
    }
  }

  saveDevelopers(developers: Developer[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(developers));
    } catch (error) {
      console.error('Erro ao salvar desenvolvedores no localStorage:', error);
    }
  }

  addDeveloper(developer: Developer): void {
    const developers = this.getDevelopers();
    developers.push(developer);
    this.saveDevelopers(developers);
  }

  updateDeveloper(updatedDeveloper: Developer): void {
    const developers = this.getDevelopers();
    const index = developers.findIndex((dev) => dev.id === updatedDeveloper.id);
    if (index !== -1) {
      developers[index] = updatedDeveloper;
      this.saveDevelopers(developers);
    }
  }

  deleteDeveloper(id: string): void {
    const developers = this.getDevelopers();
    const filteredDevelopers = developers.filter((dev) => dev.id !== id);
    this.saveDevelopers(filteredDevelopers);
  }

  clearAll(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error('Erro ao limpar localStorage:', error);
    }
  }
}
