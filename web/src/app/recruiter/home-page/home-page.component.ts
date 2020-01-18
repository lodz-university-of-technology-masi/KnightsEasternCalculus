import { Component, OnInit } from '@angular/core';
import {AuthenticationRecruiterService} from '../../services/authentication-recruiter.service';
import DateTimeFormatOptions = Intl.DateTimeFormatOptions;
import {TestService} from '../../services/test.service';
import {TestInstance} from '../../model/test-instance';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  private date: string;
  private dayTime: string;
  private testCount: number;

  constructor(private testService: TestService) {
  }

  ngOnInit() {
    this.testService.getUncheckedTests().subscribe(res => this.testCount = (res.body as unknown as Array<TestInstance>).length)
    const date = new Date();
    const format = {weekday: 'long', month: 'long', day: '2-digit', year: 'numeric'};
    this.date = date.toLocaleDateString('pl-PL', format);
    if (date.getHours() > 18) {
      this.dayTime = 'wieczorna';
    } else if(date.getHours() < 5) {
      this.dayTime = 'nocna';
    } else {
      this.dayTime = 'dzienna';
    }
  }

}
