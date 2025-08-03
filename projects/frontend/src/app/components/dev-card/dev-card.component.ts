import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Developer {
  id: string;
  name: string;
  location: string;
  technologies: string[];
  githubUrl: string;
  avatar: string;
}

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
