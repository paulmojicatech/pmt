import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Observable } from 'rxjs';
import { TOPICS_TEXT } from './const/topics.const';
import { Topic, TopicsState } from './models/topics.interface';
import { loadTopics } from './ngrx/actions/topics.actions';
import { getTopics } from './ngrx/selectors/topics.selector';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RssFeedType } from './enums/topics.enum';

@Component({
  selector: 'pmt-topics',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss'],
})
export class TopicsComponent implements OnInit {
  readonly topicsText = TOPICS_TEXT;

  topics$!: Observable<Topic[]>;
  rssFeeds = RssFeedType;

  constructor(private _store: Store<TopicsState>) {}

  ngOnInit(): void {
    this.topics$ = this._store.select(getTopics).pipe(
      filter(topics => !!topics)
    ) as Observable<Topic[]>;
    this._store.dispatch(loadTopics(RssFeedType.ESPN));
  }

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
