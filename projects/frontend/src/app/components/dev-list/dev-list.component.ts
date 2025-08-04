import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevCardComponent } from '../dev-card/dev-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Developer } from '../../models/developer.model';

@Component({
  selector: 'app-dev-list',
  standalone: true,
  imports: [CommonModule, DevCardComponent, MatCardModule, MatIconModule],
  templateUrl: './dev-list.component.html',
  styleUrls: ['./dev-list.component.scss'],
})
export class DevListComponent {
  @Input() allDevelopers: Developer[] = [];
  @Input() searchTerm: string = '';

  getTitle(): string {
    if (this.searchTerm.trim()) {
      return 'Resultados da Busca';
    }
    return 'Desenvolvedores Cadastrados';
  }
}
