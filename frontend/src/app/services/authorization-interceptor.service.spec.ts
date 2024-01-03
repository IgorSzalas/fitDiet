/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthorizationInterceptorService } from './authorization-interceptor.service';

describe('Service: AuthorizationInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthorizationInterceptorService]
    });
  });

  it('should ...', inject([AuthorizationInterceptorService], (service: AuthorizationInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
