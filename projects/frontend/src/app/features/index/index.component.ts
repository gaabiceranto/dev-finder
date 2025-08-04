import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs';
import { HeaderComponent } from '../../components/header/header.component';
import { DevFormComponent } from '../../components/dev-form/dev-form.component';
import { DevListComponent } from '../../components/dev-list/dev-list.component';
import { Developer } from '../../models/developer.model';
import { DeveloperService } from '../../services/developer.service';

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

  constructor(private developerService: DeveloperService) {}

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

  private setupSearchDebounce(): void {
    this.searchSubject$
      .pipe(
        debounceTime(700),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
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
