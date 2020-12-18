import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FailsafeComponent } from './failsafe.component';

describe('FailsafeComponent', () => {
  let component: FailsafeComponent;
  let fixture: ComponentFixture<FailsafeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FailsafeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FailsafeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
