import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authorizationToken = sessionStorage.getItem('authorizationToken');
    console.log('authorizationToken ', authorizationToken);
    if (!authorizationToken) {
      return next.handle(request);
    } else {
      const clonedRequest = request.clone({
        headers: request.headers.set(
          'Authorization',
          'Bearer ' + authorizationToken
        ),
      });
      return next.handle(clonedRequest);
    }
  }
}
