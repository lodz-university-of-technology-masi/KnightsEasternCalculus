import { Injectable } from '@angular/core';
import {BehaviorSubject, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private USERNAME = 'username';
  private LOGGED = 'logged';
  private LOGGING = 'logging';
  private username = new BehaviorSubject('');
  public currUsername = this.username.asObservable();
  private logged = false;
  private logging = false;

  constructor() {

  }

  setLogged(b: boolean) {
    localStorage.setItem(this.LOGGED, JSON.stringify(b));
    this.logged = b;
  }

  getLogged(): boolean {
    return JSON.parse(localStorage.getItem(this.LOGGED));
  }

  setUsername(username: string) {
    localStorage.setItem(this.USERNAME, JSON.stringify(username));
    this.username.next(username);
  }

  getUsername() {
    return JSON.parse(localStorage.getItem(this.USERNAME));
  }

  getLogging() {
    return JSON.parse(localStorage.getItem(this.LOGGING));
  }

  setLogging(l: boolean) {
    localStorage.setItem(this.LOGGING, JSON.stringify(this.logging));
    this.logging = l;
  }
}
