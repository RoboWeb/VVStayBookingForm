<template>
  <div class="calendar-wrapper">
    <div class="pseudo-input month-switcher">
      <icon-chevron chevron="left" class="btn btn-icon" @click="$emit('prev')"></icon-chevron>
      <span class="date month-year">
        <span class="date_displaying date_displaying-month">
          {{ page.monthOfPage.month.long }}
        </span>
        <span class="date_displaying date_displaying-year">
          {{ page.monthOfPage.year }}
        </span>
      </span>
      <icon-chevron chevron="right" class="btn btn-icon" @click="$emit('next')"></icon-chevron>
    </div>
    <div class="week-days">
      <span class="week-days_day-name" v-for="day in now.weekDays.short">{{ day }}</span>
    </div>
    <div class="month">
      <div 
        class="month_day" 
        v-for="day in page.days"
        :class="{'is-prev-month': isPrevDate(day), 'is-next-moth': isNextDate(day), 'is-selected': isSelected(day), 'is-begin': isBegin(day), 'is-end': isEnd(day) }"
      >
        <span @click="setNewReservationDates(day)" >{{ day.day.numeric }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import DateTime from "./../services/datetime";
import { computed, reactive, onMounted } from 'vue';

export default {
  name: "Calendar",
  props: {
    page: {
      type: Object,
      required: true
    },
    reservation: {
      type: Object,
      default: { begin: null, end: null }
    }
  },
  emits: ['next', 'prev', 'change'],
  setup(props, { emit }) {
    const now = new DateTime();

    const monthIndex = computed(() => props.page.monthOfPage.monthIndex);
    const monthTimestamp = computed(() => props.page.monthOfPage.timestamp);
    const year = computed(() => props.page.monthOfPage.year);
    const reservation = reactive({...props.reservation});

    // when the accessibility feature will be available 
    const isAvailable = day => true;

    // is day between begin and end of reservation
    const isSelected = day => reservation.begin && reservation.end ? day.date >= reservation.begin.date && day.date <= reservation.end.date : false;
    const isBegin = day => reservation.begin ? day.date === reservation.begin.date : false;
    const isEnd = day => reservation.end ? day.date === reservation.end.date : false;
    const isPrevDate = day => day.timestamp < monthTimestamp.value && (day.year < year.value || day.month.index < monthIndex.value);
    const isNextDate = day => day.timestamp > monthTimestamp.value && (day.month.index > monthIndex.value || day.year > year.value);

    // methods
    const setNewReservationDates = newDate => {
      
      if (reservation.begin && reservation.end) {
        if (newDate.date < reservation.begin.date) reservation.begin = newDate;
        else if (newDate.date > reservation.end.date) reservation.end = newDate;
        else {
          reservation.begin = newDate;
          reservation.end = null;
        }
      } else if (reservation.end === null) {
        if (newDate.date > reservation.begin.date) {
          reservation.end = newDate;
        } else {
          reservation.end = reservation.begin;
          reservation.begin = newDate;
        }
      } else if (reservation.begin === null) {
        if (newDate.date < reservation.end.date) {
          reservation.begin = newDate;
        } else {
          reservation.end = reservation.begin;
          reservation.begin = newDate;
        }
      }
      emit('change', { begin: reservation.begin?.ISODate || null, end: reservation.end?.ISODate || null });
    }

    onMounted(() => {
      reservation.begin = props.reservation.begin;
      reservation.end = props.reservation.end;
    })

    return {
      now,
      isPrevDate,
      isNextDate,
      isSelected,
      isBegin,
      isEnd,
      setNewReservationDates,
      reservation
    };
  },
};
</script>

<style lang="scss" scoped>

.calendar-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  left: 0;
  right: 0;
  position: absolute;
  top: calc(100%);
  background-color: var(--primary-bg-color);
  color: var(--primary-color);
  font-size: var(--base-font-size);
  box-shadow: 0px 8px 24px 0px rgba(var(--primary-color-rgb), 0.25);
  border-radius: var(--border-radius);
  padding: 20px;
  .week-days,
  .month {
    display: grid; 
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr; 
    gap: 4px 0; 
    grid-template-areas: 
      ". . . . . . ."
      ". . . . . . ."
      ". . . . . . ."
      ". . . . . . ."
      ". . . . . . ."
      ". . . . . . ."; 
    
    &_day-name {
      color: var(--primary-color-light);
      margin-bottom: 10px;
    }
    &_day {
      padding: 8px 4px 5px 4px;
      position: relative;
      &.is-prev-month,
      &.is-next-moth,
      &.is-unavailable {
        color: var(--primary-color-lighter);
      }

      &::before,
      &::after {
        position: absolute;
        content: '';
        width: 50%;
        top: 0;
        bottom: 0;
        background-color: transparent;
        z-index: 1;
      }
      &::before {
        left: 0;
        right: unset;
      }
      &::after {
        left: unset;
        right: 0;
      }

      &:hover {
        &::after {
          border-radius: var(--border-radius-round);
          background-color: rgba(var(--primary-color-lighter-rgb), 0.6);
          right: 5px;
          width: 75%;
        }
      }

      &.is-selected {
        color: var(--secondary-color);
        &::before,
        &::after {
          content: '';
          background-color: rgba(var(--tertiary-bg-color-rgb), 0.1);
        }
        &::before {
          left: 0;
          width: 50%;
        }
        &::after {
          right: 0;
          width: 50%;
        }
      }
      &.is-begin {
        color: var(--tertiary-color) !important;
        &::before {
          border-radius: var(--border-radius-round);
          background-color: var(--tertiary-bg-color);
          width: 75%;
          left: 5px;
          z-index: 1;
        }
      }
      &.is-end {
        color: var(--tertiary-color) !important;
        &::after {
          border-radius: var(--border-radius-round);
          background-color: var(--tertiary-bg-color);
          width: 75%;
          right: 5px;
          z-index: 1;
        }
      }
      > span {
        position: relative;
        z-index: 10;
      }
    }
  }
}
.month-switcher {
  margin-bottom: 1em;
  .date {
    &_displaying {
      font-weight: bold;
      padding: 0 3px;
    }
  }
}
</style>
