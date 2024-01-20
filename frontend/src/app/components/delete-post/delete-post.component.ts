import { userData } from './../../services/authorization.service';
import { Component, Inject, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { first } from 'rxjs';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrls: ['./delete-post.component.scss'],
})
export class DeletePostComponent implements OnInit {
  constructor(
    private postService: PostService,
    private userService: UserService,
    public dialogRef: MatDialogRef<DeletePostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  userData: any;

  ngOnInit() {
    console.log('this.data ', this.data.postID);
    this.fetchUserData();
  }

  fetchUserData() {
    const token = JSON.parse(localStorage.getItem('token')!);
    console.log(token.UserID);
    return this.userService
      .getUserDataByID(token.UserID)
      .pipe(first())
      .subscribe((userData: any) => {
        this.userData = userData;
        console.log(this.userData);
      });
  }

  deletePost() {
    this.postService
      .deletePost(this.userData.id, this.data.postID)
      .subscribe((result: any) => {
        console.log(result);
      });
  }
}
