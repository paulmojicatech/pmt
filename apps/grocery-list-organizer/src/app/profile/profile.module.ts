import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {
  ProfileEffects,
  profileReducer,
} from '@pmt/grocery-list-organizer-business-logic-profile';
import { PmtMobileToolbarModule } from '@pmt/pmt-mobile-toolbar';
import { PmtLoginModule } from '@pmt/pmt-login';
import { PmtSimpleFormModule } from '@pmt/pmt-simple-form';
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
    component: ProfileComponent,
    children: [],
  },
];

@NgModule({
  declarations: [ProfileComponent, LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('profile', profileReducer),
    EffectsModule.forFeature([ProfileEffects]),
    PmtLoginModule,
    ReactiveFormsModule,
    PmtSimpleFormModule,
    PmtMobileToolbarModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProfileModule {}
