#vue2.0 공부 3.0은 일단 가이드만 보면서...

# vue cdn
``<script src="https://cdn.jsdelivr.net/npm/vue"></script>``

# vue의 적용
el, data, methods를 가지고 script안에서 적용 (셋의 네이밍은 변경 불가)
el은 대상을 가르키는 것 같고...
data는 다룰 데이터의 변수와 값(상태) (중요, 데이터중심사고) / react의 state와 같은 개념으로 파악
methods는 동적인 것을 다루는 말 그대로 method들의 집합

# v-on:click
자바스크립트의 onclick과 같은 역할을 하는 듯..
자바스크립트로된 코드도 적용이 됨 Ex)onClick()

# v-if, v-else, v-else-if
v-if, v-else, v-else-if 를 통해 상태변경가능.
형제 태그면서 인접해야 성립한다함.

# 보간법
data에 등록한 변수를 {{first}} 이런식으로 표시가능 

# v-on
이벤트리스너

**submit시 e.preventDefault()를 적용하여 페이지 새로고침 방지

# v-model
입력할 값과 data에 만들어논 변수를 연결할때 사용
양방향 바인딩

# ref를 이용한 포커싱
``
적용할 input태그에
<input type="text" ref="answer" v-model="value">
``
<br><br>
``
Vue의 methods부분에
this.$ref.answer.focus();
``

# 작명 Case
ex) wordrelay
WordRelay => PascalCase
wordRelay => camelCase
word-relay = > kebab-case

# 반복되는 작업엔 Component
Vue.component('word-relay',{
  template:``,
  data() {return data값},
  methods: {},
}

컴포넌트는 인스턴스보다는 위에 위치
스크립트는 div#root보다는 아래에 위치


vue사용시 html단에는 케밥케이스 사용해야하함
스크립트단에서는 다른 케이스 가능 

# npm 을 이용한 설치
npm i vue

# webpack 
npm i webpack webpack-cli -D
여기서 -D 는 개발시에만 쓰겠다는 뜻이라함 === --save-dev
스크립트의 정리를(?) 위해서 사용한다함

# webpack 설정
기본적으로 entry, module, plugins, output 등이 들어감
entry에서 시작, 모르는 것을 만나면 module에 rules가 대신 처리, 그 후 처리를 할게 있으면 plugins, output에 결과

기본적으로 js만 처리해서
자바스크립트가 아닌 다른 확장자를 가진 파일을 처리하기 위해 module의 rules에 확장자와 loader를 추가해야함
npm i vue-loader -D

webpack에서는 node환경이기에 require로 불러오고
main.js에서는 vue환경이기에 import로 불러옴...

npm i vue-template-compiler -D

특정 버전을 깔기 위해선 npm i vue@2.7.0 이런식으로 설치하면됨

추가적으로 mode, devtool, resolve 같은 게 있음
mode : 개발시에는 'development', 배포시에는 'production'
devtool: 개발시에는 'eval', 배포시에는 'hidden-source-map'  eval하면 빌드속도가 빠르다함
resolve: 확장자처리를 한다함 

# v-for
반복처리,
v-bind:key가 있어야 에러가 안뜸

# @submit.prevent

`v-on:submit="onSubmitForm" 과 해당 메소드에 넣어줘야하는  e.preventDefault(); `
를 간단하게 표현할수있게해줌

# v-bind: 줄이기
예를 들어 v-bind:class="data" => :class="data" 이래도 같음

# vue에서 style사용시
npm i vue-style-loader -D
npm i css-loader -D

webpack module의 rules에 test: /\.css$/,  및 use로 vue-style-loader와 css-loader를 추가해줘야함

sass less 같은 것을 추가할때도 loader는 계속 추가해줘야한다함

style태그에 scoped 속성을 먹이면 해당 vue파일에서만 적용되고 다른 vue파일에서 
같은 아이디나 클래스가 존재하더라도 적용 안된다고함.

# 자동새로고침 및 변경적용 (webpack-dev-server)
webpack --watch의 업그레이드?

npm i -D webpack-dev-server

webpack output설정에 publicPath를 추가해야함

localhost:8080/파일명.html로 확인가능

실제 파일을 생성하지않고 메모리에 생성하여 사용 (좀 더 알아봐야할듯..)


# computed
1. 템플릿 내에서 너무 많은 연산을 하면 코드가 비대해지고 유지보수가 어려운데
이를 해결하기위해 사용. 성능최적화관련, 계산부분은 computed로 하는게 나음.
2. computed 속성은 종속대상에 따라 캐싱되므로 종속된 대상이 변경될 때만 함수를 실행해서 원하지않은 실행을 막을 수 있음. 원하지않는 경우 그냥 메소드 사용하면됨

https://kr.vuejs.org/v2/guide/computed.html

# v-show
v-show와 v-if
둘 다 조건이 true일 경우 보여짐
v-show는 태그와 형태가 존재, display: none일 뿐임
v-if는 태그자체가 존재하지않고 `<!--->` 같은 주석처리가 되어있음
보통 v-if를 많이 쓰는듯함.

# vue devtools - 크롬 확장프로그램
vue 관련한 정보 및 디버깅 
배포 환경에서는 vue-devtools를 못보게 해야 보안에 좋음.
Vue.config.devtools = false;

# vue lifeCycle 
created -> mounted -> updated -> destroyed (before제외시)

created = 컴포넌트가 보여지긴하지만 화면에 나타나기전 (준비)
mounted = 컴포넌트가 보여지고 화면에 나타난후
updated = 화면이 바뀌어서 다시 그려질때
destroyed = 화면에 있다가 사라질때