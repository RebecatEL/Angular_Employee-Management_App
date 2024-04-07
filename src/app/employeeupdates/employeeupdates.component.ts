import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GraphqlapiService } from '../network/graphqlapi.service';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-employeeupdates',
  templateUrl: './employeeupdates.component.html',
  styleUrl: './employeeupdates.component.css'
})
export class EmployeeupdatesComponent implements OnInit{
  // @Input() employee: Employee | undefined;
  //@Output() saveEmployee: EventEmitter<Employee> = new EventEmitter<Employee>();
  //@Output() createEmployee: EventEmitter<Employee> = new EventEmitter<Employee>();

  employee: Employee = {} as Employee; // Initialize employee object
  employeeId: string = '';
  isEditMode: boolean = false;
  employeeForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, 
    private graphqlService: GraphqlapiService, 
    private route: ActivatedRoute,
    private router: Router) {
  
    // this.employeeForm = this.formBuilder.group({
    //   firstname: ['', Validators.required],
    //   lastname: ['', Validators.required],
    //   email: ['', [Validators.required, Validators.email]],
    //   gender: ['', Validators.required],
    //   salary: ['', Validators.required]
    // });
  }
  ngOnInit(): void {
    this.isEditMode = false;

    this.employeeForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      salary: ['', Validators.required]
    });

    //throw new Error('Method not implemented.');
    this.route.params.subscribe(params => {
      this.employeeId = String(params['id']);
      console.log('Employee ID:', this.employeeId);
      if (this.employeeId  && this.employeeId.length > 23) {
        this.isEditMode = true;
        this.fetchEmployeeDetails(this.employeeId);

      }else {
        this.isEditMode = false;
      }
      console.log('Is Edit Mode:', this.isEditMode);
  });
}

  fetchEmployeeDetails(employeeId: string) {
    // Call API function to fetch employee details by ID
    if (this.employee) {
  this.graphqlService.getOneEmployeeById(employeeId)
    .subscribe((response: any) => {
        if (response && response.data && response.data.getEmployeeByID) {
          const responseData  = response.data.getEmployeeByID;
          console.log('Employee details:', responseData );
          this.employee.id = responseData.id;
          this.employee.firstname = responseData.firstname;
          this.employee.lastname = responseData.lastname;
          this.employee.email = responseData.email;
          this.employee.gender = responseData.gender;
          this.employee.salary = responseData.salary;
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

  ngOnChanges(): void {
    if (this.employee) {
      this.employeeForm.patchValue(this.employee);
    }
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      // const updatedEmployee: Employee = { ...this.employeeForm.value };
      // this.saveEmployee.emit(updatedEmployee);

      this.graphqlService.updateEmployee(this.employee).subscribe(
        (response: any) => {
          // Handle success response
          alert('Employee updated successfully');
          console.log('Employee updated successfully:', response);
          this.isEditMode = false;
          // Redirect to employee list or view page
          this.router.navigate(['/home']);
        },
        error => {
          // Handle error response
          console.error('Error updating employee:', error);
          this.isEditMode = false;
        })
    }
  }

  onCreate(): void {
    if (this.employeeForm.valid) {
      // const createdEmployee: Employee = { ...this.employeeForm.value };
      // this.createEmployee.emit(createdEmployee);
      this.graphqlService.addEmployee(this.employeeForm.value).subscribe(
        (response: any) => {
          // Handle success response
          alert('Employee added successfully');
          console.log('Employee added successfully:', response);
          // Redirect to employee list or view page
          this.router.navigate(['/home']);
        },
        error => {
          // Handle error response
          console.error('Error adding employee:', error);
        }
      );
    }
  }
}
