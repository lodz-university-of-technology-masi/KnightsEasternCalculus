import {University} from './university';
import {Experience} from './experience';

export class Applicant {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  address: string;
  city: string;
  postalCode: string;
  email: string;
  phoneNumber: string;
  experiences: Experience[];
  universities: University[];
  aboutMe: string;
  photoUrl: string;

  constructor(id: string, firstName: string, lastName: string, dateOfBirth: Date, address: string, city: string, postalCode: string, email: string, phoneNumber: string, experiences: Experience[], universities: University[], aboutMe: string, photoUrl: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.address = address;
    this.city = city;
    this.postalCode = postalCode;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.experiences = experiences;
    this.universities = universities;
    this.aboutMe = aboutMe;
    this.photoUrl = photoUrl;
  }
}
