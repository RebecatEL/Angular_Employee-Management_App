import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthserviceService } from './authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnDestroy{

  title = '101395302_COMP3133_Assignment2';

  userIsAuthenticated = false;
  private authListenerSubs: Subscription = new Subscription();

  constructor(private authService: AuthserviceService, private router: Router) {}

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onLogout() {
    this.authService.logout();
    // redirect to login page
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  // isLoggedIn(): boolean {
  //   return this.authService.isLoggedInUser();
  // }

  // logout(): void {
  //   this.authService.logout();
  // }
}
