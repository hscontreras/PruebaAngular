import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, BehaviorSubject, tap } from 'rxjs';
import { Worker } from '../../features/workers/models/worker';
import { ApiUser } from '../../features/workers/models/api-user';
import { environment } from '../../../environments/environment';
import { API_ENDPOINTS } from '../constants/api-endpoints';

@Injectable({ providedIn: 'root' })
export class WorkerService {
  private api = `${environment.apiUrl}${API_ENDPOINTS.users}`;

  private workersSubject = new BehaviorSubject<Worker[]>([]);
  workers$ = this.workersSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadWorkers() {
    return this.http.get<ApiUser[]>(this.api).pipe(
      map((users) => users.map((u) => this.mapToWorker(u))),
      tap((workers) => this.workersSubject.next(workers)),
    );
  }

  getWorkers() {
    return this.http
      .get<ApiUser[]>(this.api)
      .pipe(map((users) => users.map((u) => this.mapToWorker(u))));
  }

  getWorker(id: number) {
    return this.http.get<ApiUser>(`${this.api}/${id}`).pipe(map((u) => this.mapToWorker(u)));
  }

  addWorker(worker: Worker) {
    const current = this.workersSubject.value;
    this.workersSubject.next([...current, worker]);
  }

  private mapToWorker(u: ApiUser): Worker {
    const names = u.name.split(' ');

    return {
      id: u.id,
      name: names[0],
      lastName: names.slice(1).join(' ') || '',
      position: u.company?.name || 'N/A',
      email: u.email,
      startDate: new Date(),
      status: true,
    };
  }
}
