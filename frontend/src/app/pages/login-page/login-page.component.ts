import { pipe, first } from 'rxjs';
import { AuthorizationService } from '../../services/authorization.service';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterModule } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import * as jose from 'jose';
import { AppComponent } from '../../app.component';

interface accessToken {
  accessToken: string;
  tokenType: string;
}
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class LoginPageComponent implements OnInit {
  constructor(
    private readonly authorizationService: AuthorizationService,
    private readonly router: Router,
    private readonly toastService: HotToastService,
    private readonly form: FormBuilder,
    private readonly app: AppComponent
  ) {}

  loginForm = this.form.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  ngOnInit() {}

  onSubmit() {
    this.login();
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

  login() {
    if (
      this.loginForm.controls['email'].value !== ' ' &&
      this.loginForm.controls['password'].value !== ' '
    ) {
      this.authorizationService
        .loginToSession(
          this.loginForm.controls['email'].value!,
          this.loginForm.controls['password'].value!
        )
        .subscribe({
          next: (token: accessToken) => {
            this.parseJWT(token.accessToken);
            sessionStorage.setItem('authorizationToken', token.accessToken);
            console.log(sessionStorage.getItem('authorizationToken'));
            this.router.navigateByUrl('/');
            this.toastService.success('Logowanie udane!', {
              autoClose: true,
              dismissible: true,
            });
          },
          error: (error: any) => {
            console.log(error);
            this.toastService.warning(
              'Przed zalogowaniem sprawdź poprawność danych!',
              {
                autoClose: true,
                dismissible: true,
              }
            );
          },
        });
    } else {
      this.toastService.warning('Nieznany błąd logowania!', {
        autoClose: true,
        dismissible: true,
      });
    }
  }
}
