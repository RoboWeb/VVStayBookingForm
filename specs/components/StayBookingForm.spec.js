import { mount } from "@vue/test-utils";
import StayBookingForm from '@/components/StayBookingForm';

describe("StayBookingForm component elements:", () => {
    let wrapper;
    const mockedProps = {
        price: "298 zł",
        rating: "3.2",
        ratings: 128,
        unavailableDates: [],
        reservation: {
            begin: "12 Jan 2022",
            end: "20 Jan 2022"
        }
    };
    

    beforeEach(() => {
        wrapper = mount(StayBookingForm, {
            props: mockedProps,
            global: {
                stubs: {
                    RatingStars: true,
                    Calendar: true,
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
    
            expect(beginDate.text()).toMatch(mockedProps.reservation.begin);
        });

        it('contain end date', () => {
            const endDate = pseudoInputEl.find('.date-range_end .date');
            expect(endDate.text()).toMatch(mockedProps.reservation.end);
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
        })
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

            it('exist after user interaction', () => {
                const pseudoInputEl = wrapper.find('.pseudo-input');
                pseudoInputEl.trigger('click');

                const calendar = wrapper.find('calendar-stub');
                expect(calendar.exists()).toBeTruthy();
            })
        })
    });
    
    
});