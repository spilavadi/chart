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

  describe('select box',()=>{
    it('should be present',()=>{
      expect(wrapper.find('select').element).toBeTruthy();
    });
    it('should have empty first value',()=>{
      expect(wrapper.findAll('option').at(0).element.value).toEqual('');
    });
    it('should have test as second value',()=>{
      expect(wrapper.findAll('option').at(1).element.value).toEqual('test');
    });
  });

  describe('chart',()=>{
    it('should be present',()=>{
      expect(wrapper.find('.line-chart').element).toBeTruthy();
    });
  });
  
});
