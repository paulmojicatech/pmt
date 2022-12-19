import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { setHasBackButton } from '../ngrx/actions/shared.actions';
import { selectHasBackButton } from '../ngrx/selectors/shared.selectors';

@Component({
  selector: 'pmt-header',
  standalone: true,
  imports: [CommonModule,IonicModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  exportAs: 'pmt-header'
})
export class HeaderComponent {

  _store = inject(Store);
  _controller = inject(NavController);

  activeModule$ = new BehaviorSubject<string>('Football');
  hasBackButton$ = this._store.select(selectHasBackButton);

  switchActiveModule(module: string): void {
    this.activeModule$.next(module);
  }

  goBack(): void {
    this._controller.back();
    this._store.dispatch(setHasBackButton(false));
  }
}
