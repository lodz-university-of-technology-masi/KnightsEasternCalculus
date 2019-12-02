import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRecruiterComponent } from './app-recruiter.component';

describe('AppRecruiterComponent', () => {
  let component: AppRecruiterComponent;
  let fixture: ComponentFixture<AppRecruiterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppRecruiterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppRecruiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
