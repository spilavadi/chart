import googleCharts from "../../src/shared/lib/google-charts";
import { GoogleCharts } from 'google-charts';

describe('ChartLoader',()=>{
    let mockLoad;
    beforeEach(()=>{
        mockLoad = jest.spyOn(GoogleCharts, 'load'); 
    })
    describe('loadChart',()=>{
        it('should load the char lib',()=>{
            googleCharts.loadChart().then(()=>{
                expect(mockLoad).toHaveBeenCalled();
            });
        });
    });
});