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
import * as jose from 'jose';
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
    console.log(this.parseJWT(sessionStorage.getItem('authorizationToken')!));
  }

  parseJWT(token: string) {
    if (token) {
      const claims = jose.decodeJwt(token);
      console.log(claims);
    } else {
      throw new Error("Token hasn't been decoded");
    }
  }

  isAdministrator(): void {
    this.parseJWT(sessionStorage.getItem('authorizationToken')!);
  }
}
