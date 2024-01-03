import { AuthorizationService } from '../../services/authorization.service';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterModule } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';


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
    private readonly toastService: HotToastService
  ) {}

  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });

  ngOnInit() {}

  login() {
    sessionStorage.removeItem('authorizationToken');
    sessionStorage.removeItem('userRole');
    if (
      this.loginForm.controls.email.value !== ' ' &&
      this.loginForm.controls.password.value !== ' '
    ) {
      this.authorizationService
        .login(
          this.loginForm.controls.email.value,
          this.loginForm.controls.password.value
        )
        .subscribe({
          next: (token: accessToken) => {
            sessionStorage.setItem('authorizationToken', token.accessToken);
            console.log(sessionStorage.getItem('authorizationToken'));
            this.toastService.success('Logowanie udane!', {
              autoClose: true,
              dismissible: true,
            }),
              this.router.navigateByUrl('/');
          },
          error: (error: string) =>
            this.toastService.error('Logowanie nieudane!', {
              autoClose: true,
              dismissible: true,
            }),
        });
      console.log(
        this.loginForm.controls.email.value,
        this.loginForm.controls.password.value
      );
    } else {
      this.toastService.warning(
        'Przed zalogowaniem sprawdź poprawność danych!',
        {
          autoClose: true,
          dismissible: true,
        }
      );
    }
  }

  onSubmit() {
    this.login();
  }
}
