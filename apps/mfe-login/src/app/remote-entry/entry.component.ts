import { Component } from '@angular/core';

@Component({
  selector: 'pmt-mfe-login-entry',
  template: `<div class="remote-entry">
    <h2>mfe-login's Remote Entry Component</h2>
  </div>`,
  styles: [
    `
      .remote-entry {
        background-color: #143055;
        color: white;
        padding: 5px;
      }
    `,
  ],
})
export class RemoteEntryComponent {}
