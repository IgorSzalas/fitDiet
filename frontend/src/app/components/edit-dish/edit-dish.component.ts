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
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  BehaviorSubject,
  Observable,
  filter,
  first,
  map,
  startWith,
} from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';
import dayjs from 'dayjs';
import { User } from '../../models/user';
import { RecipeService } from '../../services/recipe.service';
import { UserService } from '../../services/user.service';
import { AddNewDishComponent } from '../add-new-dish/add-new-dish.component';
import { MatRadioModule } from '@angular/material/radio';
import { ChooseDishCardComponent } from '../choose-dish-card/choose-dish-card.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CaloriesService } from '../../services/calories.service';

@Component({
  standalone: true,
  selector: 'app-edit-dish',
  templateUrl: './edit-dish.component.html',
  styleUrls: ['./edit-dish.component.scss'],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatRadioModule,
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
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ChooseDishCardComponent,
  ],
})
export class EditDishComponent implements OnInit {
  dishID: any;
  constructor(
    private readonly form: FormBuilder,
    private readonly userService: UserService,
    private readonly recipeService: RecipeService,
    private readonly caloriesService: CaloriesService,
    public dialogRef: MatDialogRef<EditDishComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly toastService: HotToastService
  ) {
    console.log(dialogRef);
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

    this.editDishForm = this.form.group<any>({
      title: [Validators.required],
      dishDate: ['12', Validators.required],
      dishRecipe: [Validators.required],
    });
  }
  editDishForm: FormGroup;
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
  dishChecked: any;
  //inputData: any = this.formatDate(new Date());

  x() {
    console.log(this.editDishForm.controls['dishRecipe'].value.caloricValue);
  }

  ngOnInit() {
    console.log('Data ', this.data);
    console.log(this.data.dayData.event._def.publicId);
    console.log(this.editDishForm.controls['dishRecipe'].value);
    // this.getDishByID(this.data.dayData.event._def.publicId);
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value: any) => this._filter(value || ''))
    );

    this.fetchUserData();
    this.fetchUserProposedDishes();

    console.log('this.dialogRef CALORIC VALUE: ', this.data);
    this.userData
      .asObservable()
      .pipe(filter<any>(Boolean))
      .subscribe((value: any) => {
        this.restCalories = this.caloriesService.calculateCalories(
          value.plannedDishes,
          value,
          this.editDishForm.controls['dishDate'].value,
          this.editDishForm.controls['dishRecipe'].value.caloricValue
        );
        console.log(
          ' this.editDishForm.controls["dishDate"].value ',
          this.editDishForm.controls['dishDate'].value
        );
      });

    this.editDishForm.controls['dishRecipe'].valueChanges.subscribe((value) => {
      this.restCalories = this.caloriesService.calculateCalories(
        this.userData.value.plannedDishes,
        this.userData.value,
        this.editDishForm.controls['dishDate'].value,
        value.caloricValue
      );
    });
  }

  isCheckedDish(dish: any) {
    return dish.id === this.dishChecked.id;
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

  // getDishByID(dishID: string) {
  //   this.userService
  //     .getUserDishesData(dishID)
  //     .subscribe((userDishesData: any) => console.log(userDishesData));
  // }

  updateUserData() {
    const token = JSON.parse(localStorage.getItem('token')!);
    console.log(token.UserID);
    const dishData = {
      dishID: this.dishID,
      dateOfConsumption: this.editDishForm.controls['dishDate'].value,
      dishRecipe: this.editDishForm.controls['dishRecipe'].value,
      dishTitle: this.editDishForm.controls['title'].value,
    };
    this.userService
      .updateUserDish(
        token.UserID,
        this.dialogRef.componentInstance.dishChecked.id,
        dishData
      )
      .subscribe((result) => {
        console.log(result);
      });
  }

  deleteUserDishData() {
    const token = JSON.parse(localStorage.getItem('token')!);
    console.log(token.UserID);
    const dishData = {
      dishID: this.dishID,
    };
    this.userService
      .deleteUserDish(
        token.UserID,
        dishData
      )
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
        console.log('userData: ', userData);
        this.userCalories = userData.caloricDemand;
        console.log('this.userCalories: ' + this.userCalories);
        const eventData = userData.plannedDishes.filter(
          (dish: any) => dish.dishID === this.data.dayData.event._def.publicId
        );

        console.log(eventData);

        this.dishChecked = eventData[0].dishRecipe;
        this.dishID = eventData[0].dishID;

        this.editDishForm.controls['title'].setValue(eventData[0].dishTitle);
        this.editDishForm.controls['dishDate'].setValue(
          eventData[0].dateOfConsumption
        );
        this.editDishForm.controls['dishRecipe'].setValue(
          eventData[0].dishRecipe
        );
        this.userData.next(userData);
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
        this.editDishForm.controls['dishDate'].setValue(
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
      dishRecipe: this.editDishForm.controls['dishRecipe'].value,
    };
    this.userService
      .addDishToUser(token.UserID, dishData)
      .pipe(first())
      .subscribe((result) => {
        console.log(result);
      });
  }

  private addDishToCalendar(dayData: any) {
    //Wyświetlanie pozostałych kalorii danego dnia
    // const calendarApi = dayData.view.calendar;
    const calendarAPI = dayData.componentInstance.data.dayData.view.calendar;
    console.log(calendarAPI);
    const dishTitle = this.editDishForm.controls['title'].value;
    const dishDate = this.editDishForm.controls['dishDate'].value;
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

  // public modifyUserDish(): any {
  //   const token = JSON.parse(localStorage.getItem('token')!);
  //   console.log(this.data.dayData.event._def.publicId);
  //   console.log(
  //     this.userData
  //       .getValue()
  //       .plannedDishes.filter(
  //         (dish: any) => dish.dishID === this.data.dayData.event._def.publicId
  //       )
  //   );

  //   // const dishData = {
  //   //   dishTitle:
  //   // }
  //   // this.userService.updateUserDish(token.UserID, dishID,dishData).subscribe(result=>{
  //   //   console.log(result)
  //   // })
  // }
}
