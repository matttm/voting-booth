import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SplashComponent } from './splash.component';
import {MatDialogModule, MatListModule} from '@angular/material';
import {provideMockStore} from '@ngrx/store/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CandidateInfoComponent} from '../candidate-info/candidate-info.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [CandidateInfoComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatDialogModule
  ],
  entryComponents: [CandidateInfoComponent]
})
class TestModule {}

describe('SplashComponent', () => {
  let component: SplashComponent;
  let fixture: ComponentFixture<SplashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatListModule,
        MatDialogModule,
        NoopAnimationsModule,
        TestModule
      ],
      declarations: [ SplashComponent ],
      providers: [provideMockStore()]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain welcome message', () => {
    const el: HTMLElement = fixture.debugElement.nativeElement;
    expect(el.querySelector('#welcome-message')).toBeDefined();
    expect(el.querySelector('#welcome-message').textContent)
      .toBe('Welcome to the eElections');
  });

  it('should contain two buttons', () => {
    const el: HTMLElement = fixture.debugElement.nativeElement;
    const buttons = el.querySelectorAll('.splash-btn');
    expect(buttons).toBeDefined();
    expect(buttons.length).toBe(2);
  });

  it('should contain a list', () => {
    const el: HTMLElement = fixture.debugElement.nativeElement;
    const list = el.querySelector('mat-list');
    expect(list).toBeDefined();
  });

  it('should not show dialog content before candidate click', () => {
    const el: HTMLElement = fixture.debugElement.nativeElement;
    const content = el.querySelector('mat-dialog-content');
    expect(content).toBeFalsy();
  });

  it('should  show dialog content after candidate click', () => {
    const el: HTMLElement = fixture.debugElement.nativeElement;
    let content = el.querySelector('mat-dialog-content');
    expect(content).toBeFalsy();
    // simulate click
    component.onCandidateClick('Test Candidate');
    content = el.querySelector('mat-dialog-content');
    expect(content).toBeDefined();
    // simulate closing click
    el.querySelector('#splash-container')
      .dispatchEvent(new Event('mousedown'));
    content = el.querySelector('mat-dialog-content');
    expect(content).toBeFalsy();
  });
});
