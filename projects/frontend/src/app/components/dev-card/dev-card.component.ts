import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Developer } from '../../models/developer.model';

@Component({
  selector: 'app-dev-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dev-card.component.html',
  styleUrls: ['./dev-card.component.scss'],
})
export class DevCardComponent {
  @Input() developer!: Developer;
}
