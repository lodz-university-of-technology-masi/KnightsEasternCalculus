import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolveTestComponent } from './solve-test.component';

describe('SolveTestComponent', () => {
  let component: SolveTestComponent;
  let fixture: ComponentFixture<SolveTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolveTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolveTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
