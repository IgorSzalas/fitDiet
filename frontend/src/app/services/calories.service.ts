import dayjs from 'dayjs';
import { userData } from './authorization.service';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CaloriesService {
  constructor() {}

  calculateCalories(
    plannedDishes: any,
    userData: any,
    date: any,
    selectedDishCalories: any
  ) {
    let CPM = this.calculateMifflinValue(
      userData.userHeight,
      userData.userWeight,
      userData.userGender,
      userData.dateOfBirth,
      userData.userActivityMode
    );

    if (plannedDishes.length > 0) {
      plannedDishes.forEach((element: any) => {
        let dishDate = dayjs(date).format('DD-MM-YYYY');
        let elementDate = dayjs(element.dateOfConsumption).format('DD-MM-YYYY');
        if (dishDate == elementDate) {
          CPM -= element.dishRecipe.caloricValue;
        }
      });
    }
    let restCalories = CPM - selectedDishCalories;
    return restCalories;
  }

  calculateMifflinValue(
    height: any,
    weight: any,
    gender: any,
    dateOfBirth: any,
    activityMode: any
  ) {
    let today = dayjs().format('YYYY');
    let userDateOfBirth = dayjs(dateOfBirth).format('YYYY');
    let actualAge = parseInt(today) - parseInt(userDateOfBirth);
    let Mifflin = 0;
    if (gender === 'men') {
      console.log(
        'height: ' + height,
        'weight: ' + weight,
        'gender: ' + gender,
        'actualAge: ' + actualAge,
        'activityMode ' + activityMode
      );
      Mifflin = 10 * weight + 6.25 * height - 5 * actualAge + 5;
      console.log('test1: ', Mifflin);
      Mifflin = Mifflin * activityMode;
      Mifflin = Math.floor(Mifflin);
      console.log('test: ', Mifflin);
    } else if (gender === 'women') {
      Mifflin = 10 * weight + 6.25 * height - 5 * actualAge - 161;
      console.log('test1: ', Mifflin);
      Mifflin = Mifflin * activityMode;
      Mifflin = Math.floor(Mifflin);
      console.log('test: ', Mifflin);
    }
    return Mifflin;
  }
}
