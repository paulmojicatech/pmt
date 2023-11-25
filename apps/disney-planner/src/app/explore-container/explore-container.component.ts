import { Component, Input } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

@Component({
  selector: 'disney-explore-container',
  standalone: true,
  imports: [ CommonModule, FormsModule, IonicModule ],
  template: `
    <div id="container">
      <strong>{{ name }}</strong>
      <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
    </div>
  `,
  styles: `
    #container {
      text-align: center;

      position: absolute;
      left: 0;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }

    #container strong {
      font-size: 20px;
      line-height: 26px;
    }

    #container p {
      font-size: 16px;
      line-height: 22px;

      color: #8c8c8c;

      margin: 0;
    }

    #container a {
      text-decoration: none;
    }
  `
})
export class ExploreContainerComponent {

  @Input() name?: string;

}
