/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CaloriesService } from './calories.service';

describe('Service: Calories', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CaloriesService]
    });
  });

  it('should ...', inject([CaloriesService], (service: CaloriesService) => {
    expect(service).toBeTruthy();
  }));
});
