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
    let userMifflin = this.calculateMifflinValue(
      userData.userHeight,
      userData.userWeight,
      userData.userGender,
      userData.dateOfBirth,
      userData.userActivityMode
    );

    plannedDishes.forEach((element: any) => {
      console.log(date)
      date = dayjs(date).format('DD-MM-YYYY');
      let elementDate = dayjs(element.dateOfConsumption).format('DD-MM-YYYY');
      console.log(date, elementDate)
      if (date === elementDate) {
        console.log(element)
        userMifflin -= element.dishRecipe.caloricValue;
      }
    });
    let restCalories = userMifflin - selectedDishCalories;
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
    console.log('today: ', today);

    let userDateOfBirth = dayjs(dateOfBirth).format('YYYY');
    console.log(userDateOfBirth);
    let actualAge = parseInt(today) - parseInt(userDateOfBirth);

    let Mifflin = 0;
    if (gender === 'men') {
      console.log('MEN');
      Mifflin =
        (9.99 * weight + 6.25 * height - 4.92 * actualAge + 5) * activityMode;
      Mifflin = Math.floor(Mifflin);
      console.log('Men Mifflin: ', Mifflin);
    } else if (gender === 'women') {
      console.log('WOMEN');
      Mifflin =
        (9.99 * weight + 6.25 * height - 4.92 * actualAge - 161) * activityMode;
      Mifflin = Math.floor(Mifflin);
      console.log('Women Mifflin : ', Mifflin);
    }

    return Mifflin;
  }
}
