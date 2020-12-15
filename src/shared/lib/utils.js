import { labels } from "../label";

export default {
    /**
     * converts the given camalcase text to user friendly text
     * @param {String} str 
     */
    unCamelCase(str){
        if(typeof(str) === 'string'){
            return str
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, function(str){ return str.toUpperCase(); });
        }
        return '';
    },

    /**
     * (not the right place for this function)
     * prepares the data required for chart.
     * @param {Object} resp - response Object
     */
    prepareGroupedData(resp){
        const groupedData = {};
        if(Array.isArray(resp?.records) && resp.records.length>0){
            const keys = Object.keys(resp.records[0]);
            const xaxis = resp.xaxis;
            if(keys.length>0){
            keys.forEach(key=>{
                if(key!=xaxis){
                    groupedData[key] = [[xaxis, this.unCamelCase(key)], ...resp.records.map(item=>[item[xaxis],item[key]])]
                }
            });
            }
        }
        return groupedData;
    },

    /**
     * (not the right place for this function)
     * finds the given key in labels map and returns it
     * otherwise converts the camalcase to user friendly string
     * @param {String} key - key of the label
     */
    getLabel(key){
        if(typeof(key)==='string'){
            return key in labels? labels[key]: this.unCamelCase(key);
        }
        return '';
    }
}