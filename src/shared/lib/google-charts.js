import {GoogleCharts} from 'google-charts';

class ChartLoader {
    isReady = false;
    constructor(){
        this.loadChart();
    }

    /**
     * loads the chart
     * @returns a promise
     */
    loadChart(){
        return new Promise((resolve)=>{
            if(this.isReady){
                resolve(true)
            } else {
                GoogleCharts.load(()=>{
                    resolve(true);
                    this.isReady = true;
                })
            }
        });
    }

    /**
     * returns the graph object
     * @param {HtmlElement} el - element where the graph will be loaded
     * @param {String} type - type of the chart
     */
    getChartObj (el,type) {
        return new Promise((resolve,reject)=>{
            if(!type){
                reject(`${type} is not supported`);
            }
            this.loadChart().then(loaded=>{
                if(loaded){
                    resolve(new GoogleCharts.api.visualization[type](el))
                } else {
                    reject('Something wrong in loading the chart lib');
                }
            });
        });
    }

    /**
     * converts the given arrat to data table object
     * @param {Array} data - Array of data to be loaded in the graph
     */
    getChartData(data){
        return GoogleCharts.api.visualization.arrayToDataTable(data);
    }
}

export default new ChartLoader();