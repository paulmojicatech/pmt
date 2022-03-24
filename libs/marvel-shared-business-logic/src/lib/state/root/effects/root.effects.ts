import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';

@Injectable()
export class RootEffects {
  constructor(private _actions$: Actions) {}
}
