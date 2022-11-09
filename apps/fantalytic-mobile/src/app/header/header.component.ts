import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'pmt-header',
  standalone: true,
  imports: [CommonModule,IonicModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  exportAs: 'pmt-header'
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
