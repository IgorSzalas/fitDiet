import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../services/user.service';

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
  selector: 'app-add-new-water-measurement',
  templateUrl: './add-new-water-measurement.component.html',
  styleUrls: ['./add-new-water-measurement.component.scss'],
})
export class AddNewWaterMeasurementComponent implements OnInit {
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly userService: UserService
  ) {}

  userWaterData: any;

  ngOnInit() {
    const date = new Date().toLocaleString().replace(/T.*$/, '').split(',');
    this.waterForm.controls['time'].setValue(date[0]);
    console.log(date);
  }

  waterForm = this.formBuilder.group({
    drunkWater: ['', Validators.required],
    time: ['', Validators.required],
  });

  addNewWaterMeasurment() {
    const token = JSON.parse(localStorage.getItem('token')!);
    console.log(token.UserID);
    const userWaterData = {
      drunkWater: this.waterForm.controls['drunkWater'].value,
      time: this.waterForm.controls['time'].value,
    };

    this.userService.addUserNewWaterMeasurment(token.UserID, userWaterData);
  }
}
