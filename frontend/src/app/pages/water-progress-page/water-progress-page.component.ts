import { AddNewWaterMeasurementComponent } from './../../components/add-new-water-measurement/add-new-water-measurement.component';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { first } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { MatDialog } from '@angular/material/dialog';

@Component({
  standalone: true,
  imports: [NgChartsModule, MatButtonModule, MatDividerModule, MatIconModule],
  selector: 'app-water-progress-page',
  templateUrl: './water-progress-page.component.html',
  styleUrls: ['./water-progress-page.component.scss'],
})
export class WaterProgressPageComponent implements OnInit {
  @ViewChild(BaseChartDirective)
  public chart!: BaseChartDirective;
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

  tableWaterData: any = [
    { data: [], label: 'Ilość wypitej wody (w mililitrach)' },
  ];

  tableWaterLabels: any = [];

  tablesLabels: any = [];

  userWaterProgres: any = [];

  ngOnInit() {
    this.fetchUser();
    console.log('onInit');
  }

  openAddNewWaterMeasurementDialog() {
    const addNewWaterMeasurementDialog = this.dialog.open(
      AddNewWaterMeasurementComponent,
      {
        width: '400px',
      }
    );
    addNewWaterMeasurementDialog.afterClosed().subscribe((result) => {
      console.log(result);
      this.fetchUser();
    });
  }

  fetchUser(): any {
    const token = JSON.parse(localStorage.getItem('token')!);
    console.log(token.UserID);
    this.userService
      .getUserWaterProgresData(token.UserID)
      .pipe(first())
      .subscribe((userData: any) => {
        this.userWaterProgres = userData
          .sort((a: { date: string | number | Date }, b: { date: string | number | Date }) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);

            return dateA.getTime() - dateB.getTime();
          })
          .slice(-10);
        console.log('this.userWaterProgres ', this.userWaterProgres);

        this.tableWaterLabels = this.userWaterProgres.map((element: any) => {
          console.log(element);
          return element.waterMeasurmentDate;
        });

        this.tableWaterData[0].data = this.userWaterProgres.map(
          (element: any) => {
            console.log(element);
            return element.userWaterDrunk;
          }
        );

        // this.chart.chart?.update()

        console.log('this.tableWaterLabels ', this.tableWaterLabels);
        console.log('this.tableWaterData ', this.tableWaterData);
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
