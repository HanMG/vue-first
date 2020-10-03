<template>
    <td @click="onClickTd">{{cellData}}</td>
</template>

<script>   
    import EventBus from './EventBus';
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
                EventBus.$emit('clickTd', this.rowIndex, this.cellIndex);
            }
        },
    };
</script>