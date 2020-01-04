import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TestService} from '../../services/test.service';
import {TestStatus} from '../../model/test-instance';

@Component({
  selector: 'app-solved-test',
  templateUrl: './solved-test.component.html',
  styleUrls: ['./solved-test.component.scss']
})
export class SolvedTestComponent implements OnInit {
  testId: string;
  applicantId: string;

  constructor(private route: ActivatedRoute, private testService: TestService) {
  }

  ngOnInit() {
    this.applicantId = ''; // TODO: Get ID from auth service
    this.route.paramMap.subscribe(
      value => {
        const id = value.get('id');
        this.testService.getUserTest('', id).subscribe(test => {
          if (test.status === TestStatus.Checked) {
            this.testId = id;
          } else if (test.status === TestStatus.NotSolved) {
            // TODO: redirect to test solving component
          }
        });
      });
  }

}
