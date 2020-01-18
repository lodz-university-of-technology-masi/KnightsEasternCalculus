import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TestService} from '../../services/test.service';
import {AuthenticationRecruiterService} from '../../services/authentication-recruiter.service';

@Component({
  selector: 'app-solved-test',
  templateUrl: './solved-test.component.html',
  styleUrls: ['./solved-test.component.scss']
})
export class SolvedTestComponent implements OnInit {

  private applicantId: string;
  private timestamp: string;

  constructor(private route: ActivatedRoute, private testService: TestService) { }

  ngOnInit() {
    this.applicantId = this.route.snapshot.params.id;
    this.timestamp = this.route.snapshot.params.timestamp;
  }

}
