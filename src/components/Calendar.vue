<template>
    <div class="calendar-wrapper">
        <div class="pseudo-input month-switcher">
            <icon-chevron chevron="left"  ></icon-chevron>
            <span class="date month-year">
                January 2022
            </span>
            <icon-chevron chevron="right"  ></icon-chevron>
        </div>
    </div>
</template>

<script>
import DateTime from './../services/datetime';

export default {
    name: 'Calendar',
    props: {
        begin: {
            type: Object
        },
        end: {
            type: Object
        },
        unavailable: {
            type: Array,
            default: []
        }
    },
    setup(props) {
        const current = new DateTime('');

        console.log('current', current.formatedDate);
    }
}
</script>