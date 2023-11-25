import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'disney-schedule',
  standalone: true,
  imports: [IonicModule],
  template: `
    <ion-card>
      <ion-card-header>
        <ion-card-title>{{title}}</ion-card-title>
        @if (subtitle) {
          <ion-card-subtitle>{{subtitle}}</ion-card-subtitle>
        }        
      </ion-card-header>
      <ion-card-content>
        {{content}}
      </ion-card-content>
    </ion-card>
  `,
  styles: ``,
})
export class ScheduleComponent {
  @Input({required: true})
  title!: string;

  @Input({required: true})
  content!: string;
  
  @Input()
  subtitle?: string;
}
