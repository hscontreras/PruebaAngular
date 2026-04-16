import { Component, inject } from '@angular/core';
import { WorkerService } from '../../../../core/services/worker';
import { Worker } from '../../models/worker';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../../../shared/components/table/table';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Observable, combineLatest, startWith, map } from 'rxjs';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { WorkerDialogComponent } from '../../../../shared/components/worker-dialog/worker-dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-worker-list',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './worker-list.html',
  styleUrls: ['./worker-list.scss'],
})
export class WorkerListComponent {
  private workerService = inject(WorkerService);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  searchControl = new FormControl('');
  columns = [
    { key: 'name', label: 'Nombre' },
    { key: 'lastName', label: 'Apellido' },
    { key: 'position', label: 'Cargo' },
    { key: 'startDate', label: 'Fecha de ingreso' },
    { key: 'actions', label: 'Acciones' },
  ];

  workers$ = this.workerService.workers$;

  filteredWorkers$: Observable<Worker[]> = combineLatest([
    this.workers$,
    this.searchControl.valueChanges.pipe(startWith('')),
  ]).pipe(
    map(([workers, search]) =>
      workers.filter((w) => w.name.toLowerCase().includes((search || '').toLowerCase())),
    ),
  );

  ngOnInit() {
    this.workerService.loadWorkers().subscribe();
    this.workers$ = this.workerService.workers$;
  }

  goToDetail(worker: Worker) {
    this.router.navigate(['/workers', worker.id]);
  }

  openCreate(enterAnimationDuration: string, exitAnimationDuration: string) {
    const dialogRef = this.dialog.open(WorkerDialogComponent, {
      width: '600px',
      data: { mode: 'create' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      const newWorker: Worker = {
        ...result,
        id: Date.now(),
      };

      this.workerService.addWorker(newWorker);
    });
  }
}
