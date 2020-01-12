import { Component, OnInit, Injectable } from '@angular/core';
import { FillInfoService } from '../services/fill-info.service';
import {Experience} from '../model/experience';
import {University} from '../model/university';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fill-info',
  templateUrl: './fill-info.component.html',
  styleUrls: ['./fill-info.component.scss']
})

@Injectable()
export class FillInfoComponent implements OnInit {

  constructor(
    private nfSer: FillInfoService,
    private router: Router
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


  inFirstName: string;
  inLastName: string;
  inDateOfBirth: string;
  inAddress: string;
  inCity: string;
  inPostalCode: string;
  inEmail: string;
  inPhoneNumber: string;
  inAboutMe: string;
  inPhotoUrl: string;
  inEname: string;
  inEposition: string;
  inEyears: string;
  inUname: string;
  inUmajor: string;
  inUyears: string;
  inUdegree: string;

  ngOnInit() {}
  addExperience(): void {
    this.inputExperience = new Experience(this.inEname, this.inEposition, this.inEyears);
    this.ex.push(this.inputExperience);
    this.inputExperience = null;
    this.inEname = null;
    this.inEposition = null;
    this.inEyears = null;
  }

  addUniversity(): void {
    this.inputUniversity = new University(this.inUname, this.inUmajor, this.inUyears, this.inUdegree);
    this.un.push(this.inputUniversity);
    this.inputUniversity = null;
    this.inUname = null;
    this.inUmajor = null;
    this.inUyears = null;
    this.inUdegree = null;
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
    this.nfSer.addPer(this.inFirstName, this.inLastName.toLowerCase(), this.inDateOfBirth, this.inAddress, this.inCity, this.inPostalCode, this.inEmail, this.inPhoneNumber, this.ex, this.un, this.inAboutMe, this.inPhotoUrl).subscribe({
      error: error => ({}),
      complete: () => {
        this.router.navigate(['/login']);
      }
    });
  }
  //#endregion
}
