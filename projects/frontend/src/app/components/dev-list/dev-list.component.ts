import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevCardComponent, Developer } from '../dev-card/dev-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dev-list',
  standalone: true,
  imports: [CommonModule, DevCardComponent, MatCardModule, MatIconModule],
  templateUrl: './dev-list.component.html',
  styleUrls: ['./dev-list.component.scss'],
})
export class DevListComponent implements OnInit {
  @Input() allDevelopers: Developer[] = [];
  @Input() searchTerm: string = '';

  ngOnInit() {}

  get filteredDevelopers(): Developer[] {
    if (!this.searchTerm.trim()) {
      return this.allDevelopers;
    }

    const term = this.searchTerm.toLowerCase().trim();
    return this.allDevelopers.filter(
      (dev) =>
        dev.name.toLowerCase().includes(term) ||
        dev.location.toLowerCase().includes(term) ||
        dev.technologies.some((tech) => tech.toLowerCase().includes(term))
    );
  }

  getTitle(): string {
    if (this.searchTerm.trim()) {
      return 'Resultados da Busca';
    }
    return 'Desenvolvedores Cadastrados';
  }
}
