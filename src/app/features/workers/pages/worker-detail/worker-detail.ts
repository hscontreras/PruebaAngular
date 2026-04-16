import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkerService } from '../../../../core/services/worker';
import { Worker } from '../../models/worker';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-worker-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatTooltipModule,
  ],
  templateUrl: './worker-detail.html',
  styleUrls: ['./worker-detail.scss'],
})
export class WorkerDetailComponent implements OnInit {
  worker$!: Observable<Worker>;

  constructor(
    private route: ActivatedRoute,
    private workerService: WorkerService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.worker$ = this.workerService.getWorker(id);
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
