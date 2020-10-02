<template>
    <tr>
        <td-component v-for="(cellData, index) in rowData" :key="cellData.id" :cell-data="cellData" :cell-index="index" :row-index="rowIndex"></td-component>
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
    methods:{

    }
}
</script>