import Vue from 'vue';
import Vuex from 'vuex';

// 반드시 Vue와 Vuex를 연결해야함
Vue.use(Vuex);

// mutation을 동적속성으로 외부에서 사용할 수 있게끔 변수로 빼놓음
// export const 시 import { SET_WINNER, CLCIK_CELL } from './store'로 
// 중괄호 안에 설정된 이름만으로 불러올 수 있고 여러개도 가능
export const SET_WINNER = 'SET_WINNER'; 
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';
export const NO_WINNER = 'NO_WINNER';

// import store from './store'; export default시 명칭을 마음대로 할 수 있다.
// 보통 가장 중요한 것을 export default로, 나머지는 중괄호로 
export default new Vuex.Store({ 
    // vue의 data와 비슷
    state: {
        tableData:[
            ['','',''],
            ['','',''],
            ['','',''],
       ],
       turn: 'O',
       winner: '',
    },
    // vue의 computed와 비슷
    getters: {
        // turnMessage(state){
        //     return this.turn + '님이 승리하셨습니다.';
        // }
    },
    // state를 수정할 때 사용. 동기적으로
    mutations:{
        [SET_WINNER](state, winner){
            state.winner = winner;
        },
        [CLICK_CELL](state, {row, cell}){
            Vue.set(state.tableData[row],cell,state.turn);
        },
        [CHANGE_TURN](state){
            state.turn = state.turn === 'O' ? 'X' : 'O';
        },
        [RESET_GAME](state){
            state.turn = 'O';
            state.tableData = [
                ['','',''],
                ['','',''],
                ['','',''],
            ];
        },
        [NO_WINNER](state){
            state.winner = '';
        }
    },    
    // 비동기를 사용할 때, 또는 여러 뮤테이션을 연달아 실행 할 때
    actions: {

    }
});