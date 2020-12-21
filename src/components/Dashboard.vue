<template>
  <div>
      <SalesLineChart :data="getSalesData('1')" />
      <SalesLineChart :data="getSalesData('2')" />
  </div>
</template>

<script>
import SalesLineChart from "../shared/charts/SalesLineChart";
import apiService from '../shared/services/api-service';
import Vue from "vue";

export default {
  name: "Dashboard",
  props: [],
  components:{
    SalesLineChart
  },
  data(){
    return {
      salesData: {}
    }
  },
  mounted(){
    Promise.all([apiService.getData('1'), apiService.getData('2')]).then(results=>{
      if(Array.isArray(results) && results.length>1){
        Vue.set(this.salesData, '1', results[0].data);
        Vue.set(this.salesData, '2', results[1].data);
      }
    });
  },

  computed:{
    /**
     * gives the list of graphtypes
     */
    getSalesData(){
      return (type)=>{
        return type in this.salesData? this.salesData[type]: {};
      }
    }
  }
};
</script>

<style scoped>
.line-chart{
  height: 500px;
}
</style>