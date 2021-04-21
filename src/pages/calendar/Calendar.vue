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
    <div class="calendarModal" v-show="!getDay">
      <p>날짜를 선택해주세요!</p>
    </div>
    <todo-list
      v-show="getDay"
      :date="date"
      :getDay="getDay"
    ></todo-list>
    <div class="todolist-component" v-show="getDay">
    <footer class="footer">
      <ul class="todo-flex buttons-wrapper">
        <li>
          <button class="button--create" @click="goCreateTodoPage">
            Add new <i class="fas fa-plus"></i>
          </button>
        </li>
      </ul>
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
    </footer>
    </div>  
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
      transition: "slide-h",
      calendarView: false
      //'slide-h', 'slide-v', 'fade', 'none' 중 선택 가능. default slide-h
    };
  },
  computed: {
    getDay(): any {
      if (this.date != null) {
        const today = moment(this.date).format("YYYY-MM-DD");
        return today;
      } else {
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
    (this.$route.params.dateOfTodoItem !== undefined)&&this.initDate();
  },
  methods: {
    //type: string | null
    goToday(): void {
      this.date = new Date();
      this.calendar.move(this.date);
    },
    goYesterday(): void {
      // eslint-disable-next-line
      const startOfMonth : string = moment(this.date).startOf('month').format('YYYY-MM-DD');
      let step: number = 0;
      // eslint-disable-next-line
      (this.getDay == startOfMonth ) ? step = -1 : step = 0;
      // eslint-disable-next-line
      this.date = moment(this.date).subtract(1, "day").toDate();
      this.goMonth(step);
    },
    goTomorrow(): void {
      // eslint-disable-next-line
      const endOfMonth : string = moment(this.date).endOf("month").format("YYYY-MM-DD");
      let step: number = 0;
      // eslint-disable-next-line
      (this.getDay == endOfMonth ) ? step = 1 : step = 0;
      // eslint-disable-next-line
      this.date = moment(this.date).add(1, "day").toDate();
      this.goMonth(step);
    },
    goMonth(step: number): void {
      console.log(`goMonth-step ${step}`);
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
    goCreateTodoPage(): void {
      this.$router.push({ name: "CreateTodo" , params: { dateOfTodoItem: this.getDay }});
    },
    initDate(){
      const dateOfTodoItem: any = moment(this.$route.params.dateOfTodoItem);
      this.date = dateOfTodoItem._d;
      return;
    }
  }
});
</script>

<style scoped>
@import "./calendar.css";
</style>