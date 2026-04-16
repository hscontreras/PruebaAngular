import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appFormError]',
  standalone: true,
})
export class FormErrorDirective implements OnChanges {
  @Input() control!: AbstractControl | null;

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    if (!this.control) return;

    if (this.control.invalid && this.control.touched) {
      this.el.nativeElement.innerText = this.getMessage();
    } else {
      this.el.nativeElement.innerText = '';
    }
  }

  private getMessage(): string {
    if (this.control?.hasError('required')) return 'Campo obligatorio';
    if (this.control?.hasError('email')) return 'Email inválido';
    return '';
  }
}
