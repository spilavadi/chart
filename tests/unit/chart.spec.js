import { shallowMount, createLocalVue } from "@vue/test-utils";
import Chart from "@/shared/charts/Chart.vue";
import Vuex from "vuex"


const localVue = createLocalVue()
localVue.use(Vuex);

describe("Chart.vue", () => {
    let wrapper;
    beforeEach(()=>{
        wrapper = shallowMount(Chart, {

        })
    });
    
    it('should be created', ()=>{
        expect(wrapper).toBeTruthy()
    });

    // not the right unit test
    it('should have a container', ()=>{
        expect(wrapper.find('div').element).toBeTruthy()
    });
});