<template>
    <td @click="onClickTd">{{cellData}}</td>
</template>

<script>   
    import { CLICK_CELL, SET_WINNER, RESET_GAME, CHANGE_TURN, NO_WINNER } from './store';    

    export default {
        props: {
            cellData: String,
            rowIndex: Number,
            cellIndex: Number,
        },        
        computed:{
            cellData(){
                return this.$store.state.tableData[this.rowIndex][this.cellIndex];
            },
            tableData(){
                return this.$store.state.tableData;
            },
            turn(){
                return this.$store.state.turn;
            },
        },
        methods: {           
            onClickTd(){
                // 이미 칸이 채워졌는데 누른경우
                if(this.cellData) return;                

                this.$store.commit(CLICK_CELL, {row: this.rowIndex, cell: this.cellIndex});

                let win = false;
                // 가로
                if(this.tableData[this.rowIndex][0] === this.turn && this.tableData[this.rowIndex][1] === this.turn && this.tableData[this.rowIndex][2] === this.turn){
                    win = true;
                }
                // 세로
                if(this.tableData[0][this.cellIndex] === this.turn && this.tableData[1][this.cellIndex] === this.turn && this.tableData[2][this.cellIndex] === this.turn){
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