import { Component, OnInit, Injectable } from '@angular/core';
import { FillInfoService } from '../services/fill-info.service';
import {Experience} from '../model/experience';
import {University} from '../model/university';

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
  ename: string;
  eposition: string;
  eyears: string;
  uname: string;
  umajor: string;
  uyears: string;
  udegree: string;


  inId: string = "";
  inFirstName: string = "";
  inLastName: string = "";
  inDateOfBirth: string = "";
  inAddress: string = "";
  inCity: string = "";
  inPostalCode: string = "";
  inEmail: string = "";
  inPhoneNumber: string = "";
  inAboutMe: string = "";
  inPhotoUrl: string = "";
  inEname: string = "";
  inEposition: string = "";
  inEyears: string = "";
  inUname: string = "";
  inUmajor: string = "";
  inUyears: string = "";
  inUdegree: string = "";

  ngOnInit() {}
  addExperience(): void {
    this.ename = this.inEname;
    this.eposition = this.inEposition;
    this.eyears = this.inEyears;
    this.inputExperience = new Experience(this.ename, this.eposition, this.eyears);
    this.ex.push(this.inputExperience);
    this.inputExperience = null;
  }

  addUniversity(): void {
    this.uname = this.inUname;
    this.umajor = this.inUmajor;
    this.uyears = this.inUyears;
    this.udegree = this.inUdegree;
    this.inputUniversity = new University(this.uname, this.umajor, this.uyears, this.udegree);
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
    this.nfSer.addPer(this.id, this.fi, this.la.toLowerCase(), this.da, this.ad, this.ci, this.po, this.em, this.nb, this.ex, this.un, this.ab, this.ph);
  }
  //#endregion
}
