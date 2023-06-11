import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { EspnRssFeedService } from '../topics/services/espn-rss-feed.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'fantalytic-ssr-home',
  standalone: true,
  imports: [AsyncPipe, NgFor, DatePipe, NgIf, MatToolbarModule, MatCardModule],
  host: {
    class:
      'flex min-h-screen flex-col text-zinc-900 bg-zinc-50 w-[100vw]',
  },
  template: `
    <mat-toolbar color="primary">
      <span class="text-white">Fantalytic.io</span>
    </mat-toolbar>
    <main class="p-0 w-[100vw] flex flex-wrap">
      <div *ngFor="let topic of topics$ | async" class="w-[30%] m-2">
        <mat-card class="h-full">
          <mat-card-header>
            <mat-card-title>
              {{topic.title}}
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <img mat-card-image src="{{topic.imageUrl}}" alt="ESPN Image" />
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
  topics$ = this._espnRssFeedSvc.getTopics();
}
