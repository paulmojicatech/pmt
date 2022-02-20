import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import {
  PmtLoginModule,
  PmtMobileToolbarModule,
  PmtSimpleFormModule,
} from '@pmt/pmt-common-angular-components';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile.component';
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
  declarations: [ProfileComponent, LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PmtLoginModule,
    ReactiveFormsModule,
    PmtSimpleFormModule,
    PmtMobileToolbarModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProfileModule {}
