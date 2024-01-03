import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly http: HttpClient) {}

  // setToken(request: any): any {
  //   const token = sessionStorage.getItem('authorizationToken');
  //   let header = new HttpHeaders();
  //   header = header.set('Auth', 'Bearer ' + token);
  //   request.headers.set('Authorization', 'Bearer ' + token);
  //   return request;
  // }

  getAllUsers(): any {
    return this.http.get<any>('http://localhost:9000/users');
  }

  getUserData(): any {
    this.http.get<any>('https://localhost:9000/users');
  }

  updateUserWeight(): any {
    const userData = {};
    // this.http.put<any>('',)
  }

  addNewDish(): any {
    this.http.post<any>('https://localhost:9000/users', null);
  }
}
