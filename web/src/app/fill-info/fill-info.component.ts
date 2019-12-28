import { Component, OnInit, Injectable } from '@angular/core';
import { Applicant } from '../model/applicant';
import { FillInfoService } from '../services/fill-info.service';
import {Experience} from '../model/experience';
import {University} from '../model/university';
import {CloseQuestion} from '../model/close-question';

@Component({
  selector: 'app-fill-info',
  templateUrl: './fill-info.component.html',
  styleUrls: ['./fill-info.component.scss']
})

@Injectable()
export class FillInfoComponent implements OnInit {

  constructor(
    private nfSer: FillInfoService
  ) { }
  id: string;                     // id
  fi: string;                     // firstName
  la: string;                     // lastName
  da: Date;                       // dateOfBirth
  ad: string;                     // address
  ci: string;                     // city
  po: string;                     // postalCode
  em: string;                     // email
  nb: string;                     // phoneNumber
  ex: Experience[] = [];          // experiences
  inputExperience: Experience;
  un: University[] = [];          // universities
  inputUniversity: University;
  ab: string;                     // aboutMe
  ph: string;                     // photoUrl
  selectedExperience: Experience;
  selectedUniversity: University;

  ngOnInit() {}
  addExperience(): void {
    this.ex.push(this.inputExperience);
    this.inputExperience = null;
  }

  addUniversity(): void {
    this.un.push(this.inputUniversity);
    this.inputUniversity = null;
  }

  removeExperience(experience: Experience): void {
    this.ex.splice(this.ex.indexOf(experience), 1);
  }

  onSelectExperience(experience: Experience): void {
    this.selectedExperience = experience;
  }

  removeUniversity(university: University): void {
    this.un.splice(this.un.indexOf(university), 1);
  }

  onSelectUniversity(university: University): void {
    this.selectedUniversity = university;
  }

  //#region "Fill info"
  public fillInfo(): void {
    this.nfSer.addPer(this.id, this.fi, this.la, this.da, this.ad, this.ci, this.po, this.em, this.nb, this.ex, this.un, this.ab, this.ph);
  }
  //#endregion
}
