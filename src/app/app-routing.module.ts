import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EmployeelistComponent } from './employeelist/employeelist.component';
import { EmployeedetailsComponent } from './employeedetails/employeedetails.component';
import { EmployeeupdatesComponent } from './employeeupdates/employeeupdates.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: EmployeelistComponent },
  { path: 'home/:id', component: EmployeedetailsComponent },
  // { path: 'employee/:employee', component: EmployeedetailsComponent },
  { path: 'home/update/:id', component: EmployeeupdatesComponent },
  { path: 'create', component: EmployeeupdatesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
