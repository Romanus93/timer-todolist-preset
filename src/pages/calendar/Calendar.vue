<template>
  <div class="calendar-page todo-flex">
    <section class="calendar-wrapper">
      <v-date-picker 
        v-model="date"
        ref="calendar"
        color="blue"
        locale="en-US"
        is-expanded
        trim-weeks
        :value="null"
        :transition="transition"
      ></v-date-picker>
    </section>
    <section class="todolist-wrapper">
      <todo-list
        v-show="inputedDay"
        :date="date"
        :inputedDay="inputedDay"
      ></todo-list>
      <div class="date-none-modal" v-show="!inputedDay">
        <p>날짜를 선택해주세요!</p>
      </div>
    </section>
    <section class="todo-flex action-buttons-wrapper" v-show="inputedDay">
      <!--  어제,오늘,내일 날짜 이동 버튼 -->
      <div class="todo-flex nav-buttons-wrapper">
        <div>
          <button class="yesterday-button" @click="goYesterday">
            <i class="fas fa-chevron-left"></i>
          </button>
        </div>
        <div>
          <button class="today-button" @click="goToday">
            <i class="far fa-calendar"></i>
            <span class="today"> {{ today }} </span>
          </button>
        </div>
        <div>
          <button class="tomorrow-button" @click="goTomorrow">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
      <div class="todo-flex create-button-wrapper">
        <button class="create-button" @click="goCreateTodoPage">
          <span>Add new  </span><span><i class="fas fa-plus"></i></span>
        </button>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import moment from "moment";
import TodoList from "../../components/todoList/TodoList.vue"

export default defineComponent({
  name: 'Calendar',
  components: { TodoList },
  data() {
    return {
      date: new Date() as object,
      position: 1,
      transition: "slide-v",
      calendarView: false
      //'slide-h', 'slide-v', 'fade', 'none' 중 선택 가능. default slide-h
    };
  },
  computed: {
    inputedDay(): any {
      if (this.date != null) {
        return moment(this.date).format("YYYY-MM-DD");
      } else {
        return this.date;
      }
    },
    today(): string {
      return moment(new Date()).format('DD')
    },
    calendar(): any {
      // const calendars = this.$refs.calendar as object;
      return this.$refs.calendar;
    }
  },
  created() {
    (this.$route.params.dateOfTodoItem !== undefined)&&this.resetDate();
  },
  methods: {
    //type: string | null
    goToday(): void {
      this.date = new Date();
      this.calendar.move(this.date);
    },
    goYesterday(): void {
      const startOfMonth : string = moment(this.date).startOf('month').format('YYYY-MM-DD');
      let step: number = 0;
      (this.inputedDay == startOfMonth ) ? step = -1 : step = 0;
      this.date = moment(this.date).subtract(1, "day").toDate();
      this.goMonth(step);
    },
    goTomorrow(): void {
      const endOfMonth : string = moment(this.date).endOf("month").format("YYYY-MM-DD");
      let step: number = 0;
      (this.inputedDay == endOfMonth ) ? step = 1 : step = 0;
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
    goCreateTodoPage(): void {
      this.$router.push({ name: "CreateTodo" , params: { dateOfTodoItem: this.inputedDay }});
    },
    resetDate(){
      //
      const resetDateOfTodoItem: any = moment(this.$route.params.dateOfTodoItem);
      console.log('function-init');
      console.log(this.date);
      this.date = resetDateOfTodoItem._d;
      console.log(this.date);
      return;
    }
  }
});
</script>

<style scoped>
@import "./calendar.css";
</style>