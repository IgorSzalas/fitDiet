import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../services/user.service';
import { first } from 'rxjs';
@Component({
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  selector: 'app-add-new-measurment',
  templateUrl: './add-new-measurment.component.html',
  styleUrls: ['./add-new-measurment.component.scss'],
})
export class AddNewMeasurmentComponent implements OnInit {
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly userService: UserService,
    public dialogRef: MatDialogRef<AddNewMeasurmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  userData: any;
  userDietData: any;
  userBMI: number | undefined;
  actualDate: string | undefined;
  ngOnInit() {
    const date = new Date().toLocaleString().replace(/T.*$/, '').split(',');

    this.fetchUserData();
    this.weightForm.controls['time'].setValue(date[0]);

    console.log(
      this.weightForm.controls['weight'].setValue(
        this.data.dietProgres[this.data.dietProgres.lenght - 1]
      )
    );

    console.log('DATA: ', this.data);
    console.log(
      'dietProgres: ',
      this.data.dietProgres[this.data.dietProgres.lenght - 1]
    );
  }

  weightForm = this.formBuilder.group({
    weight: [Validators.required],
    time: ['', Validators.required],
  });

  fetchUserData() {
    const token = JSON.parse(localStorage.getItem('token')!);
    console.log(token.UserID);
    return this.userService
      .getUserDataByID(token.UserID)
      .pipe(first())
      .subscribe((userData: any) => {
        this.userData = userData;
        this.weightForm.controls['weight'].setValue(this.userData.userWeight);
      });
  }

  addNewUserMeasurment() {
    const token = JSON.parse(localStorage.getItem('token')!);
    console.log(token.UserID);
    const userWeight = this.weightForm.controls['weight'].value!;
    console.log(userWeight);
    this.userBMI =
      (10000 * userWeight) / (this.data.userHeight * this.data.userHeight);
    console.log('userBMI: ', this.userBMI);

    this.userDietData = {
      weight: this.weightForm.controls['weight'].value,
      bmi: this.userBMI,
      date: this.weightForm.controls['time'].value,
    };
    this.userService
      .addUserNewDietMeasurment(token.UserID, this.userDietData)
      .subscribe((result: any) => console.log(result));
  }
}
