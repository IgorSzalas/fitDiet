import { Component, OnInit } from '@angular/core';
import { UserPostComponent } from '../../components/user-post/user-post.component';
import { PostService } from '../../services/post.service';
import { first } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  standalone: true,
  imports: [
    UserPostComponent,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  selector: 'app-social-panel-page',
  templateUrl: 'social-panel-page.component.html',
  styleUrls: ['social-panel-page.component.scss'],
})
export class SocialPanelPageComponent implements OnInit {
  constructor(private readonly postService: PostService) {}

  ngOnInit() {
    this.fetchAllPosts();
  }

  posts: any;

  fetchAllPosts(): any {
    return this.postService
      .getAllPosts()
      .pipe(first())
      .subscribe((posts: any) => {
        this.posts = posts;
        console.log(this.posts);
      });
  }
}
