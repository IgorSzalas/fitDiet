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
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';

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
    ReactiveFormsModule,
    MatRadioModule,
    FormsModule,
  ],
  templateUrl: 'preferences-page.component.html',
  styleUrl: 'preferences-page.component.scss',
})
export class PreferencesPageComponent implements AfterViewInit {
  constructor(
    private readonly form: FormBuilder,
    private readonly userService: UserService
  ) {}

  preferencesForm = this.form.group({
    dietOption: [Validators.required],
  });
  ngAfterViewInit(): void {
    this.fetchUserData();
  }

  userData: any;
  favouriteIngredients: string[] = [];
  dislikedIngredients: string[] = [];
  ingredients: string[] = [];
  standardOption?: any;
  vegetarianOption?: any;
  glutenFreeOption?: any;
  lactoseFreeOption?: any;
  dietOption?: any;

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

  editUserIgredients() {
    const token = JSON.parse(localStorage.getItem('token')!);
    this.userData.favouriteIngredients = this.favouriteIngredients;
    this.userData.dislikedIngredients = this.dislikedIngredients;
    this.userData.ingredients = this.ingredients;
    this.userData.dietOption = this.dietOption;

    console.log(this.userData, this.preferencesForm);
    return this.userService
      .editUserIgredients(token.UserID, this.userData)
      .subscribe((result) => {
        console.log(result);
      });
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
        this.favouriteIngredients = this.userData.favouriteIngredients ?? [];
        this.dislikedIngredients = this.userData.dislikedIngredients ?? [];
        this.ingredients = this.userData.ingredients ?? [];
        this.dietOption = this.userData.dietOption;

        this.preferencesForm.setValue({
          dietOption: this.dietOption,
        });
      });
  }
}
