import { Routes } from '@angular/router';
import { HomeComponent } from './features/cadastro/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '' },
];
