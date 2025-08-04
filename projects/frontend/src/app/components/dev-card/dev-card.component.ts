import { Component, Input } from '@angular/core';
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
}
