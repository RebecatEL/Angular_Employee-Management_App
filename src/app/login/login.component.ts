import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GraphqlapiService } from '../network/graphqlapi.service';
// import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { AuthserviceService } from '../authservice.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  email: string = '';
  password: string = '';

constructor(private graphqlService: GraphqlapiService, private authserviceSerive: AuthserviceService, private router: Router) { }

// Login function
login() {
  this.graphqlService.login(this.email, this.password)
    .subscribe(
      response => {
        if (response.data && response.data.login) {
          // User is valid, store user status and navigate to home page
          this.authserviceSerive.login();
          this.router.navigate(['/home']);
        } else {
          // User is not valid, handle error
          console.log('Invalid email or password');
          alert('Invalid email or password');
        }
      },
      error => {
        console.error('Error:', error);
      }
    );
}

}
