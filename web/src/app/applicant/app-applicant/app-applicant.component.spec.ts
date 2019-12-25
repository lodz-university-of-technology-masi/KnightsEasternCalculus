import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppApplicantComponent } from './app-applicant.component';

describe('AppApplicantComponent', () => {
  let component: AppApplicantComponent;
  let fixture: ComponentFixture<AppApplicantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppApplicantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppApplicantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
