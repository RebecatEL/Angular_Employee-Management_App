import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  //private isLoggedIn: boolean = false;
  private isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();

  constructor() { }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  login() {
    // this.isLoggedIn = true;
    this.isAuthenticated = true;
    this.authStatusListener.next(true);
  }

  logout() {
    // this.isLoggedIn = false;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
  }

  // isLoggedInUser(): boolean {
  //   return this.isLoggedIn;
  // }

  // Call this method to get the current authentication status
  getIsAuth() {
    return this.isAuthenticated;
  }
}
