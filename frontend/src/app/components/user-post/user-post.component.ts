import { userData } from './../../services/authorization.service';
import { Component, Input, OnInit } from '@angular/core';
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
  ],
  selector: 'app-user-post',
  templateUrl: 'user-post.component.html',
  styleUrls: ['user-post.component.scss'],
})
export class UserPostComponent implements OnInit {
  constructor(
    private readonly dialog: MatDialog,
    private readonly postService: PostService,
    private readonly userService: UserService
  ) {
    this.fetchUserData();
  }
  @Input() postID?: string;
  @Input() postTitle?: string;
  @Input() postCreator?: string;
  @Input() postContent?: string;
  @Input() postDate?: string;
  @Input() postComments?: string;
  @Input() postReactions?: string;
  userData: any;

  openDeletePostModal() {
    const addNewDishDialog = this.dialog.open(DeletePostComponent, {
      data: { postID: this.postID },
      width: '300px',
    });
    addNewDishDialog.afterClosed().subscribe((result: any) => {
      console.log(result);
      console.log(this.postID);
      this.postService.getAllPosts().subscribe();
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

  addNewComment(postID: string) {
    this.postService
      .addComment(this.userData.id, postID)
      .subscribe((result: any) => {
        console.log(result);
      });
  }

  ngOnInit() {}
}
