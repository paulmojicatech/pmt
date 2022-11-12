import { CommonModule } from '@angular/common';
import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'pmt-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [CommonModule, HeaderComponent, IonicModule]
})
export class TabsPage {

  environmentInjector = inject(EnvironmentInjector);

}
