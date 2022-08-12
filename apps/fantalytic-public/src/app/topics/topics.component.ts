import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TOPICS_TEXT } from './const/topics.const';
import { EspnRssFeedService } from './services/espn-rss-feed.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'pmt-topics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss'],
})
export class TopicsComponent implements OnInit {
  readonly topicsText = TOPICS_TEXT;

  constructor(private _topicsSvc: EspnRssFeedService) {}

  ngOnInit(): void {
    this._topicsSvc.getTopics().subscribe(resp => {
      console.log('RESP', resp);
    })

  }
}
