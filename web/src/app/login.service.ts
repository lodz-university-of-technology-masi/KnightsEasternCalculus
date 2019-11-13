import { Injectable } from '@angular/core';
import {BehaviorSubject, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private username = new BehaviorSubject('');
  public currUsername = this.username.asObservable();
  private logged: boolean;

  constructor() {
    this.logged = false;
  }

  getLogged(): boolean {
    return this.logged;
  }

  setLogged(b: boolean) {
    this.logged = b;
  }

  setUsername(username: string) {
    this.username.next(username);
  }
}
