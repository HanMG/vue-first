<template>
    <tr>
        <td-component v-for="(cellData, index) in rowData" :key="cellData.id" :cell-index="index" :row-index="rowIndex"></td-component>
    </tr>
</template>

<script>
import TdComponent from './TdComponent';

export default {
    components: {
        TdComponent,
    },
    props:{
        rowData: Array,
        rowIndex: Number,
    },
    data(){
        return {

        }
    },
    computed:{
        rowData(){
            return this.$store.state.tableData[this.rowIndex];
        }
    },
    methods:{

    }
}
</script>