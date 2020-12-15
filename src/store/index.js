import Vue from "vue";
import Vuex from "vuex";
import utils from "../shared/lib/utils";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    groupedData: {}
  },
  mutations: {
    SET_GRAPH_DATA:(state, resp)=>{
      state.groupedData = utils.prepareGroupedData(resp);
    }
  },
  getters:{
    /**
     * returns the data from the grouped records if key found
     * otherwise returns empty string
     * @param {Object} state - state object
     */
    getGraphData: (state)=>(key)=>{
      return key in state.groupedData?state.groupedData[key]:[];
    },

    /**
     * gets the list of graph keys and converts to user friendly texts
     * @param {Object} state - state object
     */
    getGraphKeys: state=>{
      return Object.keys(state.groupedData).map(item=>({value: item, label:utils.getLabel(item)}));
    }
  }
});
