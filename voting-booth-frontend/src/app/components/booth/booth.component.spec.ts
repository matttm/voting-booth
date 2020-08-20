import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoothComponent } from './booth.component';

describe('BoothComponent', () => {
  let component: BoothComponent;
  let fixture: ComponentFixture<BoothComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoothComponent ]
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
});
