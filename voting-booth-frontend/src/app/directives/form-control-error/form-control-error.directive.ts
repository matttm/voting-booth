import {Directive, Inject, OnDestroy, OnInit} from '@angular/core';
import {NgControl} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { InjectionToken } from '@angular/core';

export const defaultErrors = {
  required: (error) => `This field is required`,
  minlength: ({ requiredLength, actualLength }) => `Expect ${requiredLength} but got ${actualLength}`
};

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
  providedIn: 'root',
  factory: () => defaultErrors
});

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[formControl] [formControlName]'
})
export class FormControlErrorDirective implements OnInit, OnDestroy {
  private destroy$: Subject<boolean>;

  constructor(
    private control: NgControl,
    @Inject(FORM_ERRORS) private errors
  ) {
    this.destroy$ = new Subject<boolean>();
  }

  ngOnInit() {
    this.control.statusChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      const controlErrors = this.control.errors;
      if (controlErrors) {
        const firstError = Object.keys(controlErrors)[0];
        const errorFn = this.errors[firstError];
        const text = errorFn(controlErrors[firstError]);
      }

    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
