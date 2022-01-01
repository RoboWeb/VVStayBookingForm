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
      <span 
        class="month_day" 
        v-for="day in page.days"
        :class="{'is-prev-month': isPrevDate(day), 'is-next-moth': isNextDate(day), 'is-selected': isSelected(day) }"
      >
        {{ day.day.numeric }}
      </span>
    </div>
  </div>
</template>

<script>
import DateTime from "./../services/datetime";
import { computed } from "vue";

export default {
  name: "Calendar",
  props: {
    page: {
      type: Array,
      required: true
    },
  },
  setup(props) {
    const now = new DateTime();

    const month = props.page.month;
    const reservation = props.page.reservation;

    // when the accessibility feature will be available 
    const isAvailable = day => true;

    // is day between begin and end of reservation
    const isSelected = day => day.date >= reservation.begin.date && day.date <= reservation.end.date;
    const isBegin = day => day.date === reservation.begin.date;
    const isEnd = day => day.date === reservation.end.date;
    const isPrevDate = day => day.timestamp < month.timestamp && (day.year < month.year || day.month.index < month.month.index);
    const isNextDate = day => day.timestamp > month.timestamp && (day.month.index > month.month.index || day.year > month.year); 

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
    gap: 0px 5px; 
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
      padding: 5px 0;
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
