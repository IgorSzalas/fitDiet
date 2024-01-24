import { first, pipe } from 'rxjs';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../services/user.service';

@Component({
  standalone: true,
  imports: [
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
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  userData: any;
  editUserData: any;
  constructor(
    private readonly userService: UserService,
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly form: FormBuilder
  ) {}

  ngOnInit() {
    this.fetchUserByID(this.data.userID);
  }

  editUserForm = this.form.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    email: ['', Validators.required],
    userType: ['', Validators.required],
  });

  fetchUserByID(userID: string) {
    this.userService
      .getUserDataByID(userID)
      .pipe(first())
      .subscribe({
        next:(userData: any) => {this.userData = userData;
          console.log(userData);
          this.editUserForm.setValue({
            name: this.userData.firstName,
            surname: this.userData.surname,
            email: this.userData.email,
            userType: this.userData.userType,
          });},


      });
  }

  modifyUserByID() {
    this.editUserData = {
      firstName: this.editUserForm.controls['name'].value,
      surname: this.editUserForm.controls['surname'].value,
      email: this.editUserForm.controls['email'].value,
      userType: this.editUserForm.controls['userType'].value,
    };

    this.userService
      .editUser(this.userData.id, this.editUserData)
      .pipe(first())
      .subscribe((result) => {
        console.log(result);
      });
    this.fetchUserByID(this.data.userID);
  }
}
