import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'pmt-fantasy-football',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './fantasy-football.component.html',
  styleUrls: ['./fantasy-football.component.scss'],
})
export class FantasyFootballComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
