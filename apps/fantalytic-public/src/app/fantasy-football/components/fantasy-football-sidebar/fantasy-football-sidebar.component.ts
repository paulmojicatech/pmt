import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'pmt-fantasy-football-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fantasy-football-sidebar.component.html',
  styleUrls: ['./fantasy-football-sidebar.component.scss'],
  exportAs: 'pmt-fantasy-football-sidebar'
})
export class FantasyFootballSidebarComponent {
  
}
