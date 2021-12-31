<template>
  <div class="calendar-wrapper">
    <div class="pseudo-input month-switcher">
      <icon-chevron chevron="left" class="btn btn-icon"></icon-chevron>
      <span class="date month-year">
        <span class="date_displaying date_displaying-month">
          {{ displayingMonth }}
        </span>
        <span class="date_displaying date_displaying-year">
          {{ displayingYear }}
        </span>
      </span>
      <icon-chevron chevron="right" class="btn btn-icon"></icon-chevron>
    </div>
    <div class="week-days">
      <span class="week-days_day" v-for="day in now.weekDays.short">{{ day }}</span>
    </div>
    <div class="month">

    </div>
  </div>
</template>

<script>
import DateTime from "./../services/datetime";
import { reactive, ref, onMounted } from "vue";

export default {
  name: "Calendar",
  props: {
    begin: {
      type: String,
    },
    end: {
      type: String,
    },
    unavailable: {
      type: Array,
      default: [],
    },
  },
  setup(props) {
    const now = new DateTime();
    const calendarPage = ref([]);

    const WEEK_FIRST_INDEX = 1;

    const reservationBegin = new DateTime(props.begin);
    const reservationEnd = new DateTime(props.end);

    const displayingMonth = ref(reservationBegin.month.long);
    const displayingYear = ref(reservationBegin.year);

    // methods
    const prepareCalendarPage = () => {
      const monthFirstDayDateTime = new DateTime(reservationBegin.year, reservationBegin.month.index, 1, 12)

      console.log(monthFirstDayDateTime, monthFirstDayDateTime.ISODate)
      // let calendarPageFirstDayDate = monthFirstDayDate;
      // if (monthFirstDateTime.weekDayIndex < WEEK_FIRST_INDEX) {
      //   calendarPageFirstDayDate = new Date(
      //     monthFirstDateTime.year, 
      //     monthFirstDateTime.month.index, 
      //     monthFirstDateTime.day.numeric - (6 - monthFirstDateTime.weekDayIndex), 
      //     12
      //   );
      // } else if (monthFirstDateTime.weekDayIndex > WEEK_FIRST_INDEX) {
      //   calendarPageFirstDayDate = new Date(
      //     monthFirstDateTime.year, 
      //     monthFirstDateTime.month.index, 
      //     monthFirstDateTime.day.numeric - (monthFirstDateTime.weekDayIndex - 1), 
      //     12
      //   );
      // }
      // const calendarPageFirstDayDateTime = new DateTime(calendarPageFirstDayDate.toISOString());

      // console.log("calendarPageFirstDayDateTime", calendarPageFirstDayDateTime.ISODate)

      // let day,weekDayIndex = WEEK_FIRST_INDEX;
      // do {
      //   day = new Date(reservationBegin.year, reservationBegin.month.index, 1, 12)
      //   weekDayIndex++;
      //   if (weekDayIndex > 6) weekDayIndex = 0; 
      // } while (weekDayIndex === 0 && [28,29,30,31].includes(day))

    }

    // const getMonthLastDay = (dt) => {
    //   return new DateTime(d)
    // }

    onMounted(() => {
      prepareCalendarPage()
    })

    return {
      now,
      displayingMonth,
      displayingYear,
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

  .week-days {
    display: flex;
    flex-direction: row;
    width: calc(100% - 10px);
    justify-content: space-between;
    align-items: center;
    padding: 0 5px;

    &_day {
      color: var(--primary-color-light);
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
