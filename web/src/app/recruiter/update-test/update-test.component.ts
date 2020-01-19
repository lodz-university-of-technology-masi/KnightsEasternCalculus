import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-test',
  templateUrl: './update-test.component.html',
  styleUrls: ['./update-test.component.scss']
})

@Injectable()
export class UpdateTestComponent implements OnInit {
  testId: number;

  constructor(
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(value => this.testId = parseInt(value.get('id'), 10));
  }
}
