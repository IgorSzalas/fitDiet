import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-delete-comment',
  templateUrl: './delete-comment.component.html',
  styleUrls: ['./delete-comment.component.css'],
})
export class DeleteCommentComponent implements OnInit {
  constructor(private postService: PostService) {}

  ngOnInit() {}

  deleteComment() {
    this.postService.deleteComment().subscribe((result: any) => {
      console.log(result);
    });
  }
}
