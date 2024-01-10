import { EditUserComponent } from './../edit-user/edit-user.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from './../../services/user.service';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { first } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
  ],
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent implements OnInit, AfterViewInit {
  ngOnInit() {
    this.fetchUsers();
  }

  displayedColumns: string[] = [
    'ID',
    'firstName',
    'surname',
    'email',
    'userType',
    'edit',
    'delete',
  ];
  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private userService: UserService,
    private readonly dialog: MatDialog
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchUsers(): any {
    console.log('fetchUsers');
    this.userService
      .getAllUsers()
      .pipe(first())
      .subscribe((users: any) => {
        this.dataSource = users;
        console.log(users);
        this.dataSource = new MatTableDataSource(users);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openEditUserDialog(userID: string) {
    const editUserDialog = this.dialog.open(EditUserComponent, {
      data: { userID },
      width: '600px',
    });
    editUserDialog.afterClosed().subscribe((result) => {
      console.log(result);
      this.fetchUsers();
    });
  }

  openDeleteUserDialog(userID: string) {
    const deleteUserDialog = this.dialog.open(DeleteUserComponent, {
      data: { userID },
      width: '600px',
    });
    deleteUserDialog.afterClosed().subscribe((result) => {
      console.log(result);
      this.fetchUsers();
    });
  }
}
