# Timer-Calendar-Todolist
> 저는 그날 해야 될 것을 적어놓고, 스탑워치를 사용하여 '얼마나 했는지'를 기록합니다.  
> 이때 ‘Todolist와 Timer를 합치면 좋겠다’ 라는 생각을 하게 되었고, Timer-Todolist를 만들게 되었습니다.

## What i use

### Front - [Vue3](https://v3.vuejs.org/) + [Vue-Router](https://next.router.vuejs.org/) + [V-Calendar](https://vcalendar.io/) + [swiper](https://swiperjs.com/vue) + [momentJs](https://momentjs.com/) + [Typscript](https://www.typescriptlang.org/)

[<img src="https://router.vuejs.org/logo.png" width="15%">](https://next.router.vuejs.org/)
[<img src="https://vcalendar.io/hero.png" width="15%">](https://vcalendar.io/)
[<img src="https://github.surmon.me/images/common/swiper-logo.svg" width="15%">](https://swiperjs.com/vue)
[<img src="https://cdn.worldvectorlogo.com/logos/momentjs.svg" width="15%">](https://momentjs.com/)
[<img src="./src/assets/and-so-on/ts-logo-round-512.png" width="15%">](https://www.typescriptlang.org/)

### DB - [JSONPlaceholder](https://jsonplaceholder.typicode.com/) + [Axios](https://github.com/axios/axios)

## 목차(Table of contents)

- 실행 (Getting started)
  - 본 파일 (Main)
  - 서버 (Json-Server)
- 구조 (Structure)
- 기능 (Features)
- 이미지 저작권 (Image Copyright)

## 실행(Getting started)

```
  npm 6.X 사용자의 경우

  1. npm install -g npm@latest ( 7.x 대로 업그레이드 후 이용하시거나)
                    #### OR
  2. npm i @popperjs/core ( 6.x대에서는 지원이 안되므로, 따로 설치하셔야 합니다.)
```

```
  npm 7.x 사용자 및 @popperjs/core 설치 이후

  npm install
  npm run dev
  npm run build
  npm run serve
```

```
  DB typicode/Json-Server
  json-server --watch db.json -p 3005
                    #### OR
  npx json-server --watch db.json -p 3005( json-server: command not found라 출력시)
```

## 구조(Structure)

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

## 기능(Feature)

### 1.타이머 애니메이션

|                 20초 이상                  |                 10초~20초                  |                  5초~10초                  |                  0초~5초                   |                목표 달성 시                |                목표 실패 시                |
| :----------------------------------------: | :----------------------------------------: | :----------------------------------------: | :----------------------------------------: | :----------------------------------------: | :----------------------------------------: |
| ![timer](./src/assets/gif/timer/7-1-1.gif) | ![timer](./src/assets/gif/timer/7-1-2.gif) | ![timer](./src/assets/gif/timer/7-1-3.gif) | ![timer](./src/assets/gif/timer/7-1-4.gif) | ![timer](./src/assets/gif/timer/7-1-5.gif) | ![timer](./src/assets/gif/timer/7-1-6.gif) |

### 2.session-storage 활용

#### 타이머의 행동(정지,시작,종료)과 시간값을 세션에 저장하여, 페이지가 새로 렌더링 되더라도 사용중인 타이머 상태를 유지

|                          Timer                           |
| :------------------------------------------------------: |
| ![timer](./src/assets/gif/session/8-3-session-timer.gif) |

#### Named Routes를 이용하여 컴포너트의 재사용성을 높이고,세션에 저장하여 페이지가 새로 렌더링 되더라도 사용중인 페이지를 유지

|                     Todo 생성 페이지                      |
| :-------------------------------------------------------: |
| ![timer](./src/assets/gif/session/8-1-session-create.gif) |

|                    Todo 수정 페이지                     |
| :-----------------------------------------------------: |
| ![timer](./src/assets/gif/session/8-2-session-edit.gif) |

### 3.생성,수정,삭제

|                    Todo 생성                     |                  Todo 수정                   |                    Todo 삭제                     |
| :----------------------------------------------: | :------------------------------------------: | :----------------------------------------------: |
| ![timer](./src/assets/gif/create/3-1-create.gif) | ![timer](./src/assets/gif/edit/4-1-edit.gif) | ![timer](./src/assets/gif/delete/5-1-delete.gif) |

### 4.읽기(Todo 있을 경우 - 없을 경우에 따른 화면 처리)

|                 Todo 없을 경우                  |                Todo 있을 경우                |                    Swipe                     |
| :---------------------------------------------: | :------------------------------------------: | :------------------------------------------: |
| ![timer](./src/assets/gif/item/1-1-no-item.gif) | ![timer](./src/assets/gif/item/1-2-item.gif) | ![timer](./src/assets/gif/swipe/6-swipe.gif) |

### 5.날짜 이동 버튼

|             다음 날짜로 이동              |               전 날짜로 이동               |            오늘 날짜로 이동            |
| :---------------------------------------: | :----------------------------------------: | :------------------------------------: |
| ![date](./src/assets/gif/date/2-1-to.gif) | ![date](./src/assets/gif/date/2-1-yes.gif) | ![date](./src/assets/gif/date/2-2.gif) |

|                월 이동                 |              팝업 캘린더               |             날짜 선택 모달             |
| :------------------------------------: | :------------------------------------: | :------------------------------------: |
| ![date](./src/assets/gif/date/2-3.gif) | ![date](./src/assets/gif/date/2-5.gif) | ![date](./src/assets/gif/date/2-4.gif) |

### 6.기타

|                 Todo 입력 모달                  |                      날짜 변경                      |                      Home-btn                      |
| :---------------------------------------------: | :-------------------------------------------------: | :------------------------------------------------: |
| ![timer](./src/assets/gif/create/3-3-modal.gif) | ![timer](./src/assets/gif/edit/4-2-change-date.gif) | ![timer](./src/assets/gif/create/3-4-home-btn.gif) |

|       반응형(w: 320 - 768, h: 568 - 1024)        |                      반응형                      |
| :----------------------------------------------: | :----------------------------------------------: |
| ![timer](./src/assets/gif/responsive/9-1-re.gif) | ![timer](./src/assets/gif/responsive/9-2-re.gif) |

## 이미지 저작권 (Image Copyright)

흰 달걀 / White Egg  
https://www.flaticon.com/free-icon/egg_528166?related_id=528166  
Using it for web? Copy this link in your website: 
`<div>Icons made by <a href="https://www.flaticon.com/authors/those-icons" title="Those Icons">Those Icons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>`
금이간 달걀 / Craked Egg  
https://www.flaticon.com/free-icon/egg_812870?term=egg&related_id=812870  
Using it for web? Copy this link in your website: 
`<div>Icons made by <a href="https://www.flaticon.com/authors/those-icons" title="Those Icons">Those Icons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>`
깨진 달걀 / Broken Egg  
https://www.flaticon.com/free-icon/egg_817324  
Using it for web? Copy this link in your website: 
`<div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>`
부화되기 전 / Born-Egg  
https://www.flaticon.com/free-icon/egg_812920?term=egg%20crack&related_id=812920  
Using it for web? Copy this link in your website:
`<div>Icons made by <a href="https://www.flaticon.com/authors/those-icons" title="Those Icons">Those Icons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>`
병아리 / Chick  
https://www.flaticon.com/free-icon/hatch_2663015?term=chick&page=1&position=11&page=1&position=11&related_id=2663015&origin=search  
Using it for web? Copy this link in your website:
`<div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>`
두루마리 / Roll-Out  
https://www.flaticon.com/free-icon/roll-out_4334338?term=roll%20out&related_id=4334338  
Using it for web? Copy this link in your website:
`<div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>`
달력 / Calendar-Page  
https://www.flaticon.com/free-icon/calendar_1827278?term=calendar&page=3&position=65&page=3&position=65&related_id=1827278&origin=search  
Using it for web? Copy this link in your website: 
`<div>Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>`
경고 달력 / Warning-Calendar  
https://www.flaticon.com/free-icon/calendar_4267533?term=calendar%20warning&page=1&position=2&page=1&position=2&related_id=4267533&origin=style  
Using it for web? Copy this link in your website:
`<div>Icons made by <a href="https://www.flaticon.com/authors/xnimrodx" title="xnimrodx">xnimrodx</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>`
