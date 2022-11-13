import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'pmt-header',
  standalone: true,
  imports: [CommonModule,IonicModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  exportAs: 'pmt-header'
})
export class HeaderComponent {
  activeModule$ = new BehaviorSubject<string>('Football');

  switchActiveModule(module: string): void {
    this.activeModule$.next(module);
  }
}
