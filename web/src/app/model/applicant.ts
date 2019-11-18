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
}
