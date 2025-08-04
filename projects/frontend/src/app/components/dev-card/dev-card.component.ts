import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Developer } from '../../models/developer.model';

@Component({
  selector: 'app-dev-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './dev-card.component.html',
  styleUrls: ['./dev-card.component.scss'],
})
export class DevCardComponent {
  @Input() developer!: Developer;
  @Output() edit = new EventEmitter<Developer>();
  @Output() delete = new EventEmitter<Developer>();

  onEdit(): void {
    this.edit.emit(this.developer);
  }

  onDelete(): void {
    this.delete.emit(this.developer);
  }
}
