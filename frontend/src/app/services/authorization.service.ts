import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  constructor(private http: HttpClient, private readonly router: Router) {}

  login(email: string, password: string): any {
    const httpOptions = {
      email: email,
      password: password,
    };
    return this.http.post('http://localhost:9000/login', httpOptions);
  }

  register(userData: any) {
    const httpOptions = {
      firstName: userData.firstName,
      surname: userData.surname,
      email: userData.email,
      password: userData.password,
      profilePhoto: userData.profilePhoto,
      dislikedIngredients: userData.dislikedIngredients,
      favouriteIngredients: userData.favouriteIngredients,
    };
    return this.http.post('http://localhost:9000/register', httpOptions);
  }

  logout() {
    sessionStorage.removeItem('authorizationToken');
    sessionStorage.removeItem('userRole');
    this.router.navigateByUrl('/');
  }

  userIsLogged() {
    return sessionStorage.getItem('authorizationToken') != null;
  }
}
