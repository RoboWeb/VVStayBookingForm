<template>
    <div class="stay-booking-form" @click="calendarVisible = false">
        <div class="row">
            <div class="column">
                <span class="price">{{ price }}</span>
                <div class="rating-wrapper">
                    <rating-stars :rating="rating"></rating-stars>
                    <span class="rating-count">{{ ratings }}</span>
                </div>
            </div>
            <div class="column">
                <button id="reserveBtn" class="btn btn-tertiary" @click="confirmReservation">Reserve</button>
            </div>
        </div>
        <div class="row">
            <div class="pseudo-input date-range" @click.stop="calendarVisible = true" >
                <div class="date-range_begin pseudo-input_date">
                    <span class="date">{{ beginDate.day.numeric }} {{ beginDate.month.short }} {{ beginDate.year }}</span>
                    <icon-times class="btn btn-icon btn-small"></icon-times>
                </div>
                <icon-arrow></icon-arrow>
                <div class="date-range_end pseudo-input_date">
                    <span class="date">{{ endDate.day.numeric }} {{ endDate.month.short }} {{ endDate.year }}</span>
                    <icon-times class="btn btn-icon btn-small"></icon-times>
                </div>
                <calendar v-if="calendarVisible" :page="calendarPage" ></calendar>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue';
import DateTime from "./../services/datetime";
import CalendarPage from "./../services/calendar";
import ratingStars from './parts/ratingStars.vue';
import Calendar from './Calendar.vue';

export default {
    name: "StayBookingForm",
    props: {
        price: {
            type: String,
            required: true
        },
        ratings: {
            type: Number,
            required: true
        },
        rating: {
            type: String,
            default: "5",
            validator: (value) => {
                const parsed = parseFloat(value);
                return parsed >= 0 && parsed <= 5;
            }
        },
        reservation: {
            type: Object,
            required: true,
            validator: (value) => value.begin && value.end
        }
    },
    emits: {
        'reserve': ({begin, end}) => {
            console.log("Emit event reserve", begin, end);
            return true;
        }
    },
    components:{
        'rating-stars': ratingStars,
        'calendar': Calendar
    },
    setup(props, { emit }) {
        const calendarVisible = ref(false);
        const calendarPage = reactive({
            days: [],
            month: '',
            unavailable: [],
            reservation: {}
        });

        const beginDate = computed(() => new DateTime(props.reservation.begin));
        const endDate = computed(() => new DateTime(props.reservation.end));
        
        // emits
        const confirmReservation = () => {
            emit('reserve', { begin: beginDate.value.ISODate, end: endDate.value.ISODate });
        }

        // methods
        

        // mounted
        onMounted(() => {
            calendarPage.days = CalendarPage(beginDate.value);
            calendarPage.month = new DateTime(beginDate.value.year, beginDate.value.month.index, 1, 12);
            calendarPage.reservation = {
                begin: beginDate.value,
                end: endDate.value
            }
        });
       

        return {
            calendarVisible,
            calendarPage,
            beginDate,
            endDate,
            confirmReservation
        }
    }
}

</script>

<style lang="scss" >
:root .stay-booking-form {
    --primary-bg-color: rgb(255,255,255);
    --primary-bg-color-rgb: 255, 255, 255;
    --primary-color: rgb(55, 55, 55);
    --primary-color-rgb: 55, 55, 55;
    --primary-color-light: rgb(158, 158, 158);
    --primary-color-light-rgb: 158, 158, 158;
    --primary-color-lighter: rgb(216, 216, 216);
    --primary-color-lighter-rgb: 216, 216, 216;
    --tertiary-bg-color: rgb(78, 152, 69);
    --tertiary-bg-color-rgb: 78, 152, 69;
    --tertiary-color: rgb(237, 244, 236);
    --tertiary-color-rgb: 237, 244, 236;
    --secondary-bg-color: rgb(237, 245, 236);
    --secondary-bg-color-rgb: 237, 245, 236;
    --secondary-color: rgb(103, 166, 95);
    --secondary-color-rgb: 103, 166, 95;
    --border-color: rgb(225, 225, 225);
    --border-color-rgb: 225, 225, 225;
    --border-color-active: rgb(210, 229, 208);
    --border-color-active-rgb: 210, 229, 208;
    --border-radius: 25px;
    --border-radius-round: 50%;
    --base-font-size: 12px;
}

.stay-booking-form {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    background-color: var(--primary-bg-color);
    color: var(--primary-color);
    font-size: var(--base-font-size);
    box-shadow: 0px 8px 24px 0px rgba(var(--primary-color-rgb), 0.25);
    border-radius: var(--border-radius);
    width: 100vw;
    max-width: 300px;
    margin: 2rem auto;
    padding: 20px;
    position: relative;

    * {
        padding: 0;
        margin: 0;
    }

    .row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        &:not(:last-of-type) {
            margin-bottom: 1em;
        }

        .column {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: stretch;
            align-content: flex-start;

            &:first-of-type {
                align-content: flex-start;
                text-align: left;
            }
            &:last-of-type {
                align-content: flex-end;
            }
        }
    }

    .pseudo-input {
        width: calc(100% - 10px);
        border-radius: var(--border-radius);
        border: solid 1px var(--border-color);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 28px;
        padding: 5px;
        position: relative;

        &_date {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            background-color: rgba(var(--primary-color-lighter-rgb), 0);
            height: 100%;
            margin: 0;
            padding: 0 0 0 10px;
            border-radius: var(--border-radius); 
            transition: background-color 0.2s ease-out;
            .date {
                color: var(--primary-color);
                transition: color 0.2s ease-out;
     
            }
            &:hover {
                background-color: rgba(var(--primary-color-lighter-rgb), 1);
                .date {
                    color: var(--secondary-color);
                }
            }
        }

        .icon.icon-times {
            padding: 5px 10px;
            margin-bottom: 2px;
            fill: var(--primary-color-light);
        }

        // &.date-range {
        // }
    }

    .date {
        white-space: nowrap;
        margin: 2px 0 0 0;
        font-size: 1.2em;
        color: var(--primary-color);
    }

    .price {
        font-weight: bold;
        font-size: 1.5em;
        padding-left: 0.1em;
        margin-bottom: 0.2em;
    }

    .rating-wrapper {
        margin-bottom: 0.2em;
    }

    .btn {
        padding: 1em 1.4em;
        background-color: var(--tertiary-bg-color);
        color: var(--tertiary-color);
        border: 0;
        border-radius: var(--border-radius);
        font-weight: bold;
        cursor: pointer;

        &-icon {
            background: transparent;
            padding: 1em;
        }
    }
}

</style>