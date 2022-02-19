import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { Route, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PmtLoginModule } from '@pmt/pmt-common-angular-components';
import { IonicModule } from '@ionic/angular';
import { ProfileLandingComponent } from './profile-landing.component';
import { RegisterComponent } from './register/register.component';

const routes: Route[] = [
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
  },
  {
    path: 'register',
    pathMatch: 'full',
    component: RegisterComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
];

@NgModule({
  declarations: [ProfileComponent, LoginComponent, ProfileLandingComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    PmtLoginModule,
  ],
})
export class ProfileModule {}
