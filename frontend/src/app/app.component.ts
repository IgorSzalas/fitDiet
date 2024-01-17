import { UserService } from './services/user.service';
import {
  AuthorizationService,
  userData,
} from './services/authorization.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DatePipe } from '@angular/common';
import * as jose from 'jose';
import { first, timer } from 'rxjs';
import { OverlayContainer } from '@angular/cdk/overlay';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonToggleModule,
    MatCardModule,
    MatMenuModule,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  opened: boolean = false;
  currentRoute: string | undefined;
  actualUrl?: string;
  date?: Date;
  isNavbarVisible: boolean = false;
  waterDaily: any = [];
  dailyWaterDemand = 2000;
  dailyStartWaterDemand = 0;
  visualmode: any;
  userData: any;
  isAdministrator: boolean | undefined;
  userRole: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private overlay: OverlayContainer,
    private authorizationService: AuthorizationService,
    private userService: UserService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.actualUrl = event.urlAfterRedirects;
        console.log('url is', this.actualUrl);
        if (
          this.actualUrl?.includes('zarejestruj-sie') ||
          this.actualUrl?.includes('zaloguj-sie')
        ) {
          this.isNavbarVisible = false;
        } else {
          this.isNavbarVisible = true;
        }
      }
    });

    this.visualmode = localStorage.getItem('visualMode');

    if (localStorage.getItem('visualMode')) {
      this.visualmode = localStorage.getItem('visualMode');
      if (this.visualmode === 'light') {
        this.visualmode = localStorage.setItem('visualMode', 'light');
        document
          .getElementsByTagName('body')[0]
          .classList.toggle('darkMode', false);
        this.visualmode = 'light';
      } else if (this.visualmode === 'dark') {
        this.visualmode = localStorage.setItem('visualMode', 'dark');
        document
          .getElementsByTagName('body')[0]
          .classList.toggle('darkMode', true);
        this.visualmode = 'dark';
      }
    } else if (!localStorage.getItem('visualMode')) {
      localStorage.setItem('visualMode', 'light');
    }
  }

  logout() {
    this.authorizationService.logout();
    this.router.navigateByUrl('/zaloguj-sie');
    this.isAdministratorCheck();
    this.opened = true;
  }

  changeVisualMode() {
    this.visualmode = localStorage.getItem('visualMode');
    if (this.visualmode === 'light') {
      this.visualmode = localStorage.setItem('visualMode', 'dark');
      document
        .getElementsByTagName('body')[0]
        .classList.toggle('darkMode', true);
      this.visualmode = 'dark';
    } else if (this.visualmode === 'dark') {
      this.visualmode = localStorage.setItem('visualMode', 'light');
      document
        .getElementsByTagName('body')[0]
        .classList.toggle('darkMode', false);
      this.visualmode = 'light';
    }
    console.log(this.visualmode);
  }
  waterDailyCalculate() {
    this.dailyStartWaterDemand += 250;
    console.log(this.dailyStartWaterDemand);
  }

  ngOnInit(): void {
    timer(0, 1000).subscribe((date) => {
      this.date = new Date();
    });
    console.log(this.parseJWT(sessionStorage.getItem('authorizationToken')!));
    this.isAdministratorCheck();
  }

  parseJWT(token: string) {
    if (token) {
      const claims: any = jose.decodeJwt(token);
      console.log(claims);
      console.log(claims['Role']);
      this.userRole = claims['Role'];
      this.userRole = JSON.parse(this.userRole[0]);
      this.userRole = this.userRole.userTypeName;
      localStorage.setItem('token', JSON.stringify(claims));
    } else {
      throw new Error("Token hasn't been decoded");
    }
  }

  isAdministratorCheck() {
    if (this.userRole === 'ADMIN') {
      this.isAdministrator = true;
      console.log(this.isAdministrator);
    } else {
      this.isAdministrator = false;
      console.log(this.userRole);
    }
  }

  // isAdministrator(): void {
  //   let authorizationToken = this.parseJWT(
  //     sessionStorage.getItem('authorizationToken')!
  //   );
  //   console.log(authorizationToken);
  // }

  fetchUserData() {
    const token = JSON.parse(localStorage.getItem('token')!);
    console.log(token.UserID);
    return this.userService
      .getUserDataByID(token.UserID)
      .pipe(first())
      .subscribe((userData: any) => {
        this.userData = userData;
        console.log('userData: ', userData);
      });
  }
}
