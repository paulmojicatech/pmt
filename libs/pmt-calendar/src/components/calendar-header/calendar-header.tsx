import {Component, h, State} from '@stencil/core';
import {CALENDAR_VIEW} from '../../models/calendar.const';
import { CalendarView } from '../../models/calendar.types';

@Component({
    tag: 'pmt-calendar-header',
    shadow: true,
    styleUrl: './calendar-header.scss'
})

export class CalendarHeader {

    @State()
    currentView: CalendarView = 'Month';

    updateCurrentView(view: CalendarView) {
        this.currentView = view;
    }

    render() {
        return (
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
        );
    }
}