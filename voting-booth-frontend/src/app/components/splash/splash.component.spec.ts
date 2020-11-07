import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SplashComponent } from './splash.component';
import {MatDialogModule, MatListModule} from '@angular/material';
import {provideMockStore} from '@ngrx/store/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CandidateInfoComponent} from '../candidate-info/candidate-info.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {of} from "rxjs";

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

  beforeEach(() => {
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

  it('should show dialog content after candidate click', () => {
    // give some data
    component.candidateNames$ = of(['DummyCandidate']);
    fixture.detectChanges();
    const el: HTMLElement = fixture.debugElement.nativeElement;
    // currently not showing
    let content = el.querySelector('mat-dialog-content');
    expect(content).toBeFalsy();
    // simulate opening click
    const candidate = el.querySelector('mat-list-item');
    expect(candidate).toBeTruthy();
    candidate.dispatchEvent(new Event('mousedown'));
    // now modal should be there
    content = el.querySelector('mat-dialog-content');
    expect(content).toBeDefined();
    // simulate closing click
    el.querySelector('#splash-container')
      .dispatchEvent(new Event('mousedown'));
    // now it shouldn't be there
    content = el.querySelector('mat-dialog-content');
    expect(content).toBeFalsy();
  });
});
