import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SolvableTest} from '../../model/solvable-test';
import {TestService} from '../../services/test.service';

@Component({
  selector: 'app-solve-test',
  templateUrl: './solve-test.component.html',
  styleUrls: ['./solve-test.component.scss']
})
export class SolveTestComponent implements OnInit {

  test: SolvableTest;

  constructor(private route: ActivatedRoute, private testService: TestService) { }

  ngOnInit() {
    this.route.paramMap.subscribe( value => {
      const id = value.get('id');
      this.testService.getAllTests().subscribe( (result: Response) => {
        const tests = JSON.parse(JSON.stringify(result.body)) as SolvableTest[];
        tests.forEach( t => {
            console.log(t)
        });
      });
    });
  }

}
