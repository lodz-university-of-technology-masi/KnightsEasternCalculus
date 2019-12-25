import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllTestsComponent } from './show-all-tests.component';

describe('ShowAllTestComponent', () => {
  let component: ShowAllTestsComponent;
  let fixture: ComponentFixture<ShowAllTestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAllTestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAllTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
