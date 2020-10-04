<template>
    <table>
        <tr-component v-for="(rowData, index) in tableData" :key="rowData.id" :row-index="index" ></tr-component>
    </table>
</template>

<script>
import TrComponent from './TrComponent';

export default {
  components:{
      TrComponent,
  },  
  computed:{
      tableData(){
          return this.$store.state.tableData;
      },            
  },  
}
</script>

<style>

</style>