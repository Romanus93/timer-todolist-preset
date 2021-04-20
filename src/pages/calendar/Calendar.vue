<template>
  <div>
    <div class="calendar-wrapper">
      <v-date-picker 
        v-model="date"
        ref="calendar"
        color="blue"
        is-expanded
        :value="null"
        :transition="transition"
      ></v-date-picker>
    </div>
    <!-- 날짜 안내 모달 -->
    <div class="calendarModal" v-if="!getDay">
      <p>날짜를 선택해주세요!</p>
    </div>
    <!-- <div style="border: 1px solid blue; height: 300px" v-if="!getDay">
      
    </div> -->
    <todo-list
      v-else
      :date="date"
      :getDay="getDay"
      @goYesterday="goYesterday"
      @goTomorrow="goTomorrow"
<<<<<<< HEAD
      @goToday="goToday"
    ></Todolist>
=======
      @showToday="showToday"
    ></todo-list>

    <div class="todolist-component">
    <header class="header">
      <!-- 년-월-주일 달력이동 / 어제-내일 날짜 이동 메뉴버튼 -->
      <ul class="todo-flex nav">
        <li>
          <button class="button--yesterday" @click="goYesterday">
            <i class="fas fa-chevron-left"></i>
          </button>
        </li>
        <li>
          <button class="button--today" @click="showToday">
            <i class="far fa-calendar"></i>
            <span> {{ today }} </span>
          </button>
        </li>
        <li>
          <h2>
            {{ getDay }}
          </h2>
        </li>
        <li>
          <button class="button--tomorrow" @click="goTomorrow">
            <i class="fas fa-chevron-right"></i>
          </button>
        </li>
      </ul>
      <!-- 일정 생성 삭제 버튼 html 바까야함.div로 -->
    </header>
    </div>  
>>>>>>> design1
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import moment from "moment";
import TodoList from "../../components/todolist/TodoList.vue";

export default defineComponent({
  name: 'Calendar',
  components: { TodoList },
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
    today(): string {
      return moment(new Date()).format('mm')
    },
    calendar(): any {
      const calendars = this.$refs.calendar as object;
      return calendars;
    }
  },
  created() {
    console.log('calendar page - created');
    console.log(this.$route);
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
    showToday(): void {
      this.date = new Date();
      this.calendar.move(this.date);
    },
    selectDate(){
      console.error('selecDate');
      console.error(this.$route.params);
      if(this.$route.params.todoItemDate === undefined) {
        console.error('undefined');
        return;
      } else {
        const todoItemDate: any = moment(this.$route.params.todoItemDate);
        console.error('no undefined');
        console.log(todoItemDate._d);
        this.date = todoItemDate._d;
        return;
      }
    }
  }
});
</script>

<style scoped>
@import "./calendar-main.css";
</style>