/* eslint-disable arrow-body-style */
import { Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, EMPTY, map, shareReplay, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { getDefenses, getPosition, getQbs, getRbs, getReceivers } from '../ngrx/selectors/fantasy-football.selectors';
import { PositionTypes } from '../../../../../../libs/fantalytic-shared/src';
import { IonicModule } from '@ionic/angular';
import { FANTASY_FOOTBALL_STAT_HEADER_MAP } from '../const/fantasy-football.const';
import { setHasBackButton } from 'src/app/ngrx/actions/shared.actions';

@Component({
  selector: 'pmt-player-detail',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss'],
})
export class PlayerDetailComponent implements OnDestroy {

  private _route = inject(ActivatedRoute);
  private _store = inject(Store);
  currentPosition$ = this._store.select(getPosition).pipe(shareReplay(1));
  players$ = this.currentPosition$.pipe(
    switchMap(position => {
      switch(position) {
        case PositionTypes.QB: {
          return this._store.select(getQbs);
        }
        case PositionTypes.RB: {
          return this._store.select(getRbs);
        }
        case PositionTypes.WR: {
          return this._store.select(getReceivers);
        }
        case PositionTypes.DEF: {
          return this._store.select(getDefenses);
        }
        default:
          return EMPTY;
      }
    })
  );
  player$ = combineLatest([this.players$, this._route.params, this.currentPosition$]).pipe(
    map(([players, params, currentPosition]) => {
      const selectedPlayer = (players as any[]).find(player => player.id === params.id);
      // we only want to show a subset of stats
      const stats = Object.keys(selectedPlayer)
        .filter(key => !key.includes('id')
          && !key.includes('player')
          && !key.includes('team')
          && !key.includes('year')
          && !key.includes('week') && !key.includes('imageUrl'))
        .map(stat => {
          const header = FANTASY_FOOTBALL_STAT_HEADER_MAP[currentPosition][stat];
          return {key: stat, text: header};
        });
      return {
        ...selectedPlayer,
        stats
      };
    })
  );

  ngOnDestroy(): void {
    this._store.dispatch(setHasBackButton(false));
  }

}
