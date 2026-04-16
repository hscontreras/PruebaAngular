import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-worker-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
  ],
  templateUrl: './worker-dialog.html',
  styleUrls: ['./worker-dialog.scss'],
})
export class WorkerDialogComponent implements OnInit {
  isViewMode!: boolean;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<WorkerDialogComponent>,
  ) {}

  ngOnInit(): void {
    this.isViewMode = this.data?.mode === 'view';

    this.form = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      position: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      startDate: ['', Validators.required],
      status: [true],
    });

    if (this.data?.worker) {
      this.form.patchValue(this.data.worker);
    }

    if (this.isViewMode) {
      this.form.disable();
    }
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.dialogRef.close(this.form.value);
  }
}
