import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {ExploreContainerComponent} from '../explore-container/explore-container.component';

@Component({
  selector: 'disney-tab1',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponent
  ],
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-title>
          Tab 1
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 1</ion-title>
        </ion-toolbar>
      </ion-header>

      <disney-explore-container name="Tab 1 page"></disney-explore-container>
    </ion-content>
  `,
  styles: `

  `
})
export class Tab1Page {

  constructor() {}

}
