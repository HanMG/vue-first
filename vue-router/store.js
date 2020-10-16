import Vue from 'vue';
import Vuex from 'vuex';

// 반드시 Vue와 Vuex를 연결해야함
Vue.use(Vuex);

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

// 지뢰판의 상태를 값으로 정해놓음
export const CODE = {
    MINE: -7, // 지뢰
    NORMAL: -1, // 빈칸
    QUESTION: -2, // 물음표
    FLAG: -3, // 깃발
    QUESTION_MINE: -4, // 지뢰에 물음표
    FLAG_MINE: -5, // 지뢰에 깃발
    CLICKED_MINE: -6,
    OPEND: 0, // 0 이상이면 다 opened
};

const plantMine = (row, cell, mine) => {
    console.log(row, cell, mine);
    const candidate = Array(row * cell).fill().map((arr, i) => {
        return i;
    });
    const shuffle = [];
    while(candidate.length > row * cell - mine){
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen);
    }
    const data = [];
    for( let i = 0; i < row; i++){
        const rowData = [];
        data.push(rowData);
        for( let j = 0; j < cell; j++){
            rowData.push(CODE.NORMAL);
        }
    }

    for( let k = 0; k < shuffle.length; k++){
        const ver = Math.floor(shuffle[k]/cell);
        const hor = shuffle[k] % cell;
        data[ver][hor] = CODE.MINE;
    }

    console.log(data);
    return data;
}

export default new Vuex.Store({     
    state: {
        tableData:[],    
        data:{
            row: 0,
            cell: 0,
            mine: 0,
        },
        timer: 0,
        result: '',
        halted: true, // 중단됨
        opendCount: 0,
    },
    getters: {

    },
    // state를 수정할 때 사용. 동기적으로
    mutations:{
        [START_GAME](state, {row, cell, mine}) {
            state.data = {
                row,
                cell,
                mine,
            };
            state.tableData = plantMine(row, cell, mine)       ;
            state.timer = 0;
            state.halted = false;
            state.opendCount = 0;
            state.result = '';
        },
        [OPEN_CELL](state, {row, cell}) {
            // 승리조건을 위한 openCount
            let opendCount = 0;
            const checked = [];
            function checkAround(row, cell) { // 주변 8칸 지뢰인지 검사
                // undefined 안뜨게
                const checkRowOrCellIsUndefined = row < 0 || row >= state.tableData.length || cell < 0 || cell >= state.tableData[0].length;
                if(checkRowOrCellIsUndefined){
                    return;
                }
                // 이미 열려있거나, 깃발, 물음표 있을시 넘어감
                if([CODE.OPEND, CODE.FLAG, CODE.FLAG_MINE, CODE.QUESTION_MINE, CODE.QUESTION].includes(state.tableData[row][cell])){
                    return;
                }
                if( checked.includes(row + '/' + cell)){ // 한번 연 칸이면 무시
                    return;
                }else{ // 아니면 체크드에 추가
                    checked.push(row + '/' + cell); 
                }
                let around = [];
                if(state.tableData[row - 1]){
                    around = around.concat([
                        state.tableData[row - 1][cell - 1], state.tableData[row - 1][cell], state.tableData[row - 1][cell + 1]
                    ]);
                }                
                around = around.concat([
                    state.tableData[row][cell - 1], state.tableData[row][cell + 1]
                ]);
                if(state.tableData[row + 1]){
                    around = around.concat([
                        state.tableData[row + 1][cell - 1], state.tableData[row + 1][cell], state.tableData[row + 1][cell + 1]
                    ]);
                }                
                const counted = around.filter(function(v){
                    return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v);
                });             
                if(counted.length === 0 && row > -1) { // 주변에 지뢰가 하나도 없으면
                    const near = [];
                    if(row - 1 > -1){
                        near.push([row - 1, cell - 1]);
                        near.push([row - 1, cell]);
                        near.push([row - 1, cell + 1]);
                    }
                    near.push([row, cell - 1]);
                    near.push([row, cell + 1]);
                    if(row + 1 < state.tableData.length){
                        near.push([row + 1, cell - 1]);
                        near.push([row + 1, cell]);
                        near.push([row + 1, cell + 1]);
                    }
                    near.forEach((n) => {
                        if(state.tableData[n[0]][n[1]] !== CODE.OPENED){
                            checkAround(n[0], n[1]);
                        }
                    });                    
                }
                if(state.tableData[row][cell] === CODE.NORMAL){
                    opendCount += 1;
                }
                Vue.set(state.tableData[row], cell, counted.length);
            }              
            checkAround(row, cell);           
            let halted = false;
            let result = '';
            // 가로 * 세로 - 지뢰수 === state에 쌓인 오픈카운트 갯수 + 지금 추가된 오픈카운트 이면 승리
            if(state.data.row * state.data.cell - state.data.mine === state.opendCount + opendCount){
                halted = true;
                result = `${state.timer} 초만에 승리하셨습니다.`;
            }
            state.opendCount += opendCount;
            state.halted = halted;
            state.result = result;
        },
        [CLICK_MINE](state, {row, cell}) {
            state.halted = true;
            Vue.set(state.tableData[row], cell, CODE.CLICKED_MINE);
        },
        [FLAG_CELL](state, {row, cell}) {
            if(state.tableData[row][cell] === CODE.MINE){
                Vue.set(state.tableData[row], cell, CODE.FLAG_MINE);
            }else{
                Vue.set(state.tableData[row], cell, CODE.FLAG);
            }
        },
        [QUESTION_CELL](state, {row, cell}) {
            if(state.tableData[row][cell] === CODE.FLAG_MINE){
                Vue.set(state.tableData[row], cell, CODE.QUESTION_MINE);
            }else{
                Vue.set(state.tableData[row], cell, CODE.QUESTION);
            }
        },
        [NORMALIZE_CELL](state, {row, cell}) {
            if(state.tableData[row][cell] === CODE.QUESTION_MINE){
                Vue.set(state.tableData[row], cell, CODE.MINE);
            }else{
                Vue.set(state.tableData[row], cell, CODE.NORMAL);
            }
        },
        [INCREMENT_TIMER](state) {
            state.timer += 1;
        },
    },    
    // 비동기를 사용할 때, 또는 여러 뮤테이션을 연달아 실행 할 때
    actions: {

    }
});