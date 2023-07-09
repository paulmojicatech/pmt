import { Component } from '@angular/core';
import { ToolbarComponent } from '../shared/components/toolbar/toolbar.component';

@Component({
  standalone: true,
  imports: [ToolbarComponent],
  template: `
    <pmt-toolbar></pmt-toolbar>
    <main>
      Test Page
    </main>
  `
})
export default class FantasyFootballPageComponent {

}