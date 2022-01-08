import { mount } from "@vue/test-utils";
import StayBookingForm from '@/components/StayBookingForm';

const expectation_mocks = {
    no_date: "?? ??? ????",
    begin_formatted: "12 Jan 2022",
    begin_reserve_event_1: '2022-01-12T11:00:00.000Z',
    end_formatted: "20 Jan 2022",
    end_reserve_event_1: '2022-01-20T11:00:00.000Z',
    new_begin_date: '2022-01-18T11:00:00.000Z',
    new_end_date: '2022-01-25T11:00:00.000Z'
}

describe("StayBookingForm component elements:", () => {
    let wrapper;
    const mockedProps = {
        price: "298 zł",
        rating: "3.2",
        ratings: 128,
        unavailableDates: [],
        reservation: {
            begin: "2022-01-12T12:00",            
            end: "2022-01-20T12:00",            
        }
    };
    

    beforeEach(() => {
        wrapper = mount(StayBookingForm, {
            props: mockedProps,
            global: {
                stubs: {
                    Calendar: true,
                    ratingStars: true,
                    iconArrow: true,
                    iconChevron: true,
                    iconStar: true,
                    iconTimes: true
                }
            }
        })
    });

    describe('price', () => {
        let priceEl;
        
        beforeEach(() => {
            priceEl = wrapper.find(".price");
        })
        
        it('exists', () => {
            expect(priceEl.exists()).toBeTruthy();
        });
        
        it('has value equal to prop', () => {
            expect(priceEl.text()).toEqual(mockedProps.price);
        });        
    });

    describe('number of ratings', () => {
        let ratingCount;

        beforeEach(() => {
            ratingCount = wrapper.find(".rating-count");
        });

        it('exists', () => {
            expect(ratingCount.exists()).toBeTruthy();
        });

        it('has value equal to prop', () => {
            expect(ratingCount.text()).toEqual(mockedProps.ratings.toString())
        })        
    });

    describe('pseudo-input element with dates', () => {
        let pseudoInputEl;

        beforeEach(() => {
            pseudoInputEl = wrapper.find('.pseudo-input');
        });

        it('exists', () => {
            expect(pseudoInputEl.exists()).toBeTruthy();
        });

        it('contain begin date', () => {
            const beginDate = pseudoInputEl.find('.date-range_begin .date');
    
            expect(beginDate.text()).toMatch(expectation_mocks.begin_formatted);
        });

        it('contain end date', () => {
            const endDate = pseudoInputEl.find('.date-range_end .date');
            expect(endDate.text()).toMatch(expectation_mocks.end_formatted);
        });

        describe('buttons with times icon to clear date', () => {
            let beginDateBtn, endDateBtn, dateRangeBeginEl, dateRangeEndEl;

            beforeEach(() => {
                dateRangeBeginEl = pseudoInputEl.find('.date-range_begin');
                dateRangeEndEl = pseudoInputEl.find('.date-range_end');
            });

            test('DateRangeBegin element exists', () => {
                expect(dateRangeBeginEl.exists()).toBeTruthy();
            });

            test('DateRangeEnd element exists', () => {
                expect(dateRangeEndEl.exists()).toBeTruthy();
            });

            test('Button begindDate exist', () => {
                const beginDateBtn = dateRangeBeginEl.find('.btn');
                expect(beginDateBtn.exists()).toBeTruthy();
            });

            test('Button endDate exist', () => {
                const endDateBtn = dateRangeEndEl.find('.btn');
                expect(endDateBtn.exists()).toBeTruthy();
            });

            test('After click on beginDate button, question marks should be visible instead date', async () => {
                const beginDateBtn = dateRangeBeginEl.find('.btn');
                const beginDate = pseudoInputEl.find('.date-range_begin .date');

                await beginDateBtn.trigger('click');
    
                expect(beginDate.text()).toMatch(expectation_mocks.no_date);
            });

            test('After click on beginDate button, calendar component should be visible', async () => {
                const beginDateBtn = dateRangeBeginEl.find('.btn');

                await beginDateBtn.trigger('click');
    
                const calendar = wrapper.find('calendar-stub');
                expect(calendar.exists()).toBeTruthy();
            });

            test('After click on endDate button, question marks should be visible instead date', async () => {
                const endDateBtn = dateRangeEndEl.find('.btn');
                const endDate = pseudoInputEl.find('.date-range_end .date');

                await endDateBtn.trigger('click');
    
                expect(endDate.text()).toMatch(expectation_mocks.no_date);
            });

            test('After click on endDate button, calendar component should be visible', async () => {
                const endDateBtn = dateRangeEndEl.find('.btn');

                await endDateBtn.trigger('click');
    
                const calendar = wrapper.find('calendar-stub');
                expect(calendar.exists()).toBeTruthy();
            });
        });
    });

    describe('button `Reserve`', () => {
        let reserveBtn;

        beforeEach(() => {
            reserveBtn = wrapper.find("#reserveBtn");
        });

        it('exists', () => {
            expect(reserveBtn.exists()).toBeTruthy();
        });

        it('emit event after click', () => {
            reserveBtn.trigger('click');

            expect(wrapper.emitted()).toHaveProperty('reserve');
            expect(wrapper.emitted().reserve[0][0]).toEqual({
                begin: expectation_mocks.begin_reserve_event_1,
                end: expectation_mocks.end_reserve_event_1
            })
        });
    });

    describe('child components:', () => {
        describe('Rating Star component', () => {
            it('exists', () => {
                const ratingStars = wrapper.find('rating-stars-stub');
                expect(ratingStars.exists()).toBeTruthy();
            });            
        });
        
        describe('Calendar component', () => {
            it('not exist before user interaction', () => {
                const calendar = wrapper.find('calendar-stub');
                expect(calendar.exists()).toBeFalsy();
            });

            it('exist after user interaction', async () => {
                const pseudoInputEl = wrapper.find('.pseudo-input');
                await pseudoInputEl.trigger('click');

                const calendar = wrapper.find('calendar-stub');
                expect(calendar.exists()).toBeTruthy();
            });

            it('emit event next, and change values of calendarPage', async () => {
                const monthOfPageDateValueBeforeEvent = wrapper.vm.calendarPage.monthOfPage.date;

                const pseudoInputEl = wrapper.find('.pseudo-input');
                await pseudoInputEl.trigger('click');

                const calendar = wrapper.find('calendar-stub');
                await calendar.trigger('next');

                expect(wrapper.vm.calendarPage.monthOfPage.date > monthOfPageDateValueBeforeEvent).toBeTruthy();
            });

            it('emit event next, and change values of calendarPage', async () => {
                const monthOfPageDateValueBeforeEvent = wrapper.vm.calendarPage.monthOfPage.date;

                const pseudoInputEl = wrapper.find('.pseudo-input');
                await pseudoInputEl.trigger('click');

                const calendar = wrapper.find('calendar-stub');
                await calendar.trigger('prev');

                expect(wrapper.vm.calendarPage.monthOfPage.date < monthOfPageDateValueBeforeEvent).toBeTruthy();
            });

            it('emit event change with new values of begin and end date, and change values of rBeginDate, and rEndDate', async () => {
                const rBeginDateValueBeforeChange = wrapper.vm.rBeginDate;
                const rEndDateValueBeforeChange = wrapper.vm.rEndDate;

                const pseudoInputEl = wrapper.find('.pseudo-input');
                await pseudoInputEl.trigger('click');

                const calendar = wrapper.find('calendar-stub');
                await calendar.trigger('change', {begin: expectation_mocks.new_begin_date, end: expectation_mocks.new_end_date});

                expect(wrapper.vm.rBeginDate !== rBeginDateValueBeforeChange).toBeTruthy();
                expect(wrapper.vm.rEndDate !== rEndDateValueBeforeChange).toBeTruthy();
            });

            it('not exist after coursor leave component area', async () => {
                const pseudoInputEl = wrapper.find('.pseudo-input');
                await pseudoInputEl.trigger('mouseleave');

                const calendar = wrapper.find('calendar-stub');
                expect(calendar.exists()).toBeFalsy();
            });
        })
    });
    
    
});