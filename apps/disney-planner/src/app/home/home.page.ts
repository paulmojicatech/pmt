import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { Store } from '@ngrx/store';
import { fromUpcomingTripsActions, fromUpcomingTripsSelectors } from 'disney-planner-trips-ngrx';
import { Subject, takeUntil } from 'rxjs';
import { UpcomingTrip } from 'disney-planner-models';

@Component({
  selector: 'disney-home',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      @for (trip of trips(); track $index) {
        <disney-schedule [title]="trip.park" [subtitle]="trip.date" [content]="'This is a mock trip'"></disney-schedule>
      } @empty {
        <article>You have no upcoming trips</article>
      }
    </ion-content>
  `,
  standalone: true,
  imports: [IonicModule, ScheduleComponent],
  styles: ``
})
export class HomePage implements OnInit, OnDestroy {
  private _store = inject(Store);

  trips = signal<UpcomingTrip[]>([]);

  private _onDestroySub$ = new Subject<void>();

  ngOnInit(): void {
    this._store.dispatch(fromUpcomingTripsActions.loadUpcomingTrips());
    this._store.select(fromUpcomingTripsSelectors.selectUpcomingTrips).pipe(
      takeUntil(this._onDestroySub$)
    ).subscribe(upcomingTrips => {
      this.trips.set(upcomingTrips);      
    }
    )
  }

  ngOnDestroy(): void {
    this._onDestroySub$.next();
    this._onDestroySub$.complete();
  }

}
