<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <icon-arrow></icon-arrow>
  <icon-chevron chevron="left"  ></icon-chevron>
  <icon-chevron chevron="right"  ></icon-chevron>
  <icon-star fill="green" filled="full"></icon-star>
  <icon-star fill="green" filled="half"></icon-star>
  <icon-star fill="green" filled="empty"></icon-star>
  <icon-times></icon-times>

  <div class="formatted-dates">
    <span>Begin: <strong>{{ getBeginDate.formattedDate }}</strong></span>
    <span>End: <strong>{{ getEndDate.formattedDate }}</strong></span>
  </div>

  <stay-booking-form 
    :price="price" 
    :ratings="ratings"
    :rating="rating"
    :reservation="reservation"
    @reserve="datesChanged"
  ></stay-booking-form>

</template>

<script>
import StayBookingForm from './components/StayBookingForm.vue';
import DateTime from './services/datetime';

export default {
  name: 'App',
  components: {
    StayBookingForm
  },
  data(){
    return {
      price: "298 zł",
      ratings: 123,
      rating: "3.2",
      reservation: {
        begin: "2022-01-12",
        end: "2022-01-20"
      },
      beginDate: '',
      endDate: ''
    }
  },
  computed: {
    getBeginDate() {
      return this.beginDate;
    },
    getEndDate() {
      return this.endDate;
    }
  },
  methods: {
    datesChanged(event) {
      this.beginDate = new DateTime(event.begin);
      this.endDate = new DateTime(event.end);
    }
  },
  mounted() {
    this.beginDate = new DateTime(this.reservation.begin);
    this.endDate = new DateTime(this.reservation.end);
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.formatted-dates {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  span {
    margin: 1rem;
  }
}

.icon {
    max-height: 11px;
    max-width: 11px;
    width: 100%;
    height: auto;
    text-align: center;

    &.icon-arrow,
    &.icon-chevron {
        &_right {
            transform: rotate(0);
        }
        &_left {
            transform: rotate(180deg);
        }
        &_up {
            transform: rotate(270deg);
        }
        &_down {
            transform: rotate(90deg);
        }   
    }

    &.icon-star {
      max-height: 13px;
      max-width: 13px;

      &_path { 
        opacity: 1; 

        &.path_02,
        &.path_03 {
          opacity: 0;
        }
      }

      &.full {
        .path_01 { opacity: 1; }
        .path_02, .path_03 { opacity: 0; }
      }

      &.half {
        .path_02 { opacity: 1; }
        .path_01, .path_03 { opacity: 0; }
      }

      &.empty {
        .path_03 { opacity: 1; }
        .path_01, .path_02 { opacity: 0; }
      }
    }
}
</style>
