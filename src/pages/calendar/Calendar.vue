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
      <div v-show="inputtedDate">
        <todo-list
          :inputtedDate="inputtedDate"
        ></todo-list>
      </div>
      <!--Icon <div>Icons made by <a href="https://www.flaticon.com/authors/xnimrodx" title="xnimrodx">xnimrodx</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> -->
      <div class="date-none-modal" v-show="!inputtedDate">
        <p class="date-none-modal__text">날짜를 선택해주세요!</p>
      </div>
    </section>
    <section class="todo-flex action-buttons-wrap" v-show="inputtedDate">
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
        <button type="button" class="create-button button--calendar button--calendar-image" @click="goCreateTodo">
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
    inputtedDate (): any {
      // console.log(this.date);
      if (this.date != null) {
        return moment(this.date).format("YYYY-MM-DD");
      } else {
        return 0;
      }
    },
    today (): string {
      return moment(new Date()).format('DD')
    },
    calendar (): any {
      return this.$refs.calendar;
    }
  },
  created () {
    console.log(this.$route);
    (this.$route.params.todoDate !== undefined)&&this.resetDate();
    // console.log('created');
    // console.log('this.today',this.today);
  },
  beforeMount () {
    // console.log('beforeMount');
    // console.log('this.today',this.today);
  },
  mounted () {
    // console.log('mounted');
    // console.log('this.today',this.today);
  },
  beforeUpdate () {
    console.log('beforeUpdate-calendar');
    console.log(this.date);
    // console.log('this.date',this.date);
    // console.log('this.today',this.today);
  },
  methods: {
    goToday (): void {
      this.date = new Date();
      this.calendar.move(this.date);
    },
    goYesterday (): void {
      let startOfMonth : string = moment(this.date).startOf('month').format('YYYY-MM-DD');
      let step: number = 0;
      (this.inputtedDate == startOfMonth ) ? step = -1 : step = 0;
      this.date = moment(this.date).subtract(1, "day").toDate();
      this.goMonth(step);
    },
    goTomorrow (): void {
      let endOfMonth : string = moment(this.date).endOf("month").format("YYYY-MM-DD");
      let step: number = 0;
      (this.inputtedDate == endOfMonth ) ? step = 1 : step = 0;
      this.date = moment(this.date).add(1, "day").toDate();
      this.goMonth(step);
    },
    goMonth (step: number): void {
      // step: -1 이전 달, 0 이동 없음, 1 다음 달
      this.calendar.move(step, {
        transition: this.transition,
        position: this.position
      });
    },
    goCreateTodo (): void {
      let todo:any = {
        date : this.inputtedDate,
        path: 'create-todo',
        type: 'create'
      };
      this.$router.push({ name: "CreateEditTodo" , params: todo });
    },
    resetDate (): void{
      console.log(this.$route);
      let resetDate: any = moment(this.$route.params.todoDate);
      console.log('restDate', resetDate);
      console.log(typeof resetDate);
      this.date = resetDate._d;
    }
  }
});
</script>

<style scoped>
@import "./calendar.css"; 
</style>