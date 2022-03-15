import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, map, Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'pmt-autocomplete',
  templateUrl: './pmt-autocomplete.component.html',
  styleUrls: ['./pmt-autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PmtAutocompleteComponent implements OnInit, OnDestroy {
  @Input()
  label = '';
  @Input()
  allItems: string[] = [];

  @Output()
  valueChangedEv = new EventEmitter<string>();

  filteredList$!: Observable<string[]>;
  showOptionsContainer$!: Observable<boolean>;

  formControl = new FormControl();
  private _componentDestroyedSub$ = new Subject<void>();

  ngOnInit(): void {
    this.filteredList$ = this.formControl.valueChanges.pipe(
      map((ctlValue) => {
        return this.allItems.filter((item) =>
          item.toLowerCase().includes(ctlValue.toLowerCase())
        );
      })
    );
    this.formControl.valueChanges
      .pipe(debounceTime(250), takeUntil(this._componentDestroyedSub$))
      .subscribe((updatedValue) => {
        this.valueChangedEv.emit(updatedValue);
      });
  }

  ngOnDestroy(): void {
    this._componentDestroyedSub$.next();
  }
}
