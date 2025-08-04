import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs';
import { HeaderComponent } from '../../components/header/header.component';
import { DevFormComponent } from '../../components/dev-form/dev-form.component';
import { DevListComponent } from '../../components/dev-list/dev-list.component';
import { Developer } from '../../models/developer.model';
import { DeveloperService } from '../../services/developer.service';
import { DeveloperEditService } from '../../services/developer-edit.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, HeaderComponent, DevFormComponent, DevListComponent],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit, OnDestroy {
  searchTerm: string = '';
  developers: Developer[] = [];
  loading = false;
  private destroy$ = new Subject<void>();
  private searchSubject$ = new Subject<string>();

  constructor(
    private developerService: DeveloperService,
    private developerEditService: DeveloperEditService
  ) {}

  ngOnInit(): void {
    this.loadDevelopers();
    this.setupSearchDebounce();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.searchSubject$.complete();
  }

  private loadDevelopers(): void {
    this.developerService.loadDevelopers();

    this.developerService
      .getDevelopers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((developers) => {
        this.developers = developers;
      });

    this.developerService
      .getLoading()
      .pipe(takeUntil(this.destroy$))
      .subscribe((loading) => {
        this.loading = loading;
      });
  }

  onSearchChange(term: string) {
    this.searchSubject$.next(term);
  }

  onEditDeveloper(developer: Developer): void {
    this.developerEditService.setEditingDeveloper(developer);
    this.scrollToForm();
  }

  onDeleteDeveloper(developer: Developer): void {
    if (!developer.id) {
      alert('Erro: ID do desenvolvedor não encontrado');
      return;
    }

    if (
      confirm(
        `Tem certeza que deseja excluir o desenvolvedor "${developer.name}"?`
      )
    ) {
      this.developerService.deleteDeveloper(developer.id).subscribe({
        next: () => {
          console.log('Desenvolvedor excluído com sucesso');
        },
        error: (error: any) => {
          console.error('Erro ao excluir desenvolvedor:', error);
          alert('Erro ao excluir desenvolvedor. Tente novamente.');
        },
      });
    }
  }

  private scrollToForm(): void {
    const formElement = document.querySelector('.form-panel');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  private setupSearchDebounce(): void {
    this.searchSubject$
      .pipe(debounceTime(700), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((term) => {
        this.searchTerm = term;
      });
  }

  get filteredDevelopers(): Developer[] {
    if (!this.searchTerm.trim()) {
      return this.developers;
    }

    const searchLower = this.searchTerm.toLowerCase();
    return this.developers.filter(
      (dev) =>
        dev.name.toLowerCase().includes(searchLower) ||
        dev.city.toLowerCase().includes(searchLower) ||
        dev.technologies.some((tech) =>
          tech.toLowerCase().includes(searchLower)
        ) ||
        dev.education.toLowerCase().includes(searchLower)
    );
  }
}
