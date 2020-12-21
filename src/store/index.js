import Vue from "vue";
import Vuex from "vuex";
import utils from "../shared/lib/utils";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    groupedData: {}
  },
  mutations: {
    SET_GRAPH_DATA:(state, salesObj)=>{
      Vue.set(state.groupedData, salesObj.type, utils.prepareGroupedData(salesObj.resp))
    }
  },
  getters:{
    /**
     * returns the data from the grouped records if key found
     * otherwise returns empty string
     * @param {Object} state - state object
     */
    getGraphData: (state)=>(key, type)=>{
      return type in state.groupedData && key in state.groupedData[type]?state.groupedData[type][key]:[];
    },

    /**
     * gets the list of graph keys and converts to user friendly texts
     * @param {Object} state - state object
     */
    getGraphKeys: state=>(type)=>{
      return type in state.groupedData?Object.keys(state.groupedData[type]).map(item=>({value: item, label:utils.getLabel(item)})):[];
    }
  },
  actions:{
    /**
     * Action which adds data
     * @param {*} commit 
     * @param {*} salesObj - sales object which contains type and data
     */
    addGraphData({commit}, salesObj){
      commit('SET_GRAPH_DATA', salesObj);
    }
  }
});
