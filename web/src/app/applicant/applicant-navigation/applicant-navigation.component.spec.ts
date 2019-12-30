import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantNavigationComponent } from './applicant-navigation.component';

describe('ApplicantNavigationComponent', () => {
  let component: ApplicantNavigationComponent;
  let fixture: ComponentFixture<ApplicantNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
