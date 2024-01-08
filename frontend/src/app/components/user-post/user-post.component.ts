import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatNativeDateModule } from '@angular/material/core';
import { UserCommentComponent } from '../user-comment/user-comment.component';
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
  constructor() {}
  @Input() postTitle?: string;
  @Input() postCreator?: string;
  @Input() postContent?: string;
  @Input() postDate?: string;
  @Input() postComments?: string;
  @Input() postReactions?: string;
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  ngOnInit() {}
}
