import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'pmt-compare-players',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './compare-players.component.html',
  styleUrls: ['./compare-players.component.scss'],
})
export class ComparePlayersComponent {
  constructor(private _router: Router) {}

  goBack(): void {
    this._router.navigate(['fantasy-football']);
  }

}
