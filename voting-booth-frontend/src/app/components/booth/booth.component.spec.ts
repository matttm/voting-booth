import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoothComponent } from './booth.component';
import {SubmissionComponent} from '../submission/submission.component';
import {MatProgressSpinnerModule, MatRadioModule, MatSnackBarModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {provideMockStore} from '@ngrx/store/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('BoothComponent', () => {
  let component: BoothComponent;
  let fixture: ComponentFixture<BoothComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatRadioModule,
        FormsModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        MatSnackBarModule
      ],
      declarations: [
        BoothComponent,
        SubmissionComponent
      ],
      providers: [
        provideMockStore()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoothComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain the form container', () => {
    const el: HTMLElement = fixture.debugElement.nativeElement;
    expect(el.querySelector('#form-container')).toBeTruthy();
  });

  it('should contain a radio group', () => {
    const el: HTMLElement = fixture.debugElement.nativeElement;
    expect(el.querySelector('mat-radio-group')).toBeTruthy();
  });

  it('should have "isVoting" of false on start', () => {
    expect(component.isVoting).toBeFalsy();
  });

  it('should not submit when form is invalid', () => {
    const el: HTMLElement = fixture.debugElement.nativeElement;
    const button = el.querySelector('button');
    button.click();
    expect(component.isVoting).toBeFalsy();
  });

  it('should submit when form is valid', () => {
    const el: HTMLElement = fixture.debugElement.nativeElement;
    const button: HTMLElement = el.querySelector('button');
    component.handleSubmit();
    expect(component.isVoting).toBeTruthy();
  });
});
