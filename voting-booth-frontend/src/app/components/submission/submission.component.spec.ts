import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionComponent } from './submission.component';
import {MatProgressSpinnerModule} from '@angular/material';

describe('SubmissionComponent', () => {
  let component: SubmissionComponent;
  let fixture: ComponentFixture<SubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatProgressSpinnerModule ],
      declarations: [ SubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show ng-content when condition is false', () => {
    const el: HTMLElement = fixture.debugElement.nativeElement;
    fixture.componentInstance.conditionVar = false;
    fixture.detectChanges();
    const spinner = el.querySelector('#loading');
    expect(spinner).toBeFalsy();
    const children = el.querySelector('#non-loading');
    expect(children).toBeTruthy();
  });

  it('should show spinner when condition is true', () => {
    const el: HTMLElement = fixture.debugElement.nativeElement;
    fixture.componentInstance.conditionVar = true;
    fixture.detectChanges();
    const spinner = el.querySelector('#loading');
    expect(spinner).toBeTruthy();
    const children = el.querySelector('#non-loading');
    expect(children).toBeFalsy();
  });
});
