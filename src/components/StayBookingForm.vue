<template>
    <div class="stay-booking-form">
        <div class="row">
            <div class="column">
                <span class="price">{{ price }}</span>
                <div class="rating-wrapper">
                    <span>rating stars</span>
                    <span class="rating-count">{{ ratings }}</span>
                </div>
            </div>
            <div class="column">
                <button id="reserveBtn" class="btn btn-tertiary">Reserve</button>
            </div>
        </div>
        <div class="row">
            <div class="pseudo-input date-range">
                <div class="date-range_begin pseudo-input_date">
                    <span class="date">{{ reservation.begin }}</span>
                    <icon-times></icon-times>
                </div>
                <icon-arrow></icon-arrow>
                <div class="date-range_end pseudo-input_date">
                    <span class="date">{{ reservation.end }}</span>
                    <icon-times></icon-times>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
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
        reservation: {
            type: Object,
            required: true,
            validator: (value) => value.begin && value.end
        }

    }
}

</script>

<style lang="scss" >
:root .stay-booking-form {
    --primary-bg-color: #FFFFFF;
    --primary-color: #373737;
    --primary-color-light: #9E9E9E;
    --primary-color-lighter: #D8D8D8;
    --tertiary-bg-color: #4E9845;
    --tertiary-color: #EDF4EC;
    --secondary-bg-color: #EDF5EC;
    --secondary-color: #67A65F;
    --border-color: #E1E1E1;
    --border-color-active: #D2E5D0;
    --border-radius: 25px;
    --border-radius-round: 50%;
}

.stay-booking-form {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    background-color: var(--primary-bg-color);
    color: var(--primary-color);
    font-size: 12px;
    box-shadow: 0px 8px 24px 0px rgba(66, 68, 90, 0.25);
    border-radius: var(--border-radius);
    width: 100vw;
    max-width: 360px;
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
        width: 100%;
        border-radius: var(--border-radius);
        border: solid 1px var(--border-color);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 40px;

        // > * { background-color: lightblue;}

        &_date {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: baseline;            
        }
    }

    .date {
        white-space: nowrap;
        padding: 5px;
    }
}

</style>