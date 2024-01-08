import { first, pipe } from 'rxjs';
import { UserService } from './../../services/user.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-preferences-page',
  standalone: true,
  imports: [
    CommonModule,
    CdkDropList,
    CdkDrag,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatCheckboxModule,
  ],
  templateUrl: 'preferences-page.component.html',
  styleUrl: 'preferences-page.component.scss',
})
export class PreferencesPageComponent implements OnInit, AfterViewInit {
  constructor(
    private readonly form: FormBuilder,
    private readonly userService: UserService
  ) {}

  preferencesForm = this.form.group({
    vegetarian: [this.vegetarianOption, Validators.required],
    glutenFree: [this.glutenFreeOption, Validators.required],
    lactoseFree: [this.lactoseFreeOption, Validators.required],
  });
  ngAfterViewInit(): void {
    this.fetchUserData();
  }
  ngOnInit(): void {}

  userData: any;

  favouriteIngredients: string[] = [];
  dislikedIngredients: string[] = [];
  ingredients: string[] = [];
  vegetarianOption?: any;
  glutenFreeOption?: any;
  lactoseFreeOption?: any;

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      console.log(this.favouriteIngredients);
      console.log(this.dislikedIngredients);
      console.log(this.ingredients);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  fetchUserData() {
    const token = JSON.parse(localStorage.getItem('token')!);
    console.log(token.UserID);
    return this.userService
      .getUserDataByID(token.UserID)
      .pipe(first())
      .subscribe((userData: any) => {
        this.userData = userData;
        console.log('userData: ', userData);
        this.favouriteIngredients = this.userData.favouriteIngredients;
        this.dislikedIngredients = this.userData.dislikedIngredients;
        this.ingredients = this.userData.ingredients ?? [];
        this.vegetarianOption = this.userData.dishesWithMeat;
        this.glutenFreeOption = this.userData.dishesWithGluten;
        this.lactoseFreeOption = this.userData.dishesWithLactose;

        this.preferencesForm.setValue({
          vegetarian: [this.vegetarianOption],
          glutenFree: [this.glutenFreeOption],
          lactoseFree: [this.lactoseFreeOption],
        });
      });
  }
}
