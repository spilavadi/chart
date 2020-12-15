<template>
    <div ref="chartContainer"></div>
</template>

<script>
import  chartLib  from '../lib/google-charts';

export default {
  name: "Chart",
  props: {
    type:{
        type: String,
        default: ()=> ''
    },
    data: {
        type: Array,
        default: ()=>[]
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    data: {
      deep: true,
      handler () {
        this.drawChart()
      }
    },
    options: {
      deep: true,
      handler () {
        this.drawChart()
      }
    },
    type () {
      this.createChartObj().then(()=>this.drawChart());
    }
  },
  data(){
    return {
      chartObj: null
    }
  },
  beforeDestroy () {
    // clear the chart when the component destroyed
    if (this.chartObj!=null && typeof(this.chartObj.clearChart) === 'function') {
        this.chartObj.clearChart()
    }
  },
  mounted(){
    this.createChartObj();
  },
  methods:{
    /**
     * uses the google-char lib to create the chart instance
     */
    createChartObj(){
        return new Promise((resolve, reject)=>{
          chartLib.getChartObj(this.$refs.chartContainer,this.type).then(obj=>{
              this.chartObj = obj;
              resolve(true)
          },error=>reject(error));
        })
    },

    /**
     * draws the chart with the given data and options
     */
    drawChart(){
      if(Array.isArray(this.data) && this.data.length>0 && this.chartObj!=null){
        var data = chartLib.getChartData(this.data);
        this.chartObj.draw(data, this.options);
      }
    }
  }
  
};
</script>
