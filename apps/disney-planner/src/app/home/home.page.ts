import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ScheduleComponent } from './components/schedule/schedule.component';

@Component({
  selector: 'disney-home',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      
    </ion-content>
  `,
  standalone: true,
  imports: [IonicModule, ScheduleComponent],
  styles: ``
})
export class HomePage {
  
}
