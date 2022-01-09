import { mount } from "@vue/test-utils";
import Calendar from '@/components/Calendar';
import DateTime from "@/services/datetime";
import CalendarPage from "@/services/calendar";

const mocked_month = new DateTime('2022-02-01T12:00:00');
const mocked_days_of_calendar_page = CalendarPage(mocked_month);
const mocked_reservation_begin = '2022-02-05T12:00';
const mocked_reservation_end = '2022-02-10T12:00';
const mocked_calendar_page = {
    days: mocked_days_of_calendar_page,
    monthOfPage: mocked_month,
    unavailable: []
};

describe('Calendar component', () => {
    let wrapper;
    const mockedProps = {
        page: mocked_calendar_page,
        reservation: {
            begin: new DateTime(mocked_reservation_begin),
            end: new DateTime(mocked_reservation_end)
        },
    }

    beforeEach(() => {
        wrapper = mount(Calendar, {
            props: mockedProps,
            global: {
                stubs: {iconChevron: true}
            }
        });
    });

    describe('<DOM Elements>', () => {
        describe('Month of the page switcher', () => {
            let monthSwitcher;

            beforeEach(() => {
                monthSwitcher = wrapper.find('.month-switcher');
            });

            it('have `date_displaying-month` element', () => {
                const monthEl = monthSwitcher.find('.date_displaying-month');
                expect(monthEl.exists()).toBeTruthy();
            });

            test('The `date_displaying-month` display long month name', () => {
                const monthEl = monthSwitcher.find('.date_displaying-month');
                expect(monthEl.text()).toEqual('February');
            });

            it('have `date_displaying-year` element', () => {
                const yearEl = monthSwitcher.find('.date_displaying-year');
                expect(yearEl.exists()).toBeTruthy();
            });

            test('The `date_displaying-year` display long month name', () => {
                const yearEl = monthSwitcher.find('.date_displaying-year');
                expect(yearEl.text()).toEqual('2022');
            });

            it('have an icon-chevron - left', () => {
                const iconChevron = monthSwitcher.find('icon-chevron-stub[chevron="left"]');
                expect(iconChevron.exists()).toBeTruthy();
            });

            it('have an icon-chevron - right', () => {
                const iconChevron = monthSwitcher.find('icon-chevron-stub[chevron="right"]');
                expect(iconChevron.exists()).toBeTruthy();
            });
        })
    })
});