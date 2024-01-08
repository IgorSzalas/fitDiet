import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../services/user.service';
import { first } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly userService: UserService
  ) {}

  ngOnInit() {}

  data: any;
  userData: any;
  editUserData:
    | {
        firstName: string | null;
        surname: string | null;
        email: string | null;
        userType: string | null;
      }
    | undefined;

  editUserForm = this.formBuilder.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    email: ['', Validators.required],
    userType: ['', Validators.required],
  });

  fetchUserByID(userID: string) {
    this.userService
      .getUserDataByID(userID)
      .pipe(first())
      .subscribe((userData: any) => {
        this.userData = userData;
        console.log(userData);
        this.editUserForm.setValue({
          name: this.userData.firstName,
          surname: this.userData.surname,
          email: this.userData.email,
          userType: this.userData.userType,
        });
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
