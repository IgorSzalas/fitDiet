import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule],
  selector: 'app-user-comment',
  templateUrl: './user-comment.component.html',
  styleUrls: ['./user-comment.component.scss'],
})
export class UserCommentComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
