import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
    return this.http.get<any>('https://localhost:9000/users');
  }

  getUserDataByID(userID: string): any {
    const userParams = new HttpParams().set('userID', userID);
    return this.http.get<any>('http://localhost:9000/users/user', {
      params: userParams,
    });
  }

  getUserDietProgresData(userID: string): any {
    const userParams = new HttpParams().set('userID', userID);
    return this.http.get<any>('http://localhost:9000/users/user-progres', {
      params: userParams,
    });
  }

  deleteUser(userID: string): any {
    const userParams = new HttpParams().set('userID', userID);
    return this.http.delete<any>('http://localhost:9000/users/delete', {
      params: userParams,
    });
  }

  updateUserWeight(): any {
    const userData = {};
    // this.http.put<any>('',)
  }

  addDishToUser(userID: string, newDish: any) {
    const userParams = new HttpParams().set('userID', userID);
    console.log('addDishToUser TOKEN: ', userID);
    return this.http.put<any>(
      'http://localhost:9000/users/user/add-new-dish',
      newDish,
      {
        params: userParams,
      }
    );
  }

  editUserIgredients(userID: string, user: any) {
    const userParams = new HttpParams().set('userID', userID);
    return this.http.put<any>(
      'http://localhost:9000/users/igredients/edit',
      user,
      {
        params: userParams,
      }
    );
  }

  editUser(userID: string, user: any) {
    const userParams = new HttpParams().set('userID', userID);
    return this.http.put<any>(`http://localhost:9000/users/edit`, user, {
      params: userParams,
    });
  }
}
