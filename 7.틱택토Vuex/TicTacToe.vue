<template>
    <div>
        <div>{{turn}}님의 턴 입니다.</div>
        <table> 
            <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex.id">
                <td @click="onClickTd(rowIndex, cellIndex)" v-for="(cellData, cellIndex) in rowData" :key="cellIndex.id">{{cellData}}</td>
            </tr>       
        </table>
        <div v-if="winner">{{winner}}님의 승리!</div>
    </div>    
</template>

<script>
import { mapState } from 'vuex';
import store, {CHANGE_TURN, CLICK_CELL, NO_WINNER, RESET_GAME, SET_WINNER} from './store';
import TableComponent from './TableComponent';

export default {    
    store,    
    computed:{
        ...mapState(['winner','turn','tableData']),
        // winner(){
        //     return this.$store.state.winner;
        // },
        // turn(){
        //     return this.$store.state.turn;
        // }
    },   
    methods: {           
            onClickTd(rowIndex, cellIndex){
                // 이미 칸이 채워졌는데 누른경우
                if(this.cellData) return;                

                this.$store.commit(CLICK_CELL, {row: rowIndex, cell: cellIndex});

                let win = false;
                // 가로
                if(this.tableData[rowIndex][0] === this.turn && this.tableData[rowIndex][1] === this.turn && this.tableData[rowIndex][2] === this.turn){
                    win = true;
                }
                // 세로
                if(this.tableData[0][cellIndex] === this.turn && this.tableData[1][cellIndex] === this.turn && this.tableData[2][cellIndex] === this.turn){
                    win = true;
                }
                // 대각선(백슬레쉬)
                if( this.tableData[0][0] === this.turn && this.tableData[1][1] === this.turn && this.tableData[2][2] === this.turn){
                    win = true;
                }                
                // 슬레쉬
                if (this.tableData[0][2] === this.turn && this.tableData[1][1] === this.turn && this.tableData[2][0] === this.turn){
                    win = true;
                }

                if(win){ // 이긴경우
                    this.$store.commit(SET_WINNER, this.turn);
                    this.$store.commit(RESET_GAME);
                }else{ // 무승부
                    let all = true; // all 이 true인 무승부 라는 뜻
                    this.tableData.forEach((row) => { // 무승부 검사
                        row.forEach((cell) =>{
                            if(!cell){
                                all = false;
                            }
                        });
                    });
                    if(all){ // 무승부
                        this.$store.commit(NO_WINNER);
                        this.$store.commit(RESET_GAME);
                    }else{ // 아직 게임이 안끝났을때
                        // 현재 턴이 O일시 X로, 아닐시 O 로 턴값 변경
                        this.$store.commit(CHANGE_TURN);
                    }                     
                }
            }
        },
};
</script>

<style>
    table{
        border-collapse: collapse;
    }
    td{
        border: 1px solid black;
        width: 40px;
        height: 40px;
        text-align: center
    }
</style>
