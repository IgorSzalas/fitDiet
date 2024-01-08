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
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent implements OnInit {
  constructor(
    private readonly dialog: MatDialog,
    private readonly userService: UserService
  ) {}

  ngOnInit() {
    this.fetchUser();
    console.log('onInit');
  }

  public barChartOptions: any = {
    scaleShowVerticalLines: true,
    responsive: true,
  };
  public barChartLegend: boolean = true;
  userProgres: any = [];

  tablesLabels: any = [];

  tableWaterData: any = [
    { data: [], label: 'Ilość wypitej wody (w mililitrach)' },
  ];

  public barChartType: string = 'bar';

  public barChartData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
  ];

  tableWeightData: any = [{ data: [], label: 'Waga' }];

  tableBMIData: any = [{ data: [], label: 'BMI' }];

  nextDish: string = 'kotlet';

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

        this.userProgres.map((element: any) => {
          this.tableWaterData[0].data.push(element.amountWaterConsumed);
          console.log(element);
        });

        console.log('this.tableWeightData ', this.tableWaterData);
      });
  }
}
