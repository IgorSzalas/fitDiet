import { AuthorizationService } from './../../services/authorization.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatIconModule,
    CdkDropList,
    CdkDrag,
    MatDividerModule,
    MatCheckboxModule,
    MatSliderModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authorizationService: AuthorizationService,
    private recipeService: RecipeService
  ) {}

  startDate = new Date(1990, 0, 1);

  selected = 'option2';

  fake = ['chuj', 'dupa', 'cyce'];

  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  userBMI: any;
  height: number = 170;
  weight: number = 70;
  userEnergyDemand: any;
  userData: any;
  repeatPasswordVisibility: boolean = false;
  passwordVisibility: boolean = false;
  isEditable = false;
  favouriteIngredients: string[] = [];
  dislikedIngredients: string[] = [];
  ingredients: string[] = [];
  vegetarianOption?: any;
  glutenFreeOption?: any;
  lactoseFreeOption?: any;

  ngOnInit(): void {
    this.fetchAllIngredients();
  }

  onSubmit() {
    this.userData = {
      firstName: this.firstFormGroup.controls['firstName'].value,
      surname: this.firstFormGroup.controls['surname'].value,
      email: this.firstFormGroup.controls['email'].value,
      password: this.firstFormGroup.controls['password'].value,
      repeatPassword: this.firstFormGroup.controls['repeatPassword'].value,
      // userEnergyDemand: this.userEnergyDemand,
      userWeight: this.firstFormGroup.controls['userWeight'].value,
      userHeight: this.firstFormGroup.controls['userHeight'].value,
      userAge: this.firstFormGroup.controls['userAge'].value,
      userActivityMode: this.firstFormGroup.controls['userActivityMode'].value,
      userGender: this.firstFormGroup.controls['userGender'].value,
      userType: 'USER',
      favouriteIngredients: this.favouriteIngredients,
      dislikedIngredients: this.dislikedIngredients,
      ingredients: this.ingredients,
      vegetarianOption:
        this.preferencesForm.controls['vegetarian'].value ?? false,
      glutenFreeOption:
        this.preferencesForm.controls['glutenFree'].value ?? false,
      lactoseFreeOption:
        this.preferencesForm.controls['lactoseFree'].value ?? false,
    };

    console.log('this.userData ONSUBMIT ', this.userData);
    this.authorizationService.register(this.userData).subscribe((register) => {
      console.log(register);
    });
  }

  fetchAllIngredients() {
    this.recipeService
      .getAllIngredients()
      .subscribe((ingredients: any) => (this.ingredients = ingredients));
  }

  calculateUserEnergyDemand(
    height: number,
    weight: number,
    age: number,
    gender: any,
    liveMode: any
  ) {
    if (gender === 'woman') {
      this.userEnergyDemand = 9.99 * weight + 6.25 * height - 4.92 * age - 161;
    } else if (gender === 'men') {
      this.userEnergyDemand = 9.99 * weight + 6.25 * height - 4.92 * age + 5;
    }

    this.userEnergyDemand * liveMode;
  }

  calculateBMI(height: number, weight: number) {
    this.calculateUserEnergyDemand(
      parseInt(this.firstFormGroup.controls['userHeight'].value!),
      parseInt(this.firstFormGroup.controls['userWeight'].value!),
      parseInt(this.firstFormGroup.controls['userAge'].value!),
      this.firstFormGroup.controls['userGender'].value,
      this.firstFormGroup.controls['userActivityMode'].value
    );
    this.userBMI = (10000 * this.weight) / (this.height * this.height);
    this.userBMI = Math.round(this.userBMI * 100) / 100;
    return this.userBMI;
  }

  uploadProfilePhoto(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
    };
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  firstFormGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
    surname: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    repeatPassword: ['', Validators.required],
    userAge: ['', Validators.required],
    userHeight: ['', Validators.required],
    userWeight: ['', Validators.required],
    userGender: ['', Validators.required],
    userActivityMode: ['', Validators.required],
  });

  preferencesForm = this.formBuilder.group({
    vegetarian: [this.vegetarianOption, Validators.required],
    glutenFree: [this.glutenFreeOption, Validators.required],
    lactoseFree: [this.lactoseFreeOption, Validators.required],
  });

  secondFormGroup = this.formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
}
