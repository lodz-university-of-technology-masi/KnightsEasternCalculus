import {Component, Input, OnInit} from '@angular/core';
import {TestService} from '../../services/test.service';
import {TestInstance} from '../../model/test-instance';
import {Applicant} from '../../model/applicant';
import {ApplicantService} from '../../services/applicant.service';
import {Experience} from '../../model/experience';

@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.scss']
})
export class TestResultsComponent implements OnInit {
  @Input() testTimestamp: string;
  @Input() applicantId: string;
  test: TestInstance;
  applicant: Applicant;

  constructor(private testService: TestService, private applicantService: ApplicantService) { }

  ngOnInit() {
    this.testService.getUserTest(this.applicantId, this.testTimestamp).subscribe(test => this.test = test);
    //this.applicantService.getApplicant(this.applicantId).subscribe(applicant => this.applicant = applicant);
    this.applicant = new Applicant('3', 'Anna', 'Fafińska', new Date(1970, 1, 11), 'Garbowska 100', 'Grzybowo', '16-200', 'fafik@o2.pl', '11192364',
      new Array(new Experience('LapyMati', 'Obsługa klienta', '1991-2019')),
      new Array(), 'Przez wiele lat pracowałam jako sprzedawca pamięci RAM na allegro, ale firma upadła przez fatalną obsługę klienta. Teraz jestem bezrobotna i desperacko potrzebuję pracy.', '/assets/indeks.jpeg');
}

}
