import { Component, h, Prop } from "@stencil/core";
import { DAY_OF_WEEK } from "../../models/calendar.const";

@Component({
    tag: 'pmt-month-view',
    shadow: true,
    styleUrl: 'month-view.scss'
})
export class MonthViewComponent {

    @Prop()
    currentDate: Date;

    readonly DAYS_OF_WEEK = Object.values(DAY_OF_WEEK);



    render() {
        return (
            <section class="monthViewContainer">
                <div class="dayOfWeek">
                    {this.DAYS_OF_WEEK.map(dow => {
                        return (
                            <div>{dow}</div>
                        );
                    })}
                </div>
            </section>
        );
    }
}