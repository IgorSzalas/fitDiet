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
import { WaterProgressPageComponent } from './pages/water-progress-page/water-progress-page.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { authorizationGuard } from './services/authorization.service';

export const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    canActivate: [authorizationGuard],
  },
  {
    path: 'moje-preferencje',
    component: PreferencesPageComponent,
    canActivate: [authorizationGuard],
  },
  {
    path: 'progres-diety',
    component: DietProgressPageComponent,
    canActivate: [authorizationGuard],
  },
  {
    path: 'panel-spolecznosciowy',
    component: SocialPanelPageComponent,
    canActivate: [authorizationGuard],
  },
  {
    path: 'moj-profil',
    component: MyProfileComponent,
    canActivate: [authorizationGuard],
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
    path: 'planowane-posilki',
    component: PlannedDishesPageComponent,
    canActivate: [authorizationGuard],
  },
  {
    path: 'zarzadzaj-uzytkownikami',
    component: ManageUsersPageComponent,
    canActivate: [authorizationGuard],
  },
  {
    path: 'wypijana-woda',
    component: WaterProgressPageComponent,
    canActivate: [authorizationGuard],
  },
];
