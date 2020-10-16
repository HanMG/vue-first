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

vue에선 PascalCase를 kebab-case로 자동으로 바뀌어 인식

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
data에 추가적인 계산이나 작업을 할때 사용
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

# vue 스타일가이드
컴포넌트명은 두단어 이상의 합성 이어야한다, for와 if를 같이 쓰면 안된다, for에는 key를 바인딩 해야된다. 등등의 가이드
우선순위 A,B는 지킬수있도록
https://kr.vuejs.org/v2/style-guide/index.html

# props
부모컴포넌트에서 자식컴포넌트로 값을 전달할때 쓰임,
받은 데이터를 가지고 가공은 가능하지만 부모데이터는 변경이 안되있으므로 그렇게 사용 X,
올바른 방법은 데이터를 바꾸는 부모의 메서드를 자식에게 props로 전달하면 된다함.

# 다른 컴포넌트 불러오기
script태그에 import로 불러오고
export default 부분에 component에 등록해야함

# watch
Data 변수의 값이 바뀔때 비동기로 동작
ex) data(value, oldValue){} value = 현재 값, oldValue = 이전 값
순서가 꼬이기 쉬우니 최대한 쓰지 않도록 하는게 나음

# $root, $parent
this.$root.$data를 통해 최상위 부모 컴포넌트의 데이터에 접근 할 수 있고,
this.$parent.$data를 통해 부모 컴포넌트의 데이터에 접근 할 수 있다.

# index를 사용한 값의 변경 (this.$set)
배열이나 객체의 경우 인덱스(ex: tableData[0][1] = 'X';)를 사용해 변경하는 방법으론 
값은 변하나 화면에 변화가 적용 안됨

해결방법1.
import Vue from 'vue'; 를 하고
Vue.set(this.tableData[1],0,'X')을 사용해 변경가능

해결방법2.
this.$set(this.tableData[1],0,'X)로 변경 가능 // Vue.set과 동일

# EventBuS
이벤트의 중앙 매개체.. 이벤트를 한 곳에서 관리
빈깡통 Vue() 만들고 $on과 $emit을 사용

# Vuex
컴포넌트가 늘어날수록 $root나 $parent를 사용시에 상위컴포넌트가 무엇인지 구분하기가 쉽지 않음
그래서 나온게 vuex라고함. 리엑트 redux같은듯??

store란걸 두고 사용. React의 redux는 하나만 사용하는데 vuex는 여러개 사용 가능하다고한다.

````
store.js
export default new Vuex.Store({
    // vue의 data와 비슷
    state: {
        
    },
    // vue의 computed와 비슷
    getters: {

    },
    // state를 수정할 때 사용. 동기적으로
    mutations:{

    },    
    // 비동기를 사용할 때, 또는 여러 뮤테이션을 연달아 실행 할 때
    actions: {

    }
});
````
@주의할 점 

mutations의 명은 대문자로 쓰는게 약속이라함.

vuex에서도 배열이나 객체의 경우 인덱스(ex: tableData[0][1] = 'X';)를 사용해 변경하는 방법으론 
값은 변하나 화면에 변화가 적용 안되서 vue의 set을 사용해야함

Vue.use(Vuex)를 하여 vue와 vuex를 연결하고(this.$store 생성), 최상위 컴포넌트에도 import 해줘야함.

# mapState
import { mapState } from 'vuex';
store에서 state꺼낼때 더 편하게 해주기위해 사용

기본형처럼 단순하게 사용하거나 
...mapState(['state1','state2'])

함수형식으로 사용하여 this를 사용하여 계산도 가능
...mapState({
  state1(state){
    return state.winner + this.data;
  }
})

# slot
react에서의 children과 같다함. 제어의 역전(IOC: inversion of control). 
자식컴포넌트에서 화면에 표시되어야할 내용을 부모컴포넌트에 적어줌으로 부모컴포넌트의 Data나 methods에 접근할 수 있게해줌

# vue-router
npm i vue-router
페이지 변경이 아닌 컴포넌트와 주소만 바꿔서 보여줌. 눈속임
기본적으로 해시라우터 (ex: router.html#/number-baseball)인데 검색엔진문제때문에 자주 안쓰인다고함

0. routes.js 파일에 vue와 vue-router를 import 후 Vue.use(vue-router)로 사용
1. 속성 routes에 보여질 path와 가져올 컴포넌트 명을 적어주고 import로 컴포넌트들을 가져옴
2. 사용할 vue파일에서 import로 해당 파일을 가져온 후 사용
3. router-link 태그와 router-view 태그를 사용해 보여지게함

# 히스토리 라우터 사용

mode: 'history', 추가하면 히스토리 라우터가 된다함
이렇게 변경하면 해시라우터의 긴 주소가 아닌 router-link to에 입력한 것만 주소창에 보임
그런데 새로고침시 해당 주소에 접근 불가로 GET에러가 뜸
해결하기 위해서는 서버에도 알려줘야 함
