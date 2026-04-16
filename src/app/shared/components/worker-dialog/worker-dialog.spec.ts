import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerDialog } from './worker-dialog';

describe('WorkerDialog', () => {
  let component: WorkerDialog;
  let fixture: ComponentFixture<WorkerDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkerDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkerDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
