import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'cadastro', pathMatch: 'full' },
  { path: 'cadastro', loadChildren: () => import('./features/cadastro/cadastro.module').then(m => m.CadastroModule) },
  { path: 'busca', loadChildren: () => import('./features/busca/busca.module').then(m => m.BuscaModule) },
];