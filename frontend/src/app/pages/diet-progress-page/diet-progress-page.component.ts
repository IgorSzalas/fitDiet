import { userData } from './../../services/authorization.service';
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

  public barChartOptions: any = {
    scaleShowVerticalLines: true,
    responsive: true,
  };

  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  tableWeightData: any = [{ data: [], label: 'Waga' }];

  tableBMIData: any = [{ data: [], label: 'BMI' }];

  tablesLabels: any = [];

  userProgres: any;

  userData: any;

  ngOnInit() {
    this.fetchUserProgresData();
    console.log('onInit');
    this.userProgres = this.userProgres;
  }

  addNewMeasurement() {
    const addNewMeasurementDialog = this.dialog.open(
      AddNewMeasurmentComponent,
      {
        data: this.userData,
        width: '400px',
      }
    );
    addNewMeasurementDialog.afterClosed().subscribe((result) => {
      console.log(result, 'KONIEC');
      this.fetchUserProgresData();
    });
  }

  fetchUserProgresData(): any {
    const token = JSON.parse(localStorage.getItem('token')!);
    console.log(token.UserID);
    this.userService
      .getUserDietProgresData(token.UserID)
      .pipe(first())
      .subscribe((userProgres: any) => {
        this.userProgres = userProgres
          .sort(
            (
              a: { date: string | number | Date },
              b: { date: string | number | Date }
            ) => {
              const dateA = new Date(a.date);
              const dateB = new Date(b.date);

              return dateA.getTime() - dateB.getTime();
            }
          )
          .slice(-10);
        console.log('this.userProgres ', this.userProgres);
        console.log(this.userProgres);
        this.tablesLabels = this.userProgres.map((element: any) => {
          // this.tablesLabels.push(element.date);
          console.log(element);
          return element.date;
        });

        this.tableWeightData[0].data = this.userProgres.map((element: any) => {
          // this.tableWeightData[0].data
          console.log(element);
          return element.weight;
        });

        this.tableBMIData[0].data = this.userProgres.map((element: any) => {
          // this.tableBMIData[0].data

          console.log(element);
          return element.bmi;
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
