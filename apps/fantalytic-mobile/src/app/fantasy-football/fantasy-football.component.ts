import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonicModule } from '@ionic/angular';

@Component({
  selector: 'pmt-fantasy-football',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './fantasy-football.component.html',
  styleUrls: ['./fantasy-football.component.scss'],
})
export class FantasyFootballComponent {

  // eslint-disable-next-line @typescript-eslint/naming-convention
  readonly AVAILABLE_YEARS = [2018,2019,2020,2021,2022];



}
