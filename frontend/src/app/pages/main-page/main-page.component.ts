import { DietProgressPageComponent } from './../diet-progress-page/diet-progress-page.component';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardWidgetComponent } from '../../components/card-widget/card-widget.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { first } from 'rxjs';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { NgChartsModule } from 'ng2-charts';
import { AppComponent } from '../../app.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    CommonModule,
    CardWidgetComponent,
    MatCardModule,
    MatButtonModule,
    NgChartsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly userService: UserService,
    private readonly app: AppComponent
  ) {}

  ngOnInit() {
    this.fetchUser();
    if (!localStorage.getItem('visualMode')) {
      localStorage.setItem('visualMode', 'light');
    }
    this.app.isAdministratorCheck();
    console.log('onInit');
  }

  public barChartOptions: any = {
    scaleShowVerticalLines: true,
    responsive: true,
  };
  public barChartLegend: boolean = true;
  userProgres: any = [];

  tablesLabels: any = [];

  openAddNewWaterMeasurementDialog() {
    throw new Error('Method not implemented.');
  }

  fetchUser(): any {
    // const authorizationToken = sessionStorage.getItem('authorizationToken');
    const token = JSON.parse(localStorage.getItem('token')!);
    console.log(token.UserID);
    this.userService
      .getUserDataByID(token.UserID)
      .pipe(first())
      .subscribe((userData: any) => {
        this.userProgres = userData;
        console.log(this.userProgres);
        this.userProgres.map((element: any) => {
          this.tablesLabels.push(element.date);
          console.log(element);
        });
      });
  }
}
