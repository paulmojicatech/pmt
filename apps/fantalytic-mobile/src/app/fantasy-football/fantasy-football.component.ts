/* eslint-disable no-fallthrough */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { filter, map, Observable, take } from 'rxjs';
import { loadQbs, loadRbs, loadReceivers } from './ngrx/actions/fantasy-football.actions';
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
  qbs$ = this._store.select(getQbs).pipe(
    filter(qbs => !!qbs),
    map(qbs => qbs.map(qb => ({player: qb.player, stat: qb.passingYds})).sort((prev, next) => {
        if (prev.stat > next.stat) {
          return -1;
        }
        return 1;
      }))
  );
  rbs$ = this._store.select(getRbs).pipe(
    filter(rbs => !!rbs),
    map(rbs => rbs.map(rb => ({player: rb.player, stat: rb.rushingYds})).sort((prev, next) => {
        if (prev.stat > next.stat) {
          return -1;
        }
        return 1;
      }))
  );

  recs$ = this._store.select(getReceivers).pipe(
    filter(recs => !!recs),
    map(recs => recs.map(rec => ({player: rec.player, stat: rec.receivingYds})).sort((prev, next) => {
        if (prev.stat > next.stat) {
          return -1;
        }
        return 1;
      }))
  );

  def$ = this._store.select(getDefenses).pipe(
    filter(def => !!def),
    map(defs => defs.map(def => ({player: def.team, stat: def.passYdsAllowed})).sort((prev, next) => {
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
          this.recs$.pipe(take(1)).subscribe(stats => {
            this.positionsMap[3] = {...this.positionsMap[3], ctx: {positionData: {...this.positionsMap[3].ctx.positionData, stats}}};
          });
          break;
        }
      }
      default:
        break;
    }
  }

}
