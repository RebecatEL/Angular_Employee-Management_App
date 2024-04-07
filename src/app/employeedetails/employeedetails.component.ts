import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GraphqlapiService } from '../network/graphqlapi.service';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-employeedetails',
  templateUrl: './employeedetails.component.html',
  styleUrl: './employeedetails.component.css'
})
export class EmployeedetailsComponent implements OnInit {
  //@Input() employee: Employee | undefined;

  employee: Employee = {} as Employee; // Initialize employee object
  employeeId: string = '';

  constructor(private graphqlService: GraphqlapiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Retrieve employee ID from route parameters
    this.route.params.subscribe(params => {
      this.employeeId = String(params['id']);
      console.log('Employee ID:', this.employeeId);
    // this.route.params.subscribe(params => {
    //   const employeeJson = params['employee'];
    //   this.employee = JSON.parse(employeeJson);
     });
    this.fetchEmployeeDetails(this.employeeId);
  }

  fetchEmployeeDetails(employeeId: string) {
      // Call API function to fetch employee details by ID
      if (this.employee) {
    this.graphqlService.getOneEmployeeById(employeeId)
      .subscribe((response: any) => {
          if (response && response.data && response.data.getEmployeeByID) {
            this.employee = response.data.getEmployeeByID;
            console.log('Employee details:', this.employee);
          } else {
            console.error('Invalid response format:', response);
          }
        },
        error => {
          console.error('Error fetching employee details:', error);
        }
      );
    }

  }


}
