import { Routes } from '@angular/router';
import { WorkerListComponent } from './features/workers/pages/worker-list/worker-list';
import { WorkerDetailComponent } from './features/workers/pages/worker-detail/worker-detail';

export const routes: Routes = [
  { path: '', component: WorkerListComponent },
  { path: 'workers/:id', component: WorkerDetailComponent },
];
