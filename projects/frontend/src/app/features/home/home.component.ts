import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="header">
      <h1>header</h1>
    </header>
    <main class="main-container">
      <h2>main</h2>
    </main>
    <footer class="footer">
      <h3>footer</h3>
    </footer>
  `,
  styles: [],
})
export class HomeComponent {}
