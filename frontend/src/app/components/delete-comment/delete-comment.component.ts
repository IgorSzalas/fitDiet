import { Component, Inject, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatDialogModule],
  selector: 'app-delete-comment',
  templateUrl: './delete-comment.component.html',
  styleUrls: ['./delete-comment.component.scss'],
})
export class DeleteCommentComponent implements OnInit {
  constructor(
    private postService: PostService,
    public dialogRef: MatDialogRef<DeleteCommentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    console.log(this.data);
  }

  deleteComment() {
    this.postService
      .deleteComment(this.data.userID, this.data.postID)
      .subscribe((result: any) => {
        console.log(result);
      });
  }
}
