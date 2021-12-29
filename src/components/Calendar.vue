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

    const reservationBegin = new DateTime(props.begin);
    const reservationEnd = new DateTime(props.end);

    const displayingMonth = ref(reservationBegin.month.long);
    const displayingYear = ref(reservationBegin.year);

    console.log({
      now: now.formatedDate,
      begin: reservationBegin.formatedDate,
      now_timestamp: now.timestamp,
      begin_timestamp: reservationBegin.timestamp,
      now_date: new Date(now.timestamp),
      begin_date: new Date(reservationBegin.timestamp),
    });

    return {
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
}
.month-switcher {
  .date {
    &_displaying {
      font-weight: bold;
      padding: 0 3px;
    }
  }
}
</style>
