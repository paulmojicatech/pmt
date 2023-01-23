import { Component, h, State } from '@stencil/core';
import { CALENDAR_VIEW } from '../../models/calendar.const';
import { CalendarView } from '../../models/calendar.types';
import { format } from 'date-fns';
import { getNextView, getPrevView } from '../../utils/utils';
@Component({
  tag: 'pmt-calendar',
  styleUrl: 'calendar.scss',
  shadow: true,
})
export class CalendarComponent {
  
  @State()
  currentView: CalendarView = 'Month';

  @State()
  currentDate: Date = new Date();

  handleGetNextView(): void {
    const nextView = getNextView(this.currentView, this.currentDate);
    this.currentDate = nextView;
  }

  handleGetPrevView(): void {
    const nextView = getPrevView(this.currentView, this.currentDate);
    this.currentDate = nextView;
  }

  updateCurrentView(view: CalendarView) {
      this.currentView = view;
      const today = new Date();
      switch (view) {
        case 'Day': {
          this.currentDate = today;
          break;
        }
        case 'Year': {
          this.currentDate = today;
          break;
        }
        default:
          this.currentDate = today;
          break;
      }
  }

  formatCurrentDate(): string {
    switch (this.currentView) {
      case 'Day': {
        return format(this.currentDate, 'MMM dd, yyyy');
      }
      case 'Year': {
        return format(this.currentDate, 'yyyy');
      }
      default:
        return format(this.currentDate, 'MMM yyyy');
    }
  }

  render() {
    return (
      <section class="container">
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
        <div class="calendar-sub-header">
          <h1>{this.formatCurrentDate()}</h1>
          <div class="move-view-container">
              <button onClick={() => this.handleGetPrevView()}>{'<'}</button>
              <button>Today</button>
              <button onClick={() => this.handleGetNextView()}>{'>'}</button>

          </div>
        </div>
      </section>
      
    )
  }
}
