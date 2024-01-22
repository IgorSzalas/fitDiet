import { userData } from './../../services/authorization.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatNativeDateModule } from '@angular/material/core';
import { UserCommentComponent } from '../user-comment/user-comment.component';
import { MatDialog } from '@angular/material/dialog';
import { DeletePostComponent } from '../delete-post/delete-post.component';
import { PostService } from '../../services/post.service';
import { first } from 'rxjs';
import { UserService } from '../../services/user.service';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import dayjs from 'dayjs';
import { HotToastService } from '@ngneat/hot-toast';
@Component({
  standalone: true,
  imports: [
    MatExpansionModule,
    MatNativeDateModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    UserCommentComponent,
    ReactiveFormsModule,
  ],
  selector: 'app-user-post',
  templateUrl: 'user-post.component.html',
  styleUrls: ['user-post.component.scss'],
})
export class UserPostComponent implements OnInit {
  constructor(
    private readonly dialog: MatDialog,
    private readonly postService: PostService,
    private readonly userService: UserService,
    private readonly form: FormBuilder,
    private readonly toastService: HotToastService
  ) {
    this.fetchUserData();
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  @Output() fetchPostData = new EventEmitter<any>();

  @Input() postID?: string;
  @Input() postTitle?: string;
  @Input() postCreator?: string;
  @Input() postContent?: string;
  @Input() postDate?: string;
  @Input() postComments?: any;

  commentData:
    | {
        commentContent: string;
        creationDate: string;
        creatorUsername: string;
        creatorID: string;
      }
    | undefined;

  userData: any;

  openDeletePostModal() {
    const addNewDishDialog = this.dialog.open(DeletePostComponent, {
      data: { postID: this.postID },
      width: '300px',
    });
    addNewDishDialog.afterClosed().subscribe((result: any) => {
      console.log(result);
      console.log(this.postID);
      this.fetchPostsData();
      this.toastService.success('Dodano nowy post!', {
        autoClose: true,
        dismissible: true,
      });
    });
  }

  fetchPostsData() {
    this.fetchPostData.emit();
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

  commentForm = this.form.group({
    comment: ['', Validators.required],
  });

  addNewComment(postID: string) {
    this.commentData = {
      commentContent: this.commentForm.controls['comment'].value!,
      creationDate: dayjs().format('DD-MM-YYYY'),
      creatorUsername: this.userData.firstName + ' ' + this.userData.surname,
      creatorID: this.userData.id,
    };
    this.postService
      .addComment(postID, this.commentData)
      .subscribe((result: any) => {
        console.log(result);
      });
  }
}
