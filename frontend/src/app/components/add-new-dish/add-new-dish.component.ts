import { CaloriesService } from './../../services/calories.service';
import { userData } from './../../services/authorization.service';
import {
  first,
  of,
  pipe,
  Observable,
  BehaviorSubject,
  filter,
  startWith,
  map,
} from 'rxjs';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserService } from '../../services/user.service';
import { ChooseDishCardComponent } from '../choose-dish-card/choose-dish-card.component';
import { MatRadioModule } from '@angular/material/radio';
import { RecipeService } from '../../services/recipe.service';
import { HotToastService } from '@ngneat/hot-toast';
import dayjs from 'dayjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ConstantPool } from '@angular/compiler';
import { AsyncPipe } from '@angular/common';
import { User } from '../../models/user';

@Component({
  standalone: true,
  imports: [
    ChooseDishCardComponent,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatRadioModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  selector: 'app-add-new-dish',
  templateUrl: './add-new-dish.component.html',
  styleUrls: ['./add-new-dish.component.scss'],
})
export class AddNewDishComponent implements OnInit {
  constructor(
    private readonly form: FormBuilder,
    private readonly userService: UserService,
    private readonly recipeService: RecipeService,
    public dialogRef: MatDialogRef<AddNewDishComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly toastService: HotToastService,
    private readonly caloriesService: CaloriesService
  ) {
    this.userData = new BehaviorSubject<User>({
      favouriteIngredients: [],
      dislikedIngredients: [],
      ingredients: [],
      firstName: '',
      surname: '',
      email: '',
      password: '',
      userHeight: 170,
      userWeight: 70,
      userAge: 20,
      userActivityMode: 1.2,
      userGender: 'men',
      userType: 'user',
      dietProgres: [],
      plannedDishes: [],
      caloricDemand: 2000,
      dateOfBirth: ' ',
      dishesWithMeat: false,
      dishesWithGluten: false,
      dishesWithLactose: false,
    });
  }
  userData: BehaviorSubject<User>;
  userProposedDishes: any;
  calories: any;
  userCalories: any;
  restCalories: any;
  options: string[] = [
    'Śniadanie',
    'Drugie śniadanie',
    'Obiad',
    'Podwieczorek',
    'Kolacja',
  ];
  myControl = new FormControl('');
  filteredOptions!: Observable<string[]>;
  //inputData: any = this.formatDate(new Date());
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );

    this.fetchUserData();
    this.fetchUserProposedDishes();

    console.log('this.dialogRef CALORIC VALUE: ', this.data);
    // this.userData
    //   .asObservable()
    //   .pipe(filter<any>(Boolean))
    //   .subscribe((value) => {
    //     this.calculateRestCalories(value);
    //   });
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  onSubmit() {
    this.addDishToCalendar(this.dialogRef);
  }

  calculateRestCalories(dishCaloricValue: any) {
    console.log(' DUPA ', dishCaloricValue);
    const date = dayjs().format('DD-MM-YYYY');
    console.log(' this.userData: ', this.userData);
    this.restCalories = this.caloriesService.calculateCalories(
      this.userData.getValue().plannedDishes,
      this.userData.getValue(),
      date,
      dishCaloricValue
    );
    console.log('RESTCALORIES ', this.restCalories);
  }

  fetchUserData() {
    const token = JSON.parse(localStorage.getItem('token')!);
    console.log(token.UserID);
    return this.userService
      .getUserDataByID(token.UserID)
      .pipe(first())
      .subscribe((userData: any) => {
        this.userData.next(userData);
        console.log('userData: ', this.userData.getValue());
        this.userCalories = this.userData.getValue().caloricDemand;
        console.log('this.userCalories: ' + this.userCalories);
      });
  }

  fetchUserProposedDishes() {
    const token = JSON.parse(localStorage.getItem('token')!);
    // console.log('TOKEN: ', token.UserID);
    this.recipeService
      .getRecipesByUserPreferences(token.UserID)
      .pipe(first())
      .subscribe((recipes: any) => {
        console.log('RECIPES: ', recipes);
        this.userProposedDishes = recipes;
        this.addNewDishForm.controls['dishDate'].setValue(
          this.formatDate(this.dialogRef.componentInstance.data.dayData.start)
        );
      });
  }

  addDishToUser(dishTitle: string, dishDate: string) {
    const token = JSON.parse(localStorage.getItem('token')!);
    console.log('TOKEN in addDishToUser: ', token.UserID);
    const dishData = {
      dishTitle: dishTitle,
      dateOfConsumption: dishDate,
      dishRecipe: this.addNewDishForm.controls['dishRecipe'].value,
    };
    this.userService
      .addDishToUser(token.UserID, dishData)
      .pipe(first())
      .subscribe((result) => {
        console.log(result);
      });
  }

  private addDishToCalendar(dayData: any) {
    // Wyświetlanie pozostałych kalorii danego dnia
    // const calendarApi = dayData.view.calendar;
    const calendarAPI = dayData.componentInstance.data.dayData.view.calendar;
    console.log(calendarAPI);
    const dishTitle = this.addNewDishForm.controls['title'].value;
    const dishDate = this.addNewDishForm.controls['dishDate'].value;
    calendarAPI.unselect(); // clear date selection
    if (dishTitle && dishDate) {
      this.addDishToUser(dishTitle, dishDate);
    } else {
      this.toastService.error('Błąd dodania posiłku!', {
        autoClose: true,
        dismissible: true,
      });
    }

    // if (dishTitle && dishDate) {
    //   calendarAPI.addEvent({
    //     id: 1,
    //     title: dishTitle,
    //     start: dishDate,
    //     end: '2024-01-04T08:00',
    //     allDay: dayData.allDay,
    //   });
    // }
  }

  private formatDate(date: any) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const paddedMonth = String(month).padStart(2, '0');
    const paddedDay = String(day).padStart(2, '0');
    const paddedHours = String(hours).padStart(2, '0');
    const paddedMinutes = String(minutes).padStart(2, '0');

    const formatted = `${year}-${paddedMonth}-${paddedDay}T${paddedHours}:${paddedMinutes}`;
    console.log(formatted);
    return formatted;
  }

  addNewDishForm = this.form.group({
    title: ['', Validators.required],
    // time: ['', Validators.required],
    dishDate: ['', Validators.required],
    dishRecipe: ['', Validators.required],
  });
}
