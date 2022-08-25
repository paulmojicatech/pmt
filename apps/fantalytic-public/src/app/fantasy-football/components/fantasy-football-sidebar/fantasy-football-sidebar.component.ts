import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'pmt-fantasy-football-sidebar',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './fantasy-football-sidebar.component.html',
  styleUrls: ['./fantasy-football-sidebar.component.scss'],
  exportAs: 'pmt-fantasy-football-sidebar'
})
export class FantasyFootballSidebarComponent {

  @Output()
  sideBarEvent = new EventEmitter<string>();

  readonly SIDEBAR_ITEM_MAP = [
    {
      path: 'compare',
      label: 'Compare Players'
    },
    {
      path: 'matchups',
      label: 'Match Ups'
    }
  ]
}
