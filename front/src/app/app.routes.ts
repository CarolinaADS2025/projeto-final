import { Routes } from '@angular/router';

export const routes: Routes = [
     { path: 'dashboard', loadComponent: () => import('./components/dashboard/dashboard').then(c => c.Dashboard) },
     { path: 'pessoa', loadComponent: () => import('./components/pessoa-component/pessoa-component').then(c => c.PessoaComponent) },
];
