import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TestService} from '../../services/test.service';
import {TestInstance, TestStatus} from '../../model/test-instance';
import {AuthenticationRecruiterService} from '../../services/authentication-recruiter.service';

@Component({
  selector: 'app-solved-test',
  templateUrl: './solved-test.component.html',
  styleUrls: ['./solved-test.component.scss']
})
export class SolvedTestComponent implements OnInit {
  testId: string;
  applicantId: string;

  constructor(private route: ActivatedRoute, private testService: TestService, private authService: AuthenticationRecruiterService) {
  }

  ngOnInit() {
    this.applicantId = this.authService.getUserId();
    this.route.paramMap.subscribe(
      value => {
        const id = value.get('id');
        this.testService.getTestInstance(this.applicantId, id).subscribe(test => {
          if ((test.body as TestInstance).status === TestStatus.Checked) {
            this.testId = id;
          } else if (test.status === TestStatus.NotSolved) {
            // TODO: redirect to test solving component
          }
        });
      });
  }

}
