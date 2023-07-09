import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ToolbarComponent } from '../shared/components/toolbar/toolbar.component';
import { EspnRssFeedService } from '../topics/services/espn-rss-feed.service';
import { FfaRssFeedService } from '../topics/services/ffa-rss-feed.service';
import { FootballersRssService } from '../topics/services/footballers-rss.service';

@Component({
  selector: 'fantalytic-ssr-home',
  standalone: true,
  imports: [AsyncPipe, NgFor, DatePipe, NgIf, ToolbarComponent, MatCardModule],
  host: {
    class:
      'flex min-h-screen flex-col text-zinc-900 bg-zinc-50 w-[100vw]',
  },
  template: `
    <pmt-toolbar></pmt-toolbar>
    <main class="p-0 w-[100vw] flex flex-wrap">  
    <div class="inline-flex m-2 w-full">
        <label class="mr-2">RSS Feeds:</label>
        <select (change)="handleRssFeedChange($event.target)">
          <option *ngFor="let rssFeed of RSS_FEEDS" value="{{rssFeed}}">{{rssFeed}}</option>
        </select>
      </div>        
      <div *ngFor="let topic of topics$ | async" class="w-full lg:w-[30%] m-2">
        <mat-card class="h-full">
          <mat-card-header>
            <mat-card-title>
              {{topic.title}}
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <img *ngIf="topic.imageUrl" mat-card-image src="{{topic.imageUrl}}" alt="Image" />
            <div class="mt-2">{{topic.description}}</div>
          </mat-card-content>
          <mat-card-actions>
            <span class="absolute bottom-2 right-2">
              <a mat-button href="{{topic.link}}" target="_blank">Read More</a>
            </span>
            
          </mat-card-actions>
        </mat-card>
      </div>      
    </main>
  `,
})
export default class HomeComponent {
  private _espnRssFeedSvc = inject(EspnRssFeedService);
  private _ffaRssFeedSvc = inject(FfaRssFeedService);
  private _footballersRssFeedSvc = inject(FootballersRssService);
  readonly RSS_FEEDS = ['ESPN', 'Footballers'];


  topics$ = this._espnRssFeedSvc.getTopics();

  handleRssFeedChange(ev: EventTarget | null): void {
    const rssFeed = (ev as HTMLSelectElement).value;
    switch (rssFeed) {
      case 'ESPN':
        this.topics$ = this._espnRssFeedSvc.getTopics();
        break;
      case 'FFA':
        this.topics$ = this._ffaRssFeedSvc.getTopics();
        break;
      case 'Footballers':
        this.topics$ = this._footballersRssFeedSvc.getTopics();
        break;
      default:
        break;
    }
  }

}
