import { Injectable } from '@angular/core';
import {LoginService} from './login.service';

@Injectable({
  providedIn: 'root'
})
export class SharingService {

  username = 'username';
  logged = 'logged';
  logging = 'logging';

  constructor() {
  }

  setUsername(username: string) {
    localStorage.setItem(this.username, JSON.stringify(username));
  }

  setLogged(logged: boolean) {
    localStorage.setItem(this.logged, JSON.stringify(logged));
  }

  getUsername() {
    const data = localStorage.getItem(this.username);
    return JSON.parse(data);
  }

  getLogged() {
    const data = localStorage.getItem(this.logged);
    return JSON.parse(data);
  }

  setLogging(logging: boolean) {
    localStorage.setItem(this.logging, JSON.stringify(logging));
  }

  getLogging() {
    const data = localStorage.getItem(this.logging);
    return JSON.parse(data);
  }

  clearAll() {
    localStorage.clear();
  }
}
