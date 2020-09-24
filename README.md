#vue 공부

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


