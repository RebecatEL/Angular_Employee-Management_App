import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders  } from '@angular/common/http';

import { throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';

import { User } from '../models/user';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class GraphqlapiService {

  private API_SERVER = "https://evening-coast-54414-fe7e6416b2ea.herokuapp.com/graphql";

  constructor(private httpClient: HttpClient) { }

  // Below are all the Graphql API calls with POST method
  
  // Login
  // Check user is valid or not
  public login(email: string, password: string) {
    const query = {
      query: `query {
        login(email: "${email}", password: "${password}") {
          id
          username
          email
        }
      }`
    };

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.post<any>(this.API_SERVER, JSON.stringify(query), { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Employee
  // Get all employees
  public getEmployees() {
    const query = {
      query: `query {
        getAllEmployees {
          id
          firstname
          lastname
          email
          gender
          salary
        }
      }`
    };

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.post<any>(this.API_SERVER, JSON.stringify(query), { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Get employee by ID
  public getOneEmployeeById(id: string) {
    const query = {
      query: `query {
        getEmployeeByID(id: "${id}") {
          id
          firstname
          lastname
          email
          gender
          salary
        }
      }`
    };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.post<any>(this.API_SERVER, JSON.stringify(query), { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Update employee
  public updateEmployee(employee: Employee) {
    const query = {
      query: `mutation {
        updateEmployee(id: "${employee.id}", firstname: "${employee.firstname}", lastname: "${employee.lastname}"
        , email: "${employee.email}", gender: "${employee.gender}", salary: ${employee.salary}) {
          id
          firstname
          lastname
          email
          gender
          salary
        }
      }`
    };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.post<any>(this.API_SERVER, JSON.stringify(query), { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Delete employee
  public deleteEmployee(id: string) {
    const query = {
      query: `mutation {
        deleteEmployee(id: "${id}") {
          id
          firstname
          lastname
          email
          gender
          salary
        }
      }`
    };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.post<any>(this.API_SERVER, JSON.stringify(query), { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Add employee
  public addEmployee(employee: Employee) {
    const query = {
      query: `mutation {
        addNewEmployee(firstname: "${employee.firstname}", lastname: "${employee.lastname}"
        , email: "${employee.email}", gender: "${employee.gender}", salary: ${employee.salary}) {
          id
          firstname
          lastname
          email
          gender
          salary
        }
      }`
    };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.post<any>(this.API_SERVER, JSON.stringify(query), { headers })
      .pipe(
        catchError(this.handleError)
      );
  }


  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
  
}
