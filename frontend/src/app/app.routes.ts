import { Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { PreferencesPageComponent } from './pages/preferences-page/preferences-page.component';
import { DietProgressPageComponent } from './pages/diet-progress-page/diet-progress-page.component';
import { SocialPanelPageComponent } from './pages/social-panel-page/social-panel-page.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { PlannedDishesPageComponent } from './pages/planned-dishes-page/planned-dishes-page.component';
import { ManageUsersPageComponent } from './pages/manage-users-page/manage-users-page.component';

export const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
  },
  {
    path: 'rejestracja',
    component: RegisterPageComponent,
  },
  {
    path: 'moje-preferencje',
    component: PreferencesPageComponent,
  },
  {
    path: 'progres-diety',
    component: DietProgressPageComponent,
  },
  {
    path: 'panel-spolecznosciowy',
    component: SocialPanelPageComponent,
  },
  {
    path: 'moj-profil',
    component: MyProfileComponent,
  },
  {
    path: 'zaloguj-sie',
    component: LoginPageComponent,
  },
  {
    path: 'zarejestruj-sie',
    component: RegisterPageComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'planowane-posilki',
    component: PlannedDishesPageComponent,
  },
  {
    path: 'zarzadzaj-uzytkownikami',
    component: ManageUsersPageComponent,
  },
];
