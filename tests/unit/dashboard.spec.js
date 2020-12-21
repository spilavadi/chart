import { shallowMount, createLocalVue } from "@vue/test-utils";
import Dashboard from "@/components/Dashboard.vue";
import Vuex from "vuex"


const localVue = createLocalVue()
localVue.use(Vuex);

describe("Dashboard.vue", () => {
  let wrapper;
  beforeEach(()=>{
    wrapper = shallowMount(Dashboard, {
      data(){
        return {
          selectedType:'',
          errored: false
        }
      },
      computed:{
        graphTypes(){
          return [{labe:'test',value:'test'}];
        },
        graphData() {
          return [['test','col1'],['test',123]];
        }
      },
      mocks: {
        $store: {
          getters: {
            getGraphData: (state)=>(key)=>{
              return [];
            },
            getGraphKeys: state=>{
              return [];
            }
          }
        }
      }
    });
  })
  it("creates component", () => {
    expect(wrapper.text()).toMatch('');
  });
  
});
