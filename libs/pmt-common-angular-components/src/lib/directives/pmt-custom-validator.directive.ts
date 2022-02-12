/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Directive,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { fromEvent, merge, Subject, takeUntil, tap } from 'rxjs';

@Directive({
  selector: '[pmtCustomValidator]',
})
export class PmtCustomValidatorDirective
  implements OnInit, OnDestroy, ControlValueAccessor
{
  @Output()
  emitChangeEv = new EventEmitter<string>();
  @Output()
  emitTouchEv = new EventEmitter<void>();

  private _directiveDestroyed$ = new Subject<void>();

  constructor(private _elementRef: ElementRef) {}

  onChange = (value: string) => {
    this.emitChangeEv.emit(value);
  };

  onTouch = () => {
    this.emitTouchEv.emit();
  };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(obj: any): void {
    this.onChange(obj);
  }

  ngOnInit(): void {
    const inputEl: HTMLInputElement = this._elementRef.nativeElement;
    const changeEv$ = fromEvent(inputEl, 'keyup').pipe(
      tap(() => {
        this.writeValue(inputEl.value);
      })
    );
    const touched$ = fromEvent(inputEl, 'focus').pipe(
      tap(() => {
        this.onTouch();
      })
    );
    merge(changeEv$, touched$)
      .pipe(takeUntil(this._directiveDestroyed$))
      .subscribe();
  }

  ngOnDestroy(): void {
    this._directiveDestroyed$.next();
  }
}
