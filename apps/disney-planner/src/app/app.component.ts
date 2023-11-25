import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';

@Component({
  selector: 'disney-root',
  standalone: true,
  imports: [CommonModule, IonicModule],
  template: `
    <ion-app>
      <ion-router-outlet></ion-router-outlet>
    </ion-app>
  `,
  styles: ``
})

export class AppComponent {}
