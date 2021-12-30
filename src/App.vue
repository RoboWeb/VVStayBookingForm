<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <icon-arrow></icon-arrow>
  <icon-chevron chevron="left"  ></icon-chevron>
  <icon-chevron chevron="right"  ></icon-chevron>
  <icon-star fill="green" filled="full"></icon-star>
  <icon-star fill="green" filled="half"></icon-star>
  <icon-star fill="green" filled="empty"></icon-star>
  <icon-times></icon-times>

  <div>
    {{ getDate.formattedDate }}
  </div>

  <stay-booking-form 
    :price="price" 
    :ratings="ratings"
    :rating="rating"
    :reservation="reservation"
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
      date: ''
    }
  },
  computed: {
    getDate() {
      return this.date;
    }
  },
  mounted() {
    this.date = new DateTime(this.reservation.begin);
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
