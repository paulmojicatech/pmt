/* eslint-disable quote-props */
/* eslint-disable max-len */
import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, filter, map, Observable, Subject, take, takeUntil } from 'rxjs';
import { PositionTypes } from '../../../../../libs/fantalytic-shared/src';
import { loadDefenses, loadQbs, loadRbs, loadReceivers, setPositionType, updateYearFilter } from './ngrx/actions/fantasy-football.actions';
import { getDefenses, getPosition, getQbs, getRbs, getReceivers, getSelectedYear } from './ngrx/selectors/fantasy-football.selectors';

@Component({
  selector: 'pmt-fantasy-football',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './fantasy-football.component.html',
  styleUrls: ['./fantasy-football.component.scss'],
})
export class FantasyFootballComponent implements OnInit, OnDestroy {


  readonly AVAILABLE_YEARS = [2018,2019,2020,2021,2022];

  positionsMapSub$ = new BehaviorSubject<{label: string; ctx: {positionData: {stats: any[]}}; value: string; availableStats: {[key: string]: string}}[]>([
    {
      label: 'QBs',
      ctx: {
        positionData: {
          stats: []
        },
      },
      value: 'qb',
      availableStats: {
        'Passing Yds': 'passingYds',
        'Passing TDs': 'tds',
        'Interceptions': 'ints',
        'Passing Yds Per Attempt': 'passingYdsPerAttempt'
      }
    },
    {
      label: 'RBs',
      ctx: {
        positionData: {
          stats: []
        },
      },
      value: 'rb',
      availableStats: {
        'Rushing Yds': 'rushingYds',
        'Rushing Attempts': 'rushAttempts',
        'Rushing TDs': 'rushingTds',
        '20+ Runs': 'rushing20Yds'
      }
    },
    {
      label: 'Receivers',
      ctx: {
        positionData: {
          stats: []
        }
      },
      value: 'rec',
      availableStats: {
        'Receiving Yds': 'receivingYds',
        'Receptions': 'receptions',
        'Receiving TDs': 'receivingTds',
        'Targets': 'receivingTargets',
        '20+ Catches': 'receiving20Plus',
        '40+ Catches': 'receiving40Plus'
      }
    },
    {
      label: 'Defenses',
      ctx: {
        positionData: {
          stats: []
        },
      },
      value: 'def',
      availableStats: {
        'Rushing Yds Allowed': 'rushYdsAllowed',
        'Rushing TDs Allowed': 'rushTdsAllowed',
        'Completion Pct Allowed': 'completionPctAllowed',
        'Passing Yds Allowed': 'passYdsAllowed',
        'Interceptions': 'ints',
        'Sacks': 'sacks'
      }
    },
  ]);

  availableStatsSub$ = new BehaviorSubject<string[]>(['Passing Yds', 'Passing TDs', 'Interceptions', 'Passing Yds Per Attempt']);
  currentStatHeaderSub$ = new BehaviorSubject<string>('Passing Yds');
  private _store = inject(Store);
  private _router = inject(Router);

  selectedYear$ = this._store.select(getSelectedYear);
  private _currentPosition$ = this._store.select(getPosition);
  qbs$ = this._store.select(getQbs).pipe(filter(qbs => !!qbs));
  rbs$ = this._store.select(getRbs).pipe(filter(rbs => !!rbs));
  recs$ = this._store.select(getReceivers).pipe(filter(recs => !!recs));
  def$ = this._store.select(getDefenses).pipe(filter(defs => !!defs));

  private _onDestroySub$ = new Subject<void>();

