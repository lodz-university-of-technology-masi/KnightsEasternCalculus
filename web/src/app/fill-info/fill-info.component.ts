import {Component, OnInit, Injectable, ViewChild, ElementRef} from '@angular/core';
import {FillInfoService} from '../services/fill-info.service';
import {Experience} from '../model/experience';
import {University} from '../model/university';
import {Router} from '@angular/router';
import {AuthenticationRecruiterService} from '../services/authentication-recruiter.service';
import {TestInstance} from '../model/test-instance';
import {HttpErrorResponse} from '@angular/common/http';
import * as Globals from '../app-consts';

@Component({
  selector: 'app-fill-info',
  templateUrl: './fill-info.component.html',
  styleUrls: ['./fill-info.component.scss']
})

@Injectable()
export class FillInfoComponent implements OnInit {

  private loadingPhoto = false;
  private loadingProfile = false;
  @ViewChild('fileLabel', {static: false})
  labelImport: ElementRef;

  constructor(
    private nfSer: FillInfoService,
    private router: Router,
    private authService: AuthenticationRecruiterService
  ) {
  }

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
  inUdegree = 'lic.';

  photo: File;
  photoUploaded = false;
  profileUploaded = false;

  buttonEnabled = false;

  ngOnInit() {
    this.checkIfImageExists();
  }

  checkIfImageExists() {
    const img = new Image();
    img.onload = () => this.photoUploaded = true;
    img.src = Globals.apiBaseUrl + '/applicants/' + this.authService.getUserId() + '/photos';
  }

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

  onChooseFile(files: FileList): void {
    this.labelImport.nativeElement.innerText = files.item(0).name;
    this.photo = files.item(0);
  }

  public fillInfo(): void {
    this.loadingPhoto = true;
    this.loadingProfile = true;

    if (!this.photoUploaded) {
      const reader = new FileReader();
      reader.readAsDataURL(this.photo);
      reader.onload = () => {
        this.nfSer.uploadPhoto(this.authService.getUserId(), reader.result as undefined as string).subscribe(res => {
            this.photoUploaded = true;
            this.loadingPhoto = false;
            if (this.profileUploaded) {
              this.router.navigate(['/']);
            }
          },
          (error: HttpErrorResponse) => {
            this.loadingPhoto = false;
            if (error.status === 409) {
              this.photoUploaded = true;
            }
            console.log(error);
          });
      }
      this.nfSer.addPer(this.inFirstName, this.inLastName, this.inDateOfBirth, this.inAddress, this.inCity, this.inPostalCode, this.inEmail, this.inPhoneNumber, this.ex, this.un, this.inAboutMe).subscribe(res => {
          this.profileUploaded = true;
          this.loadingProfile = false;
          if (this.photoUploaded) {
            this.router.navigate(['/']);
          }
        },
        (error: HttpErrorResponse) => {
          this.loadingProfile = false;
          if (error.status === 409) {
            this.profileUploaded = true;
          }
          console.log(error);
        });
    };
  }
}
