import { Component, h, Prop } from "@stencil/core";

@Component({
    tag: 'pmt-month-view',
    shadow: true
})
export class MonthViewComponent {

    @Prop()
    currentDate: Date;

    render() {
        return (
            <div>{this.currentDate.toLocaleDateString()}</div>
        );
    }
}