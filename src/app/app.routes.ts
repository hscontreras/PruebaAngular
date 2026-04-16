import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'workers',
    pathMatch: 'full',
  },
  {
    path: 'workers',
    loadChildren: () => import('./features/workers/workers.routes').then((m) => m.WORKERS_ROUTES),
  },
];
