<template>
  <div v-if="!errored">
    <select v-model="selectedType">
      <option value="" disabled selected>Select your option</option>
      <option v-for="(item, index) in graphTypes" :key="index" :value="item.value" >{{item.label}}</option>
    </select>
    <Chart type="LineChart" :options="graphOptions" :data="graphData" class="line-chart" />
  </div>
  <div v-else>Something went wrong. Please try again.</div>
</template>

<script>
import Chart from "../shared/charts/Chart";
import apiService from '../shared/services/api-service';

export default {
  name: "Dashboard",
  props: [],
  components:{
    Chart
  },
  data(){
    return {
      selectedType:'',
      errored: false
    }
  },
  mounted(){
    apiService.getData().then(resp=>this.$store.commit('SET_GRAPH_DATA', resp.data), ()=>this.errored=true);
  },
  computed:{
    /**
     * gives the list of graphtypes
     */
    graphTypes(){
      return this.$store.getters.getGraphKeys;
    },

    /**
     * gives the graph data
     */
    graphData() {
      return this.$store.getters.getGraphData(this.selectedType);
    },

    /**
     * gives the options required for chart
     */
    graphOptions(){
      return {
        title: this.selectedType,
        curveType: 'none',
        legend: { position: 'top', alignment:'center' },
        pointSize: 3
      };
    }
  }
};
</script>

<style scoped>
.line-chart{
  height: 500px;
}
</style>