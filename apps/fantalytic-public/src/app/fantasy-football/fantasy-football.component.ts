import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { RouterModule } from '@angular/router';
@Component({
  selector: 'pmt-fantasy-football',
  standalone: true,
  imports: [
   RouterModule,
   MatButtonModule
  ],
  templateUrl: './fantasy-football.component.html',
  styleUrls: ['./fantasy-football.component.scss']
})

export class FantasyFootballComponent {

  

}
