import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GraphqlapiService } from '../network/graphqlapi.service';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrl: './employeelist.component.css'
})
export class EmployeelistComponent implements OnInit{

  employees: Employee[] = [];
  // selectedEmployee: Employee | undefined;

  constructor(private graphqlService: GraphqlapiService, private router: Router) { }

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees() {
    this.graphqlService.getEmployees()
    .subscribe((response: any) => {
        if (response && response.data && response.data.getAllEmployees) {
          this.employees = response.data.getAllEmployees;
        } else {
          console.error('Invalid response format:', response);
        }
      },
      error => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  viewEmployee(employee: Employee) {
    //this.selectedEmployee = employee;
    this.router.navigate(['/home', employee.id ]);
    // this.router.navigate(['/employee', { employee: JSON.stringify(employee) }]);
    //this.router.navigate(['/employee']);
  }

  updateEmployee(employee: Employee) {
    this.router.navigate(['/home/update', employee.id]);
  }

  deleteEmployee(employee: Employee) {
    const confirmDelete = confirm(`Are you sure you want to delete ${employee.firstname} ${employee.lastname}?`);
    if (confirmDelete) {
      this.graphqlService.deleteEmployee(employee.id).subscribe(
        () => {
          // Remove the deleted employee from the list
          this.employees = this.employees.filter(emp => emp.id !== employee.id);
          alert('Employee deleted successfully');
          console.log('Employee deleted successfully');
        },
        error => {
          console.error('Error deleting employee:', error);
        }
      );
    }
  }

  addEmployee() {
    this.router.navigate(['/create']);
  }
}
