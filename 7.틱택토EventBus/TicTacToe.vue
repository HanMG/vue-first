<template>
    <div>
        <div>{{turn}}님의 턴 입니다.</div>
        <table-component :table-data="tableData" />        
        <div v-if="winner">{{winner}}님의 승리!</div>
    </div>    
</template>

<script>
import TableComponent from './TableComponent';
import EventBus from './EventBus';

export default {    
    components: {
      TableComponent,
    },
    data(){
        return{
           tableData:[
                ['','',''],
                ['','',''],
                ['','',''],
           ],
           turn: 'O',
           winner: '',
        };
    },    
    methods:{            
      onClickTd(rowIndex, cellIndex) {
          // 해당 턴에 클릭된 rowIndex,cellIndex인 부분에 해당 그림를 넣는다.        
               console.log(rowIndex, cellIndex);
                this.$set(this.tableData[rowIndex],cellIndex, this.turn);                            

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
                console.log(win);
                // 이긴경우
                if(win){
                    // 승자기록
                    this.winner = this.turn;
                    // 데이터 초기화
                    this.turn = 'O';
                    this.tableData = [
                        ['','',''],
                        ['','',''],
                        ['','',''],
                    ];
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
                        // 데이터 초기화
                        this.winner = '';
                        this.turn = 'O';
                        this.tableData = [
                            ['','',''],
                            ['','',''],
                            ['','',''],
                        ];
                    }else{ // 아직 게임이 안끝났을때
                        // 현재 턴이 O일시 X로, 아닐시 O 로 턴값 변경
                        this.turn = this.turn === 'O' ? 'X' : 'O';  
                    }                     
                }
      },                
    },    
    created() {
        EventBus.$on('clickTd', this.onClickTd);
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
