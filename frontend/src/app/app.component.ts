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
import { timer } from 'rxjs';
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
  constructor(private router: Router, private route: ActivatedRoute) {
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
  }
  ngOnInit(): void {
    timer(0, 1000).subscribe((date) => {
      this.date = new Date();
    });
    console.log(this.parseJWT(sessionStorage.getItem('authorizationToken')!));
  }

  parseJWT(token: string) {
    if (token) {
      const claims = jose.decodeJwt(token);
      console.log(claims);
      localStorage.setItem('token', JSON.stringify(claims));
    } else {
      throw new Error("Token hasn't been decoded");
    }
  }

  isAdministrator(): void {
    this.parseJWT(sessionStorage.getItem('authorizationToken')!);
  }
}
