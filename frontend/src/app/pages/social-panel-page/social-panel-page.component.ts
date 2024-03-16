import { UserService } from './../../services/user.service';
import { Component, OnInit, Output } from '@angular/core';
import { UserPostComponent } from '../../components/user-post/user-post.component';
import { PostService } from '../../services/post.service';
import { Observable, first, pipe } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { AddNewPostComponent } from '../../components/add-new-post/add-new-post.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import dayjs from 'dayjs';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    CommonModule,
    UserPostComponent,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    MatDatepickerModule,
  ],
  selector: 'app-social-panel-page',
  templateUrl: 'social-panel-page.component.html',
  styleUrls: ['social-panel-page.component.scss'],
})
export class SocialPanelPageComponent implements OnInit {
  constructor(
    private readonly postService: PostService,
    private readonly dialog: MatDialog,
    private readonly form: FormBuilder,
    private readonly userService: UserService,
    private readonly toastService: HotToastService
  ) {}

  ngOnInit() {
    this.fetchUserData();
    this.fetchAllPosts();
  }
  userData: any;
  posts: any;

  commentForm = this.form.group({
    comment: ['', Validators.required],
  });

  fetchAllPosts(): any {
    return this.postService
      .getAllPosts()
      .pipe(first())
      .subscribe((posts: any) => {
        this.posts = posts;
        console.log(this.posts);
      });
  }

  fetchUserData() {
    const token = JSON.parse(localStorage.getItem('token')!);
    console.log(token.UserID);
    return this.userService
      .getUserDataByID(token.UserID)
      .pipe(first())
      .subscribe((userData: any) => {
        this.userData = userData;
        console.log('userData: ', userData);
      });
  }

  deleteUserComment(postID: string, commentID: string) {
    console.log('CommentID: ' + commentID);
    
    return this.postService
      .deleteComment(postID, commentID)
      .pipe(first())
      .subscribe({
        next: (result: any) => {
          console.log(result);
        },
        complete: () => {
          this.toastService.success('Usunięto komentarz!', {
            autoClose: true,
            dismissible: true,
          }),
            this.fetchAllPosts();
        },
      });
  }

  deleteUserPost(postID: string) {
    return this.postService
      .deletePost(this.userData.id, postID)
      .pipe(first())
      .subscribe({
        next: (result: any) => {
          console.log(result);
        },
        complete: () => {
          this.toastService.success('Usunięto post!', {
            autoClose: true,
            dismissible: true,
          }),
            this.fetchAllPosts();
        },
      });
  }

  addUserComment(postID: string) {
    let commentID =  (Math.random() + 30).toString(36).substring(2)+ (Math.random() + 30).toString(36).substring(2);
    const commentData = {
      commentID: commentID,
      creatorID: this.userData.id,
      creatorUsername: this.userData.firstName + ' ' + this.userData.surname,
      commentContent: this.commentForm.controls['comment'].value,
      creationDate: dayjs().format('DD-MM-YYYY'),
    };
    console.log(commentData.commentID);
    return this.postService
      .addComment(postID, commentData)
      .pipe(first())
      .subscribe({
        next: (result: any) => {
          console.log(result),
            this.commentForm.controls['comment'].setValue('');
        },
        complete: () => {
          this.toastService.success('Dodano komentarz!', {
            autoClose: true,
            dismissible: true,
          }),
            this.fetchAllPosts();
        },
      });
  }

  openAddNewPostModal() {
    const addNewDishDialog = this.dialog.open(AddNewPostComponent, {
      width: '500px',
    });
    addNewDishDialog.afterClosed().subscribe((result: any) => {
      console.log(result);
      this.fetchAllPosts();
    });
  }
}
