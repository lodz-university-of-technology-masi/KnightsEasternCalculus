import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolvedTestComponent } from './solved-test.component';

describe('SolvedTestComponent', () => {
  let component: SolvedTestComponent;
  let fixture: ComponentFixture<SolvedTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolvedTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolvedTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
