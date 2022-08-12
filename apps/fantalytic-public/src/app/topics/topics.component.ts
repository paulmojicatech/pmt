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

  constructor(private _store: Store<TopicsState>) {}

  ngOnInit(): void {
    this.topics$ = this._store.select(getTopics).pipe(
      filter(topics => !!topics)
    ) as Observable<Topic[]>;
    this._store.dispatch(loadTopics());
  }
}
