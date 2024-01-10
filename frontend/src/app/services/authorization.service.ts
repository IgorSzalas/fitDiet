import { state } from '@angular/animations';
import { routes } from './../app.routes';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { BehaviorSubject, first, pipe } from 'rxjs';
import * as jose from 'jose';

interface userData {
  firstName: any;
  surname: any;
  email: any;
  password: any;
  userType: any;
  dishesWithGluten: any;
  dishesWithMeat: any;
  dishesWithLactose: any;
  dislikedIngredients: any;
  favouriteIngredients: any;
  ingredients: any;
}

interface AuthorizeInfo {
  payload: any;
  expiresAt: any;
  accessToken: string;
}

export const authorizationGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authorizationService = inject(AuthorizationService);
  if (authorizationService.isAuthenticated) return true;

  console.log(authorizationService.isAuthenticated);
  inject(Router).navigate(['/zaloguj-sie'], {
    queryParams: { returnUrl: state.url },
  });
  return false;
};
@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  constructor(private http: HttpClient, private readonly router: Router) {
    if (localStorage.getItem('token')) {
      console.log(sessionStorage.getItem('authorizationToken'));
      const token = jose.decodeJwt(
        sessionStorage.getItem('authorizationToken')!
      );
      const userData = {
        userID: token['UserID'],
        Email: token['Email'],
        Role: token['Role'],
      };
      this.authenticatedState.next({
        payload: userData,
        expiresAt: JSON.parse(localStorage.getItem('expiresAt')!),
        accessToken: localStorage.getItem('token')!,
      });
    }
  }

  public readonly authenticatedState: BehaviorSubject<
    AuthorizeInfo | undefined
  > = new BehaviorSubject<AuthorizeInfo | undefined>(undefined);

  public get userIsAuthenticated() {
    if (!this.isAuthenticated) return undefined;

    return this.authenticatedState.getValue()?.payload;
  }

  public get isAuthenticated() {
    const state = this.authenticatedState.getValue();
    console.log(state);
    return !!state?.accessToken;
  }

  login(email: string, password: string): any {
    const httpOptions = {
      email: email,
      password: password,
    };
    return this.http.post('http://localhost:9000/login', httpOptions);
  }

  loginToSession(email: string, password: string) {
    return this.login(email, password).pipe(
      first((response: any): boolean => {
        this.setSessionParameters(response);
        return true;
      })
    );
  }

  register(userData: userData) {
    const httpOptions = {
      firstName: userData.firstName,
      surname: userData.surname,
      email: userData.email,
      password: userData.password,
      userType: userData.userType,
      dishesWithGluten: userData.dishesWithGluten,
      dishesWithMeat: userData.dishesWithMeat,
      dishesWithLactose: userData.dishesWithLactose,
      ingredients: userData.ingredients,
      favouriteRecipes: [],
      plannedDishes: [],
      dietProgres: [],
      userPosts: [],
      dislikedIngredients: userData.dislikedIngredients,
      favouriteIngredients: userData.favouriteIngredients,
    };
    return this.http.post('http://localhost:9000/register', httpOptions);
  }

  parseJWT(token: string) {
    if (token) {
      const claims = jose.decodeJwt(token);
      console.log(claims);
      localStorage.setItem('token', JSON.stringify(claims));
    } else {
      throw new Error("Token hasn't been decoded");
    }
  }

  setSessionParameters(result: {
    accessToken: string;
    expiresAt: { valueOf: () => any };
    payload: any;
  }) {
    let tokenJWT = jose.decodeJwt(result.accessToken);
    console.log(result.accessToken);
    this.authenticatedState.next(result);
    localStorage.setItem('token', result.accessToken);
    localStorage.setItem('expiresAt', tokenJWT.exp!.toString());
    localStorage.setItem('user', JSON.stringify(result.payload));
  }

  logout() {
    localStorage.removeItem('token');
    sessionStorage.removeItem('authorizationToken');
    sessionStorage.removeItem('userRole');
    this.router.navigateByUrl('/');
  }

  userIsLogged() {
    return sessionStorage.getItem('authorizationToken') != null;
  }
}
