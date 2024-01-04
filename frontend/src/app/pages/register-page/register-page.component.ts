import { Component } from '@angular/core';
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
export class RegisterPageComponent {
  userBMI: any;
  height: number = 170;
  weight: number = 70;
  constructor(private formBuilder: FormBuilder) {}

  startDate = new Date(1990, 0, 1);

  selected = 'option2';

  fake = ['chuj', 'dupa', 'cyce'];

  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  calculateBMI(height: number, weight: number) {
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
    // profilePhoto: ['', Validators.required],
    password: ['', Validators.required],
    repeatPassword: ['', Validators.required],
    userAge: ['', Validators.required],
    userHeight: ['', Validators.required],
    userWeight: ['', Validators.required],
    userGender: ['', Validators.required],
    userActivityMode: ['', Validators.required],
  });
  secondFormGroup = this.formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  repeatPasswordVisibility: boolean = false;
  passwordVisibility: boolean = false;
  isEditable = false;
}