  ngOnInit(): void {
    this._store.dispatch(loadQbs());
    this._store.dispatch(loadRbs());
    this._store.dispatch(loadReceivers());
    this._store.dispatch(loadDefenses());
    combineLatest([this.selectedYear$, this.qbs$, this.rbs$, this.recs$, this.def$, this._currentPosition$, this.currentStatHeaderSub$]).pipe(
      takeUntil(this._onDestroySub$)
    ).subscribe(([year, qbs, rbs, recs, defs, position, currentStatHeader]) => {
      switch (position) {
        case PositionTypes.QB: {
          const updatedState = this.getUpdatedPositionStats(qbs, year, currentStatHeader, 0);
          this.positionsMapSub$.next(updatedState);
          break;
        }
        case PositionTypes.RB: {
          const updatedState = this.getUpdatedPositionStats(rbs, year, currentStatHeader, 1);
          this.positionsMapSub$.next(updatedState);
          break;
        }
        case PositionTypes.WR: {
          const updatedState = this.getUpdatedPositionStats(recs, year, currentStatHeader, 2);
          this.positionsMapSub$.next(updatedState);
          break;
        }
        case PositionTypes.DEF: {
          const updatedState = this.getUpdatedPositionStats(defs, year, currentStatHeader, 3);
          this.positionsMapSub$.next(updatedState);
          break;
        }
        default:
          break;
      }
    });
  }

  ngOnDestroy(): void {
    this._onDestroySub$.next();
  }

  handleAccordionStateChange(ev: any): void {
    switch (ev.detail.value) {
      case 'qb': {
        this._store.dispatch(setPositionType(PositionTypes.QB));
        const updatedStats = Object.keys(this.positionsMapSub$.getValue()[0].availableStats);
        this.availableStatsSub$.next(updatedStats);
        this.currentStatHeaderSub$.next('Passing Yds');
        break;
      }
      case 'rb': {
        this._store.dispatch(setPositionType(PositionTypes.RB));
        const updatedStats = Object.keys(this.positionsMapSub$.getValue()[1].availableStats);
        this.availableStatsSub$.next(updatedStats);
        this.currentStatHeaderSub$.next('Rushing Yds');
        break;
      }
      case 'rec': {
        this._store.dispatch(setPositionType(PositionTypes.WR));
        const updatedStats = Object.keys(this.positionsMapSub$.getValue()[2].availableStats);
        this.availableStatsSub$.next(updatedStats);
        this.currentStatHeaderSub$.next('Receiving Yds');
        break;
      }
      case 'def': {
        this._store.dispatch(setPositionType(PositionTypes.DEF));
        const updatedStats = Object.keys(this.positionsMapSub$.getValue()[3].availableStats);
        this.availableStatsSub$.next(updatedStats);
        this.currentStatHeaderSub$.next('Rushing Yds Allowed');
        break;
      }
      default:
        break;
    }
  }

  statTrackByFn(index: number, stat: any): string {
    return stat.id ?? stat.player;
  }

  updateSelectedYear(event: Event): void {
    const year = +(event.target as HTMLSelectElement).value;
    this._store.dispatch(updateYearFilter(year));
  }

  handleStatTypeChanged(event: Event): void {
    const statType = (event.target as HTMLSelectElement).value;
    this.currentStatHeaderSub$.next(statType);

  }

  handlePlayerSelected(playerId: string): void {
    this._router.navigate(['tabs', 'fantasy-football', `player-details`, playerId]);
  }

  private getUpdatedPositionStats(positionData: any[], year: number, currentStatHeader: string, index: number): {label: string; ctx: {positionData: {stats: any[]}}; value: string; availableStats: {[key: string]: string}}[] {
    const currentPositionMapState = this.positionsMapSub$.getValue();
    const updatedPositionMap = {
      ...currentPositionMapState[index],
      ctx: {
        positionData: {
          stats: positionData.filter(pos => pos.year === year).map(pos => (
            {
              id: pos.id,
              player: pos.player,
              imgUrl: pos.imageUrl ?? 'https://ionicframework.com/docs/img/demos/avatar.svg',
              stat: +pos[currentPositionMapState[index].availableStats[currentStatHeader]]
            }
          )).sort((prev, next) => {
            if (prev.stat > next.stat) {
              return -1;
            }
            return 1;
          })
        }
      }
    };
    currentPositionMapState[index] = updatedPositionMap;
    return currentPositionMapState;
  }

}
