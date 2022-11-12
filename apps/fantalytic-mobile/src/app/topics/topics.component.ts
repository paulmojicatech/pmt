/* eslint-disable no-underscore-dangle */
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { getTopics } from './ngrx/selectors/topics.selector';
import { filter } from 'rxjs';
import { loadTopics } from './ngrx/actions/topics.actions';
import { RssFeedType } from '../../../../../libs/fantalytic-shared/src/index';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'pmt-topic',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss'],
})
export class TopicsComponent implements OnInit {

  _store = inject(Store);
  topics$ = this._store.select(getTopics).pipe(filter(topics => !!topics));
  rssFeeds = RssFeedType;

  ngOnInit(): void {
   this._store.dispatch(loadTopics(RssFeedType.ESPN));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateRssFeed(ev: any): void {
    const selectedIndex = ev.target.options.selectedIndex;
    switch (selectedIndex) {
      case 0:
        this._store.dispatch(loadTopics(RssFeedType.ESPN));
        break;
      case 1:
        this._store.dispatch(loadTopics(RssFeedType.FOOTBALLERS));
        break;
      case 2:
        this._store.dispatch(loadTopics(RssFeedType.PFF));
        break;
      default:
        break;
    }
  }
}
