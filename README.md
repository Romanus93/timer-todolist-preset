# Timer-Calendar-Todolist

> 일을 하거나 공부를 할 때, 타이머(시간측정)를 사용하면, 내가 얼마나 효율적으로 시간을 사용하고 있는지를 확인할 수 있습니다.  
> 저의 경우 그날 해야 될 것을 적어놓고, 스탑워치를 사용하여 '얼마나 집중했는지'를 기록합니다.  
> 이때 ‘Todolist와 Timer를 합치면 좋겠다’ 라는 생각을 하게 되었고, Timer-Todolist를 만들게 되었습니다.

## What i use

### Framework - [Vue3](https://v3.vuejs.org/)

[<img src="https://router.vuejs.org/logo.png" width="15%">](https://v3.vuejs.org/)

### Library - [Vue-Router](https://next.router.vuejs.org/) + [V-Calendar](https://vcalendar.io/) + [swiper](https://swiperjs.com/vue) + [momentJs](https://momentjs.com/) + [Typscript](https://www.typescriptlang.org/)

[<img src="https://router.vuejs.org/logo.png" width="15%">](https://next.router.vuejs.org/)
[<img src="https://vcalendar.io/hero.png" width="15%">](https://vcalendar.io/)
[<img src="https://github.surmon.me/images/common/swiper-logo.svg" width="15%">](https://swiperjs.com/vue)
[<img src="https://cdn.worldvectorlogo.com/logos/momentjs.svg" width="15%">](https://momentjs.com/)
[<img src="./src/assets/and-so-on/ts-logo-round-512.png" width="15%">](https://www.typescriptlang.org/)

### DB - [JSONPlaceholder](https://jsonplaceholder.typicode.com/)

## 목차

- 기능 (Features)
- 파일 구조 / component 등
- 설치 및 실행
  - 본 파일
  - 서버
- icon 이미지 등 - fontawsome, flaticon

## 설치 및 실행 방법 / Build Setup

```
  npm 6.X 사용자의 경우

  1. npm install -g npm@latest ( 7.x 대로 업그레이드 후 이용하시거나)
                    #### OR
  2. npm i @popperjs/core ( 6.x대에서는 지원이 안되므로, 따로 설치하셔야 합니다.)
```

```
  npm 7.x 사용자 경우

  npm install
  npm run dev
  npm run build
  npm run serve
```

```
  DB Json-server
  json-server --watch db.json -p 3005
                    #### OR
  npx json-server --watch db.json -p 3005( json-server: command not found라 출력시)
```

## structure

```
  src
    |---aseets
    |       |---images
    |
    |---componets
    |       |---timer-animation
    |       |         |--- TimerAnimation.vue
    |       |         |--- timer-animation.css
    |       |         |--- image-incoding.ts
    |       |
    |       |---todo-date
    |       |---todo-form
    |       |---todo-tiemr
    |       |---todoList
    |
    |---pages
    |       |---calnedar
    |       |       |---Calnedar.vue
    |       |       |---calnedar.css
    |       |
    |       |---create-edit-todo
    |       |---start-todo
    |
    |---router
    |---App.vue
    |---index.css
    |---main.ts
    |---shims-vue.d.ts

```

### 이미지 참고 사이트 - fontawsome , flaticon

![gif](./src/assets/99532F385A5305401B.gif)
<img src="./src/assets/99532F385A5305401B.gif" width="20%">

##### Live
