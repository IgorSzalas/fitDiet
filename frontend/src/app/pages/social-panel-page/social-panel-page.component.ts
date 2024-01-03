import { Component, OnInit } from '@angular/core';
import { UserPostComponent } from '../../components/user-post/user-post.component';

@Component({
  standalone:true,
  imports:[UserPostComponent],
  selector: 'app-social-panel-page',
  templateUrl: 'social-panel-page.component.html',
  styleUrls: ['social-panel-page.component.scss'],
})
export class SocialPanelPageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
