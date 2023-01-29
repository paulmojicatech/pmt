import { newSpecPage } from '@stencil/core/testing';
import { CalendarComponent } from './calendar';

describe('my-component', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [CalendarComponent],
      html: '<pmt-calendar></pmt-calendar>',
    });
    expect(root).toEqualHtml(`
      <pmt-calendar>
        <mock:shadow-root>
          <div>
            Hello, World! I'm
          </div>
        </mock:shadow-root>
      </pmt-calendar>
    `);
  });

  it('renders with values', async () => {
    const { root } = await newSpecPage({
      components: [CalendarComponent],
      html: `<pmt-calendar first="Stencil" last="'Don't call me a framework' JS"></pmt-calendar>`,
    });
    expect(root).toEqualHtml(`
      <pmt-calendar first="Stencil" last="'Don't call me a framework' JS">
        <mock:shadow-root>
          <div>
            Hello, World! I'm Stencil 'Don't call me a framework' JS
          </div>
        </mock:shadow-root>
      </pmt-calendar>
    `);
  });
});
