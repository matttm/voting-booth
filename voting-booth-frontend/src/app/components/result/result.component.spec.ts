import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultComponent } from './result.component';
import {MatTableModule} from '@angular/material';
import {Result, ResultsResponse} from "../../types";

describe('ResultComponent', () => {
  let component: ResultComponent;
  let fixture: ComponentFixture<ResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatTableModule],
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
    const body: ResultsResponse = {
      results: [
        [
          'Joe Biden',
          100
        ]
      ],
      success: true
    };
    const mapped: Result[] = ResultComponent.translateResultsFromWire(body);
    expect(mapped.length).toBe(1);
    const el = mapped[0];

    return null;
  });
});
