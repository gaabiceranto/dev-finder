import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { DevFormComponent } from '../../components/dev-form/dev-form.component';
import { DevListComponent } from '../../components/dev-list/dev-list.component';
import { Developer } from '../../components/dev-card/dev-card.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, HeaderComponent, DevFormComponent, DevListComponent],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent {
  searchTerm: string = '';

  developers: Developer[] = [
    {
      id: '1',
      name: 'João da Silva',
      location: 'Maringá - PR',
      technologies: ['Angular', 'Jquery', 'Vue'],
      githubUrl: 'https://github.com/joaosilva',
      avatar: '',
    },
    {
      id: '2',
      name: 'Maria da Silva',
      location: 'Maringá - PR',
      technologies: ['React', 'React Native', 'Vue'],
      githubUrl: 'https://github.com/mariasilva',
      avatar: '',
    },
    {
      id: '3',
      name: 'Pedro Santos',
      location: 'São Paulo - SP',
      technologies: ['Angular', 'TypeScript', 'Node.js'],
      githubUrl: 'https://github.com/pedrosantos',
      avatar: '',
    },
    {
      id: '4',
      name: 'Ana Costa',
      location: 'Rio de Janeiro - RJ',
      technologies: ['React', 'JavaScript', 'CSS'],
      githubUrl: 'https://github.com/anacosta',
      avatar: '',
    },
  ];

  onSearchChange(term: string) {
    this.searchTerm = term;
  }
}
