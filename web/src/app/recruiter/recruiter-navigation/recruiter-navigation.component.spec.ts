import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterNavigationComponent } from './recruiter-navigation.component';

describe('RecruiterNavigationComponent', () => {
  let component: RecruiterNavigationComponent;
  let fixture: ComponentFixture<RecruiterNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruiterNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
