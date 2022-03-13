import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'pmt-autocomplete',
  templateUrl: './pmt-autocomplete.component.html',
  styleUrls: ['./pmt-autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PmtAutocompleteComponent {
  @Input()
  label = '';
}
