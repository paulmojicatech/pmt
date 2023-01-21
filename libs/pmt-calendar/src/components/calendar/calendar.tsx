import { Component, h } from '@stencil/core';

@Component({
  tag: 'pmt-calendar',
  styleUrl: 'calendar.scss',
  shadow: true,
})
export class CalendarComponent {
  
  render() {
    return (
      <section class="container">
        <div class="header">
          <pmt-calendar-header></pmt-calendar-header>
      </div>  
      </section>
      
    )
  }
}
