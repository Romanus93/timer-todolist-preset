<template>
  <main class="calendar-page todo-flex">
    <section class="v-calendar-component">
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
    <section class="todolist-component">
      <div v-show="inputedDay">
        <todo-list
          :inputedDay="inputedDay"
        ></todo-list>
      </div>
      <!--Icon <div>Icons made by <a href="https://www.flaticon.com/authors/xnimrodx" title="xnimrodx">xnimrodx</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> -->
      <div class="date-none-modal" v-show="!inputedDay">
        <p class="date-none-modal__text">날짜를 선택해주세요!</p>
      </div>
    </section>
    <section class="todo-flex action-buttons-wrap" v-show="inputedDay">
        <!--Icon <div>Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> -->
        <div>
          <button type="button" class="yesterday-button button--calendar button--calendar-image" @click="goYesterday">
            <i class="fas fa-arrow-left"></i>
          </button>
        </div>
        <div>
          <button type="button" class="today-button button--calendar button--calendar-image" @click="goToday">
            <span class="today"> {{ today }} </span>
          </button>
        </div>
        <div>
          <button type="button" class="tomorrow-button button--calendar button--calendar-image" @click="goTomorrow">
            <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      <div>
        <button type="button" class="create-button button--calendar button--calendar-image" @click="goCreateTodoPage">
          <i class="fas fa-plus"></i>
        </button>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import moment from "moment";
import TodoList from "/src/components/todolist/TOdolist.vue"

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
        return 0;
      }
    },
    today(): string {
      console.log('computed today');
      return moment(new Date()).format('DD')
    },
    calendar(): any {
      // const calendars = this.$refs.calendar as object;
      return this.$refs.calendar;
    }
  },
  created() {
    (this.$route.params.dateOfTodoItem !== undefined)&&this.resetDate();
    // console.log('created');
    // console.log('this.today',this.today);
  },
  beforeMount() {
    // console.log('beforeMount');
    // console.log('this.today',this.today);
  },
  mounted() {
    // console.log('mounted');
    // console.log('this.today',this.today);
  },
  beforeUpdate() {
    // console.log('beforeUpdate');
    // console.log('this.date',this.date);
    // console.log('this.today',this.today);
  },
  methods: {
    //type: string | null
    goToday(): void {
      this.date = new Date();
      this.calendar.move(this.date);
      console.log('goToday');
      let today = moment(this.date).format("YYYY-MM-DD");
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
      let todoItem:any = {
        date : this.inputedDay,
        path: 'create-todo',
        type: 'create'
      };
      this.$router.push({ name: "CreateEditTodo" , params: todoItem });
    },
    resetDate(){
      const resetDateOfTodoItem: any = moment(this.$route.params.dateOfTodoItem);
      this.date = resetDateOfTodoItem._d;
      return;
    }
  }
});
</script>

<style scoped>
@import "./calendar.css"; 
</style>