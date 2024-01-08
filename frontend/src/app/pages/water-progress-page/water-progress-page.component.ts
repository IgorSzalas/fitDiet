import { AddNewWaterMeasurementComponent } from './../../components/add-new-water-measurement/add-new-water-measurement.component';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { first } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { NgChartsModule } from 'ng2-charts';
import { MatDialog } from '@angular/material/dialog';

@Component({
  standalone: true,
  imports: [NgChartsModule, MatButtonModule, MatDividerModule, MatIconModule],
  selector: 'app-water-progress-page',
  templateUrl: './water-progress-page.component.html',
  styleUrls: ['./water-progress-page.component.scss'],
})
export class WaterProgressPageComponent implements OnInit {
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

  tableWaterData: any = [
    { data: [], label: 'Ilość wypitej wody (w mililitrach)' },
  ];

  tableBMIData: any = [{ data: [], label: 'BMI' }];

  tablesLabels: any = [];

  userProgres: any = [];

  openAddNewWaterMeasurementDialog() {
    const addNewWaterMeasurementDialog = this.dialog.open(
      AddNewWaterMeasurementComponent,
      {
        width: '400px',
      }
    );
    addNewWaterMeasurementDialog.afterClosed().subscribe((result) => {
      console.log(result);
    });
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

        console.log('this.tablesLabels ', this.tablesLabels);
        console.log('this.tableBMIData ', this.tableBMIData);
        console.log('this.tableWeightData ', this.tableWaterData);
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
