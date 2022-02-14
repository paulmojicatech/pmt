import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { Route, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PmtLoginModule } from '@pmt/pmt-common-angular-components';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Route[] = [
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
];

@NgModule({
  declarations: [ProfileComponent, LoginComponent],
  imports: [CommonModule, RouterModule.forChild(routes), PmtLoginModule],
})
export class ProfileModule {}
