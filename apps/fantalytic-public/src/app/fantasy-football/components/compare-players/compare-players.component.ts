import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pmt-compare-players',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './compare-players.component.html',
  styleUrls: ['./compare-players.component.scss'],
})
export class ComparePlayersComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
