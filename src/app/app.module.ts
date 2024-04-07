import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { EmployeelistComponent } from './employeelist/employeelist.component';
import { AuthserviceService } from './authservice.service';
import { EmployeedetailsComponent } from './employeedetails/employeedetails.component';
import { EmployeeupdatesComponent } from './employeeupdates/employeeupdates.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmployeelistComponent,
    EmployeedetailsComponent,
    EmployeeupdatesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AuthserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
