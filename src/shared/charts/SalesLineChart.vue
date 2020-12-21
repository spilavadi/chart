<template>
  <div>
      <select v-model="selectedType">
        <option value="" disabled selected>Select your option</option>
        <option v-for="(item, index) in graphTypes" :key="index" :value="item.value" >{{item.label}}</option>
      </select>
      <Chart type="LineChart" :options="graphOptions" :data="graphData" class="line-chart" />
  </div>
</template>

<script>
import Chart from "./Chart";

export default {
  name: "SalesLineChart",
  props: [
    'data'
  ],
  components:{
    Chart
  },
  data(){
    return {
      selectedType:'',
      randomKey: Date.now()
    }
  },
  watch:{
    data:{
      deep: true,
      handler(){
        this.$store.dispatch('addGraphData', {resp:this.data, type: this.randomKey})
      }
    }
  },
  computed:{
    /**
     * gives the list of graphtypes
     */
    graphTypes(){
      return this.$store.getters.getGraphKeys(this.randomKey);
    },

    /**
     * gives the graph data
     */
    graphData() {
      return this.$store.getters.getGraphData(this.selectedType, this.randomKey);
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