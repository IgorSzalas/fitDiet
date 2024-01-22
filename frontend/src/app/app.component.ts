import { UserService } from './services/user.service';
import {
  AuthorizationService,
  userData,
} from './services/authorization.service';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
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
    MatProgressSpinnerModule,
  ],
  changeDetection: ChangeDetectionStrategy.Default,
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
  userType: any;
  loading: boolean | undefined;
  token: any;
  userRole: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private overlay: OverlayContainer,
    private authorizationService: AuthorizationService,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.actualUrl = event.urlAfterRedirects;
        console.log('url is', this.actualUrl);
        this.opened = false;
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
    this.cdr.detectChanges();
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

  public _reload = true;

  private reload() {
    setTimeout(() => (this._reload = false));
    setTimeout(() => (this._reload = true));
  }

  ngOnInit(): void {
    this.fetchUserData();
    console.log('ON INIT TEST');
    // localStorage.setItem('visualMode', 'light');
    this.authorizationService.authenticatedState.subscribe((value) => {
      console.log(value);
      try {
        this.parseJWT(value?.accessToken!);
      } catch (e) {
        console.error(e);
      }
    });

    this.isAdministratorCheck();
  }

  parseJWT(token: string) {
    console.log(token);
    if (token) {
      const claims: any = jose.decodeJwt(token);
      this.userRole = claims['Role'];
      // this.userRole = JSON.parse(this.userRole);
      console.log(this.userRole);
      //this.userRole = this.userRole.userTypeName;
      localStorage.setItem('token', JSON.stringify(claims));
    } else {
      throw new Error("Token hasn't been decoded");
    }
  }

  public isAdministratorCheck() {
    if (this.userData.userType === 'ADMIN') {
      this.isAdministrator = true;
      console.log('this.isAdministrator ', this.isAdministrator);
    } else {
      this.isAdministrator = false;

      console.log('this.isAdministrator ', this.isAdministrator);
      console.log(this.userRole);
    }
  }

  fetchUserData() {
    const token = JSON.parse(localStorage.getItem('token')!);
    console.log(token.UserID);
    return this.userService
      .getUserDataByID(token.UserID)
      .pipe(first())
      .subscribe((userData: any) => {
        this.userData = userData;
        console.log('userData: ', userData);
        this.userType = this.userData.userType;
        this.loading = false;
      });
  }

  get menuPaths() {
    let paths: any[] = [
      {
        name: 'Strona Główna',
        path: '',
      },
      {
        name: 'Planowane posiłki',
        path: 'planowane-posilki',
      },
      {
        name: 'Moje preferencje',
        path: 'moje-preferencje',
      },
      {
        name: 'Kontrola postępu diety',
        path: 'progres-diety',
      },
      {
        name: 'Kontrola wypijanej wody',
        path: 'wypijana-woda',
      },
      {
        name: 'Panel społecznościowy',
        path: 'panel-spolecznosciowy',
      },
    ];

    if (this.userRole === 'ADMIN') {
      paths.push({
        name: 'Zarządzaj użytkownikami',
        path: 'zarzadzaj-uzytkownikami',
      });
    }

    return paths;
  }
}
