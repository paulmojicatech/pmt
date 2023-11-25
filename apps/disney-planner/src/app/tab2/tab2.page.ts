import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {ExploreContainerComponent} from '../explore-container/explore-container.component';

@Component({
  selector: 'disney-tab2',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponent,
  ],
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-title>
          Tab 2
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 2</ion-title>
        </ion-toolbar>
      </ion-header>

      <disney-explore-container name="Tab 2 page"></disney-explore-container>
    </ion-content>

  `,
  styles: ``
})
export class Tab2Page {

  constructor() {}

}
