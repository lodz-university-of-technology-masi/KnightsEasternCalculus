import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterApplicantProfileComponent } from './recruiter-applicant-profile.component';

describe('ApplicantProfileComponent', () => {
  let component: RecruiterApplicantProfileComponent;
  let fixture: ComponentFixture<RecruiterApplicantProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruiterApplicantProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterApplicantProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
