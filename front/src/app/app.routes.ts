import { Routes } from '@angular/router';

export const routes: Routes = [
     { path: 'Dashboard', loadComponent: () => import('./components/dashboard/dashboard').then(c => c.Dashboard) },
     { path: 'Pessoa', loadComponent: () => import('./components/pessoa-component/pessoa-component').then(c => c.PessoaComponent) },
];
