import { userData } from './../../services/authorization.service';
import { UserService } from './../../services/user.service';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
  MatDialog,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { PostService } from '../../services/post.service';

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
  selector: 'app-add-new-post',
  templateUrl: './add-new-post.component.html',
  styleUrls: ['./add-new-post.component.scss'],
})
export class AddNewPostComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AddNewPostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly form: FormBuilder,
    private readonly dialog: MatDialog,
    private readonly postService: PostService,
    private readonly userService: UserService
  ) {}

  userData: any;

  ngOnInit() {
    this.fetchUserData();
  }

  fetchUserData(): any {
    const token = JSON.parse(localStorage.getItem('token')!);
    console.log(token.UserID);
    this.userService
      .getUserDataByID(token.UserID)
      .subscribe((userData: any) => {
        (this.userData = userData), console.log(userData);
      });
  }
  addNewPost() {
    const postData = {
      title: this.addNewPostForm.controls['title'].value,
      content: this.addNewPostForm.controls['content'].value,
      creatorID: this.userData.id,
    };
    this.postService
      .addNewPost(this.userData.id, postData)
      .subscribe((result: any) => {
        console.log(result);
      });
  }

  addNewPostForm = this.form.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
  });
}
