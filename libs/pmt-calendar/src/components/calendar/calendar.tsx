import { Component, h, State } from '@stencil/core';
import { CALENDAR_VIEW } from '../../models/calendar.const';
import { CalendarView } from '../../models/calendar.types';
import { format } from 'date-fns';
@Component({
  tag: 'pmt-calendar',
  styleUrl: 'calendar.scss',
  shadow: true,
})
export class CalendarComponent {
  
  @State()
  currentView: CalendarView = 'Month';

  @State()
  currentSubTitle: string = format(new Date(new Date().getFullYear(), new Date().getMonth()), 'MMMM yyyy');

  updateCurrentView(view: CalendarView) {
      this.currentView = view;
      const today = new Date();
      switch (view) {
        case 'Day': {
          this.currentSubTitle = format(today, 'MMMM dd, yyyy');
          break;
        }
        case 'Year': {
          this.currentSubTitle = format(today, 'yyyy');
          break;
        }
        default:
          this.currentSubTitle = format(today, 'MMMM yyyy');
          break;
      }
  }

  render() {
    return (
      <section class="container">
        <div class="header">
        <div class="calendar-header-container">
                {Object.keys(CALENDAR_VIEW).map(key => {
                    return (
                        <button 
                            class={CALENDAR_VIEW[key] === this.currentView ? 'selected' : ''} 
                            onClick={() => this.updateCurrentView(CALENDAR_VIEW[key])} key={key}>
                                {CALENDAR_VIEW[key]}
                        </button>
                    );
                })}
            </div>
        </div>
        <div class="subb-header">
          <h1>{this.currentSubTitle}</h1>
        </div>
      </section>
      
    )
  }
}
