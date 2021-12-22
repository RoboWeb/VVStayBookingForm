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
        <div class="row"></div>
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
        }

    }
}

</script>

<style lang="scss">
* {
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
}

</style>