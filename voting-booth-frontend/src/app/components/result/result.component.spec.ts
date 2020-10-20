import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultComponent } from './result.component';
import {MatTableModule} from '@angular/material';
import {Result, ResultsResponse} from '../../types';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ResultComponent', () => {
  let component: ResultComponent;
  let fixture: ComponentFixture<ResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        HttpClientTestingModule
      ],
      declarations: [ ResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a table', () => {
    const el: HTMLElement = fixture.debugElement.nativeElement;
    expect(el.querySelector('mat-table')).toBeDefined();
  });

  it('should map a ResultResponse to a Result[]', () => {
    const name1 = 'Joe Biden';
    const votes1 = 100;
    const name2 = 'Timmy Toetoe';
    const votes2 = 50;
    const body: ResultsResponse = {
      results: [
        [
          name1,
          votes1
        ],
        [
          name2,
          votes2
        ]
      ],
      success: true
    };
    const mapped: Result[] = ResultComponent.translateResultsFromWire(body);
    expect(mapped.length).toBe(2);
    let el = mapped[0];
    expect(el.name).toBe(name1);
    expect(el.votes).toBe(votes1);
    el = mapped[1];
    expect(el.name).toBe(name2);
    expect(el.votes).toBe(votes2);

    return null;
  });
});
