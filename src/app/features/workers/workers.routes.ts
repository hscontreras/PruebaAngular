import { Routes } from '@angular/router';
import { WorkerListComponent } from './pages/worker-list/worker-list';
import { WorkerDetailComponent } from './pages/worker-detail/worker-detail';

export const WORKERS_ROUTES: Routes = [
  {
    path: '',
    component: WorkerListComponent,
  },
  {
    path: ':id',
    component: WorkerDetailComponent,
  },
];
