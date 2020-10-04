<template>
    <div>
        <div>{{turn}}님의 턴 입니다.</div>
        <table-component />        
        <div v-if="winner">{{winner}}님의 승리!</div>
    </div>    
</template>

<script>
import { mapState } from 'vuex';
import store from './store';
import TableComponent from './TableComponent';

export default {    
    store,
    components: {
      TableComponent,
    },
    computed:{
        ...mapState(['winner','turn']),
        // winner(){
        //     return this.$store.state.winner;
        // },
        // turn(){
        //     return this.$store.state.turn;
        // }
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
