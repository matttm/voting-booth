import {Directive, Host, Inject, OnDestroy, OnInit, Optional} from '@angular/core';
import {NgControl} from '@angular/forms';
import {combineLatest, EMPTY, Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { InjectionToken } from '@angular/core';
import {FormSubmitDirective} from '../form-submit/form-submit.directive';

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
  // tslint:disable-next-line:variable-name
  private _submit$: Observable<Event>;

  constructor(
    private control: NgControl,
    @Optional() @Host() private form: FormSubmitDirective,
    @Inject(FORM_ERRORS) private errors
  ) {
    this.destroy$ = new Subject<boolean>();
    this._submit$ = this.form ? this.form.submit$ : EMPTY;
  }

  ngOnInit() {
    combineLatest([
      this.control.statusChanges,
      this._submit$
    ]).pipe(
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

  get submit$(): Observable<Event> {
    return this._submit$;
  }
}
