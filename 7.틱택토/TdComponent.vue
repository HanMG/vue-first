<template>
    <td @click="onClickTd">{{cellData}}</td>
</template>

<script>   
    export default {
        props: {
            cellData: String,
            rowIndex: Number,
            cellIndex: Number,
        },        
        methods: {           
            onClickTd(){
                // 이미 칸이 채워졌는데 누른경우
                if(this.cellData) return;

                // 해당 턴에 클릭된 rowIndex,cellIndex인 부분에 해당 그림를 넣는다.
                // this.$root.$data.tableData[this.rowIndex][this.cellIndex] = this.$root.$data.turn;
                // 위는 작동 X                
                const rootData = this.$root.$data;
                this.$set(rootData.tableData[this.rowIndex],this.cellIndex, rootData.turn);                            

                let win = false;
                // 가로
                if(rootData.tableData[this.rowIndex][0] === rootData.turn && rootData.tableData[this.rowIndex][1] === rootData.turn && rootData.tableData[this.rowIndex][2] === rootData.turn){
                    win = true;
                }
                // 세로
                if(rootData.tableData[0][this.cellIndex] === rootData.turn && rootData.tableData[1][this.cellIndex] === rootData.turn && rootData.tableData[2][this.cellIndex] === rootData.turn){
                    win = true;
                }
                // 대각선(백슬레쉬)
                if( rootData.tableData[0][0] === rootData.turn && rootData.tableData[1][1] === rootData.turn && rootData.tableData[2][2] === rootData.turn){
                    win = true;
                }                
                // 슬레쉬
                if (rootData.tableData[0][2] === rootData.turn && rootData.tableData[1][1] === rootData.turn && rootData.tableData[2][0] === rootData.turn){
                    win = true;
                }
                console.log(win);
                // 이긴경우
                if(win){
                    // 승자기록
                    rootData.winner = rootData.turn;
                    // 데이터 초기화
                    rootData.turn = 'O';
                    rootData.tableData = [
                        ['','',''],
                        ['','',''],
                        ['','',''],
                    ];
                }else{ // 무승부
                    let all = true; // all 이 true인 무승부 라는 뜻
                    rootData.tableData.forEach((row) => { // 무승부 검사
                        row.forEach((cell) =>{
                            if(!cell){
                                all = false;
                            }
                        });
                    });
                    if(all){ // 무승부
                        // 데이터 초기화
                        rootData.winner = '';
                        rootData.turn = 'O';
                        rootData.tableData = [
                            ['','',''],
                            ['','',''],
                            ['','',''],
                        ];
                    }else{ // 아직 게임이 안끝났을때
                        // 현재 턴이 O일시 X로, 아닐시 O 로 턴값 변경
                        rootData.turn = rootData.turn === 'O' ? 'X' : 'O';  
                    }                     
                }
            }
        },
    };
</script>