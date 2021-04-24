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
      <!-- :date="date" -->
      <todo-list
        v-show="inputedDay"
        :inputedDay="inputedDay"
      ></todo-list>
      <!--Icon <div>Icons made by <a href="https://www.flaticon.com/authors/xnimrodx" title="xnimrodx">xnimrodx</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> -->
      <div class="date-none-modal" v-show="!inputedDay">
        <p class="date-none-modal__text">날짜를 선택해주세요!</p>
      </div>
    </section>
    <section class="todo-flex action-buttons-wrapper" v-show="inputedDay">
      <!--  어제,오늘,내일 이동 버튼과 todo 생성 버튼 -->
        <!--Icon <div>Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> -->
        <div>
          <button class="yesterday-button button--calendr button--calendar-image" @click="goYesterday">
            <i class="fas fa-arrow-left"></i>
          </button>
        </div>
        <div>
          <button class="today-button button--calendr button--calendar-image" @click="goToday">
            <span class="today"> {{ today }} </span>
          </button>
        </div>
        <div>
          <button class="tomorrow-button button--calendr button--calendar-image" @click="goTomorrow">
            <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      <div>
        <button class="create-button button--calendr button--calendar-image" @click="goCreateTodoPage">
          <i class="fas fa-plus"></i>
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
        console.log(this.date);
        return 0;
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
    console.log('calendar-page created');
    console.log('inputtedDay');
    console.log(this.inputedDay);
    (this.$route.params.dateOfTodoItem !== undefined)&&this.resetDate();
  },
  beforeUpdate () {
    console.log('calendar-page beforeUpdate');
    console.log('inputtedDay');
    console.log(this.inputedDay);
  },
  methods: {
    //type: string | null
    goToday(): void {
      console.log('today');
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