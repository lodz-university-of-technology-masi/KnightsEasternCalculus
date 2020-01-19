import {Component, OnInit} from '@angular/core';
import {TestInstance, TestStatus} from '../../model/test-instance';
import {TestService} from '../../services/test.service';
import {AuthenticationRecruiterService} from '../../services/authentication-recruiter.service';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  private date: string;
  private dayTime: string;
  private testCount: number;

  constructor(private testService: TestService, private authServive: AuthenticationRecruiterService) { }

  ngOnInit() {
    this.testService.getTestInstances(this.authServive.getUserId()).subscribe(res => this.testCount = ((res as HttpResponse<TestInstance>).body as undefined as Array<TestInstance>)
      .reduce((total, test) => {
        if (test.status === TestStatus.NotSolved) {
          return total + 1;
        } else {
          return total;
        }
    }, 0));
    const date = new Date();
    const format = {weekday: 'long', month: 'long', day: '2-digit', year: 'numeric'};
    this.date = date.toLocaleDateString('pl-PL', format);
    if (date.getHours() > 18) {
      this.dayTime = 'wieczorne';
    } else if (date.getHours() < 5) {
      this.dayTime = 'nocne';
    } else if (date.getHours() < 12) {
      this.dayTime = 'poranne';
    } else {
      this.dayTime = 'popołudniowe';
    }
  }

}
