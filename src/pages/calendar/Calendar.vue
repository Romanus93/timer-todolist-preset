<template>
  <div>
    <div class="calendar-wrapper">
      <v-date-picker 
        v-model="date"
        :value="null"
        color="blue"
        :transition="transition"
        is-expanded
        ref="calendar"
      />
    </div>
    <!-- 날짜 안내 모달 -->
    <div class="calendarModal" v-if="!getDay">
      <p>날짜를 선택해주세요!</p>
    </div>
    <!-- <div style="border: 1px solid blue; height: 300px" v-if="!getDay">
      
    </div> -->
    <Todolist
      v-else
      :date="date"
      :getDay="getDay"
      @goYesterday="goYesterday"
      @goTomorrow="goTomorrow"
      @goToday="goToday"
    ></Todolist>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import moment from "moment";
import Todolist from "../../components/todolist/Todolist.vue";

export default defineComponent({
  name: 'Calendar',
  components: { Todolist },
  data() {
    return {
      date: new Date() as object,
      position: 1,
      transition: "slide-h",
      calendarView: false
      //'slide-h', 'slide-v', 'fade', 'none' 중 선택 가능. default slide-h
    };
  },
  computed: {
    getDay(): string | null {
      if (this.date != null) {
        const today = moment(this.date).format("YYYY-MM-DD");
        return today;
      } else {
        console.log('Calednar-Page Computed-Getday',this.date);
        return this.date;
      }
    },
    calendar(): any {
      const calendars = this.$refs.calendar as object;
      return calendars;
    }
  },
  created() {
    console.log('calendar page - created');
    this.selectDate();
  },
  methods: {
    goToday(): void {
      this.date = new Date();
      this.calendar.move(this.date);
    },
    goYesterday(step: number): void {
      // eslint-disable-next-line
      this.date = moment(this.date).subtract(1, "day").toDate();
      this.goMonth(step);
    },
    goTomorrow(step: number): void {
      // eslint-disable-next-line
      this.date = moment(this.date).add(1, "day").toDate();
      this.goMonth(step);
    },
    goMonth(step: number): void {
      // step: -1 이전 달, 0 이동 없음, 1 다음 달
      this.calendar.move(step, {
        transition: this.transition,
        position: this.position
      });
    },
    selectDate(){
      if(this.$route.params.todolistDate == undefined) {
        return;
      } else {
        const todolistDate: any = moment(this.$route.params.todolistDate);
        console.log(todolistDate._d);
        this.date = todolistDate._d;
        return;
      }
    }
  }
});
</script>

<style scoped>
@import "./calendar-main.css";
</style>