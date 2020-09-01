import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SplashComponent } from './splash.component';
import {MatListModule} from '@angular/material';
import {provideMockStore} from '@ngrx/store/testing';

describe('SplashComponent', () => {
  let component: SplashComponent;
  let fixture: ComponentFixture<SplashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatListModule
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
});
