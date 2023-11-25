import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

@Component({
  selector: 'disney-tabs',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ],
  template: `
    <ion-tabs>

      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home">
          <ion-icon aria-hidden="true" name="home-outline"></ion-icon>
        </ion-tab-button>

        <ion-tab-button tab="map">
          <ion-icon aria-hidden="true" name="location-outline"></ion-icon>          
        </ion-tab-button>

        <ion-tab-button tab="search">
          <ion-icon aria-hidden="true" name="search-outline"></ion-icon>          
        </ion-tab-button>

        <ion-tab-button tab="account">
          <ion-icon aria-hidden="true" name="person-circle-outline"></ion-icon>
        </ion-tab-button>

      </ion-tab-bar>

    </ion-tabs>

  `,
  styles: ``
})
export class TabsPage {

  constructor() {}

}
