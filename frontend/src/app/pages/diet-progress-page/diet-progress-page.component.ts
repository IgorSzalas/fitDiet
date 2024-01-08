import { first, pipe } from 'rxjs';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { NgChartsModule } from 'ng2-charts';
import { MatDialog } from '@angular/material/dialog';
import { AddNewMeasurmentComponent } from '../../components/add-new-measurment/add-new-measurment.component';
//import { ChartsModule } from 'ng2-charts/ng2-charts';
@Component({
  standalone: true,
  imports: [NgChartsModule, MatButtonModule, MatDividerModule, MatIconModule],
  selector: 'app-diet-progress-page',
  templateUrl: 'diet-progress-page.component.html',
  styleUrls: ['diet-progress-page.component.scss'],
})
export class DietProgressPageComponent implements OnInit {
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
  public barChartLabels: string[] = [
    '2006',
    '2007',
    '2008',
    '2009',
    '2010',
    '2011',
    '2012',
  ];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
  ];

  tableWeightData: any = [{ data: [], label: 'Waga' }];

  tableBMIData: any = [{ data: [], label: 'BMI' }];

  tablesLabels: any = [];

  userProgres: any;

  addNewMeasurement() {
    const addNewMeasurementDialog = this.dialog.open(
      AddNewMeasurmentComponent,
      {
        // data: { dayData },
        width: '400px',
      }
    );
    addNewMeasurementDialog.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  fetchUser(): any {
    // const authorizationToken = sessionStorage.getItem('authorizationToken');
    const token = JSON.parse(localStorage.getItem('token')!);
    console.log(token.UserID);
    this.userService
      .getUserDietProgresData(token.UserID)
      .pipe(first())
      .subscribe((userProgres: any) => {
        this.userProgres = userProgres;
        console.log(this.userProgres);
        this.userProgres.map((element: any) => {
          this.tablesLabels.push(element.date);
          console.log(element);
        });

        this.userProgres.map((element: any) => {
          this.tableWeightData[0].data.push(element.weight);
          console.log(element);
        });

        this.userProgres.map((element: any) => {
          this.tableBMIData[0].data.push(element.bmi);
          console.log(element);
        });

        console.log('this.tablesLabels ', this.tablesLabels);
        console.log('this.tableBMIData ', this.tableBMIData);
        console.log('this.tableWeightData ', this.tableWeightData);
      });
  }
  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
