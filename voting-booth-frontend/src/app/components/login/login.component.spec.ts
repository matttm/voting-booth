import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {SubmissionComponent} from '../submission/submission.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from '../../services/auth/auth.service';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSnackBarModule
} from '@angular/material';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatSnackBarModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
        RouterTestingModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatProgressSpinnerModule
      ],
      declarations: [
        LoginComponent,
        SubmissionComponent
      ],
      providers: [AuthService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have four form fields', () => {
    const el: HTMLElement = fixture.debugElement.nativeElement;
    const fields: NodeListOf<Element> = el.querySelectorAll('mat-form-field');
    expect(fields).toBeDefined();
    expect(fields.length).toBe(4);
  });

  it('should not submit invalid form', () => {
    const el: HTMLElement = fixture.debugElement.nativeElement;
    const button: HTMLElement = el.querySelector('button');
    expect(button).toBeDefined();
    expect(component.isAuthenticating).toBeFalsy();
    button.click();
    expect(component.isAuthenticating).toBeFalsy();
  });

  it('should submit valid form', () => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const el: HTMLElement = fixture.debugElement.nativeElement;
      const fname: HTMLElement = el.querySelector('input[name=fname]');
      const lname: HTMLElement = el.querySelector('input[name=lname]');
      const ssn: HTMLElement   = el.querySelector('input[name=ssn]');
      const zip: HTMLElement   = el.querySelector('input[name=zip]');
      // @ts-ignore
      fname.value = 'Matt';
      // @ts-ignore
      lname.value = 'Maloney';
      // @ts-ignore
      ssn.value = '111-11-1111';
      // @ts-ignore
      zip.value = '19022';
      fname.dispatchEvent(new Event('input'));
      lname.dispatchEvent(new Event('input'));
      ssn.dispatchEvent(new Event('input'));
      zip.dispatchEvent(new Event('input'));

      const button: HTMLElement = el.querySelector('button');
      expect(button).toBeDefined();
      expect(component.isAuthenticating).toBeFalsy();
      fixture.detectChanges();
      button.click();
      expect(component.isAuthenticating).toBeTruthy();
    });
  });
});
