import { Component, Input } from '@angular/core';

@Component({
  selector: 'pmt-mobile-toolbar',
  templateUrl: './pmt-mobile-toolbar.component.html',
  styleUrls: ['./pmt-mobile-toolbar.component.scss'],
})
export class PmtMobileToolbarComponent {
  @Input()
  title = '';
  @Input()
  hasBack = false;
  @Input()
  defaultHref = '';
}
