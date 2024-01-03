import { Component, OnInit } from '@angular/core';
import { UserTableComponent } from '../../components/user-table/user-table.component';

@Component({
  standalone: true,
  imports: [UserTableComponent],
  selector: 'app-manage-users-page',
  templateUrl: './manage-users-page.component.html',
  styleUrls: ['./manage-users-page.component.scss'],
})
export class ManageUsersPageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
