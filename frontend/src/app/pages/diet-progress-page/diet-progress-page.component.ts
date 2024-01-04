import { first, pipe } from 'rxjs';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { NgChartsModule } from 'ng2-charts';
//import { ChartsModule } from 'ng2-charts/ng2-charts';
@Component({
  standalone: true,
  imports: [NgChartsModule, MatButtonModule, MatDividerModule, MatIconModule],
  selector: 'app-diet-progress-page',
  templateUrl: 'diet-progress-page.component.html',
  styleUrls: ['diet-progress-page.component.scss'],
})
export class DietProgressPageComponent implements OnInit {
  constructor(private readonly userService: UserService) {}

  ngOnInit() {
    this.fetchUser();
    console.log('onInit');
  }

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
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

  tablesLabels: any = [];

  userProgres: any;

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
          this.tablesLabels.push(element);
          console.log(element);
        });
        console.log(this.tablesLabels);
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
