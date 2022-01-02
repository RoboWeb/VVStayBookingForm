<template>
  <div class="calendar-wrapper">
    <div class="pseudo-input month-switcher">
      <icon-chevron chevron="left" class="btn btn-icon"></icon-chevron>
      <span class="date month-year">
        <span class="date_displaying date_displaying-month">
          {{ page.month.month.long }}
        </span>
        <span class="date_displaying date_displaying-year">
          {{ page.month.year }}
        </span>
      </span>
      <icon-chevron chevron="right" class="btn btn-icon"></icon-chevron>
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
        <span>{{ day.day.numeric }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import DateTime from "./../services/datetime";

export default {
  name: "Calendar",
  props: {
    page: {
      type: Object,
      required: true
    },
  },
  setup(props) {
    const now = new DateTime();

    const monthIndex = props.page.month.index;
    const monthTimestamp = props.page.month.timestamp;
    const year = props.page.month.year;
    const reservation = props.page.reservation;

    // when the accessibility feature will be available 
    const isAvailable = day => true;

    // is day between begin and end of reservation
    const isSelected = day => day.date >= reservation.begin.date && day.date <= reservation.end.date;
    const isBegin = day => day.date === reservation.begin.date;
    const isEnd = day => day.date === reservation.end.date;
    const isPrevDate = day => day.timestamp < monthTimestamp && (day.year < year || day.month.index < monthIndex);
    const isNextDate = day => day.timestamp > monthTimestamp && (day.month.index > monthIndex || day.year > year); 

    return {
      now,
      isPrevDate,
      isNextDate,
      isSelected,
      isBegin,
      isEnd
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
  top: calc(100% + 1em);
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
    // grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr; 
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
      &.is-prev-month,
      &.is-next-moth,
      &.is-unavailable {
        color: var(--primary-color-lighter);
      }
      &.is-selected {
        position: relative;
        color: var(--secondary-color);
        &::before,
        &::after {
          position: absolute;
          content: '';
          width: 50%;
          top: 0;
          bottom: 0;
          background-color: rgba(var(--tertiary-bg-color-rgb), 0.1);
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
