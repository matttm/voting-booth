import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateInfoComponent } from './candidate-info.component';
import {MatDialogModule, MatListModule} from '@angular/material';
import {provideMockStore} from '@ngrx/store/testing';
import {Observable, of} from 'rxjs';
import {CandidateData} from '../../types';
import {Store} from '@ngrx/store';

class MockStore {
  constructor() {}
  pipe(ignore: any): Observable<CandidateData> {
    return of( {
      name: 'test',
      image: 'null',
      party: 'test',
      runningMate: 'test',
      stances: []
    });
  }
}
describe('CandidateInfoComponent', () => {
  let component: CandidateInfoComponent;
  let fixture: ComponentFixture<CandidateInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatListModule,
        MatDialogModule
      ],
      declarations: [ CandidateInfoComponent ],
      providers: [provideMockStore()]
    }).overrideProvider(Store, { useValue: new MockStore() })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain div container', () => {
    const el: HTMLElement = fixture.debugElement.nativeElement;
    component.selectCandidate('null');
    fixture.detectChanges();
    expect(el.querySelector('div')).toBeDefined();
  });

  it('should not contain div container when observable is null', () => {
    component.candidate$ = null;
    const el: HTMLElement = fixture.debugElement.nativeElement;
    expect(el.querySelector('div')).toBeFalsy();
  });

  it('should have an img element', () => {
    component.selectCandidate('null');
    fixture.detectChanges();
    const el: HTMLElement = fixture.debugElement.nativeElement;
    expect(el.querySelector('img')).toBeDefined();
  });

  it('should have candidate name as heading', () => {
    component.selectCandidate('test');
    fixture.detectChanges();
    const el: HTMLElement = fixture.debugElement.nativeElement;
    expect(el.querySelector('h3').innerText)
      .toBe('test');
  });
});
