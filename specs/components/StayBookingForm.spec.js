import { mount } from "@vue/test-utils";
import StayBookingForm from '@/components/StayBookingForm';

describe("StayBookingForm component elements:", () => {
    let wrapper;
    const mockedProps = {
        price: 298,
        rating: 4.2,
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
                    Calendar: true
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
            expect(ratingCount.text()).toEqual(mockedProps.ratings)
        })        
    });

    describe('button `Reserve`', () => {
        let reserveBtn;

        beforeEach(() => {
            reserveBtn = wrapper.find("#reserveBtn");
        });

        it('exists', () => {
            expect(reserveBtn.exists()).toBeTruthy();
        });
    })
    
});