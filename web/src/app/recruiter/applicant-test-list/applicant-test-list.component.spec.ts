import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantTestListComponent } from './applicant-test-list.component';

describe('ApplicantTestListComponent', () => {
  let component: ApplicantTestListComponent;
  let fixture: ComponentFixture<ApplicantTestListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantTestListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantTestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
