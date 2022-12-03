/* eslint-disable max-len */
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { combineLatest, filter, map, Observable, take } from 'rxjs';
import { loadDefenses, loadQbs, loadRbs, loadReceivers } from './ngrx/actions/fantasy-football.actions';
import { getDefenses, getQbs, getRbs, getReceivers, getSelectedYear } from './ngrx/selectors/fantasy-football.selectors';

@Component({
  selector: 'pmt-fantasy-football',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './fantasy-football.component.html',
  styleUrls: ['./fantasy-football.component.scss'],
})
export class FantasyFootballComponent implements OnInit {


  readonly AVAILABLE_YEARS = [2018,2019,2020,2021,2022];

  positionsMap: {label: string; ctx: {positionData: {header: string[]; stats: any[]}}; value: string}[] = [
    {
      label: 'QBs',
      ctx: {
        positionData: {
          header: ['Passing', 'Yds'],
          stats: []
        },
      },
      value: 'qb'
    },
    {
      label: 'RBs',
      ctx: {
        positionData: {
          header: ['Rushing', 'Yds'],
          stats: []
        },
      },
      value: 'rb'
    },
    {
      label: 'Receivers',
      ctx: {
        positionData: {
          header: ['Receiving', 'Yds'],
          stats: []
        }
      },
      value: 'rec'
    },
    {
      label: 'Defenses',
      ctx: {
        positionData: {
          header: ['Defense', 'Yds Allowed'],
          stats: []
        },
      },
      value: 'def'
    },
  ];

  private _store = inject(Store);
  selectedYear$ = this._store.select(getSelectedYear);
  qbs$ = combineLatest([this._store.select(getQbs), this.selectedYear$]).pipe(
    filter(([qbs]) => !!qbs),
    map(([qbs, year]) => qbs.filter(qb => qb.year === year).map(qb => ({player: qb.player, stat: qb.passingYds})).sort((prev, next) => {
        if (prev.stat > next.stat) {
          return -1;
        }
        return 1;
      }))
  );
  rbs$ = combineLatest([this._store.select(getRbs), this.selectedYear$]).pipe(
    filter(([rbs]) => !!rbs),
    map(([rbs, year]) => rbs.filter(rb => rb.year === year).map(rb => ({player: rb.player, stat: rb.rushingYds})).sort((prev, next) => {
        if (prev.stat > next.stat) {
          return -1;
        }
        return 1;
      }))
  );

  recs$ = combineLatest([this._store.select(getReceivers), this.selectedYear$]).pipe(
    filter(([recs]) => !!recs),
    map(([recs, year]) => recs.filter(rec => rec.year === year).map(rec => ({player: rec.player, stat: rec.receivingYds})).sort((prev, next) => {
        if (prev.stat > next.stat) {
          return -1;
        }
        return 1;
      }))
  );

  def$ = combineLatest([this._store.select(getDefenses), this.selectedYear$]).pipe(
    filter(([def]) => !!def),
    map(([defs, year]) => defs.filter(def => def.year === year).map(def => ({player: def.team, stat: def.passYdsAllowed})).sort((prev, next) => {
        if (prev.stat > next.stat) {
          return -1;
        }
        return 1;
      }))
  );


  ngOnInit(): void {
    this._store.dispatch(loadQbs());
    this._store.dispatch(loadRbs());
    this._store.dispatch(loadReceivers());
    this._store.dispatch(loadDefenses());
    this.qbs$.pipe(take(1)).subscribe(stats => {
      this.positionsMap[0] = {...this.positionsMap[0], ctx: {positionData: {...this.positionsMap[0].ctx.positionData, stats}}};
    });
  }

  handleAccordionStateChange(ev: any): void {
    switch (ev.detail.value) {
      case 'rb': {
        if (!this.positionsMap[1].ctx.positionData.stats.length) {
          this.rbs$.pipe(take(1)).subscribe(stats => {
            this.positionsMap[1] = {...this.positionsMap[1], ctx: {positionData: {...this.positionsMap[1].ctx.positionData, stats}}};
          });
          break;
        }
      }
      case 'rec': {
        if (!this.positionsMap[2].ctx.positionData.stats.length) {
          this.recs$.pipe(take(1)).subscribe(stats => {
            this.positionsMap[2] = {...this.positionsMap[2], ctx: {positionData: {...this.positionsMap[2].ctx.positionData, stats}}};
          });
          break;
        }
      }
      case 'def': {
        if (!this.positionsMap[3].ctx.positionData.stats.length) {
          this.def$.pipe(take(1)).subscribe(stats => {
            this.positionsMap[3] = {...this.positionsMap[3], ctx: {positionData: {...this.positionsMap[3].ctx.positionData, stats}}};
          });
          break;
        }
      }
      default:
        break;
    }
  }

  statTrackByFn(index: number, stat: any): string {
    return stat.player;
  }

}
