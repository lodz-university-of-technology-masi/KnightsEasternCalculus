import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  applicantId: string;

  constructor() {
    this.applicantId = 'ccdf7c1d-8573-4c13-94eb-9011077a73f0';
  }

  ngOnInit() {
  }

}
