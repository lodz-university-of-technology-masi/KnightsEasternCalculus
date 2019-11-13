import { Injectable } from '@angular/core';
import {BehaviorSubject, of} from 'rxjs';
import {SharingService} from './sharing.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private username = new BehaviorSubject('');
  public currUsername = this.username.asObservable();
  private logged: boolean;
  private logging: boolean;

  constructor(private sharingService: SharingService) {
    this.logged = this.sharingService.getLogged();
    this.username.next(this.sharingService.getUsername());
    this.logging = this.sharingService.getLogging();
  }

  getLogged(): boolean {
    return this.logged;
  }

  setLogged(b: boolean) {
    this.sharingService.setLogged(b);
    this.logged = b;
  }

  setUsername(username: string) {
    this.sharingService.setUsername(username);
    this.username.next(username);
  }

  getLogging() {
    return this.logging;
  }

  setLogging(l: boolean) {
    this.sharingService.setLogging(l);
    this.logging = l;
  }
}
