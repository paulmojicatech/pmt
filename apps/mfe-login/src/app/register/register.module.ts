import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PmtSimpleFormModule } from '@pmt/pmt-common-angular-components';
import { RegisterComponent } from './register.component';

const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: RegisterComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    PmtSimpleFormModule,
  ],
  declarations: [RegisterComponent],
})
export class RegisterModule {}
