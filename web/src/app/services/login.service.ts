import { Injectable } from '@angular/core';
import {BehaviorSubject, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private USERNAME = 'username';
  private LOGGED = 'logged';
  private username = new BehaviorSubject('');
  public currUsername = this.username.asObservable();
  private logged = false;

  constructor() {
    this.username.next(this.getUsername());
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
}
