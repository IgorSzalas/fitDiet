import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DeleteCommentComponent } from '../delete-comment/delete-comment.component';
import { AddNewPostComponent } from '../add-new-post/add-new-post.component';

@Component({
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule],
  selector: 'app-user-comment',
  templateUrl: './user-comment.component.html',
  styleUrls: ['./user-comment.component.scss'],
})
export class UserCommentComponent implements OnInit {
  @Output() fetchPostData = new EventEmitter<any>();

  @Input() postID?: string;
  @Input() commentContent?: string;
  @Input() creationDate?: string;
  @Input() creatorUsername?: string;
  @Input() creatorID?: string;
  @Input() userID?: string;
  constructor(private readonly dialog: MatDialog) {}

  ngOnInit() {}

  fetchPostsData() {
    this.fetchPostData.emit();
  }
  
}
