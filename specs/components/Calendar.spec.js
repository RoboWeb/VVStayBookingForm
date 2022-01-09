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
        });

        describe('week days row', () => {
            let weekDays;
            beforeEach(() => {
                weekDays = wrapper.find('.week-days');
            });

            it('exists', () => {
                expect(weekDays.exists()).toBeTruthy();
            });

            it('have 7 child elements with the proper short week name each', () => {
                const items = weekDays.findAll('.week-days_day-name');
                expect(items).toHaveLength(7);

                expect(items[0].text()).toBe('Mon');
                expect(items[3].text()).toBe('Thu');
                expect(items[6].text()).toBe('Sun');
            });
        });

        describe('calendar page with days (month element) - for mocked month (February)', () => {
            let page;

            beforeEach(() => {
                page = wrapper.find('.month');
            });

            it('exists', () => {
                expect(page.exists()).toBeTruthy();
            });

            it('have a days (all)', () => {
                const days = page.findAll('.month_day');
                expect(days).toHaveLength(35);
            });

            it('have a 1 day of prev month', () => {
                const prevDays = page.findAll('.is-prev-month');
                expect(prevDays).toHaveLength(1);
            });

            it('have a 6 days of next month', () => {
                const nextDays = page.findAll('.is-next-month');
                expect(nextDays).toHaveLength(6);
            })

            it('have a 28 days of current (mocked) month', () => {
                const currentDays = page.findAll('.month_day:not(.is-prev-month):not(.is-next-month)');
                console.log(currentDays.length);
            })

        });
    })
});