import utils from "../../src/shared/lib/utils";

describe('Utils',()=>{

    describe('line-chart',()=>{
        it('should convert camal case to normal text',()=>{
            expect(utils.unCamelCase('vueIsAwesome')).toEqual('Vue Is Awesome')
        });
        it('should return empty string for null',()=>{
            expect(utils.unCamelCase(null)).toEqual('')
        });
        it('should return empty string for undefined',()=>{
            expect(utils.unCamelCase(undefined)).toEqual('')
        });
    });

    describe('prepareGroupedData',()=>{
        let positiveData = {"xaxis": "date","records": [
                {
                    "date": "04/27/2016",
                    "clickThruRate": 11.575086019490813,
                    "sales": 1685103.46,
                    "pageViews": 672522,
                    "orders": 14274
                }
            ]
        };
        it('returns prepared data with attribute as keys except xaxis', ()=>{
            const groupedData = utils.prepareGroupedData(positiveData);
            expect(groupedData['data']).toBeUndefined();
        });
        it('returns prepared data with attributes as key', ()=>{
            const groupedData = utils.prepareGroupedData(positiveData);
            expect(Object.keys(groupedData).indexOf('clickThruRate')).not.toEqual(-1);
            expect(Object.keys(groupedData).indexOf('sales')).not.toEqual(-1);
            expect(Object.keys(groupedData).indexOf('pageViews')).not.toEqual(-1);
            expect(Object.keys(groupedData).indexOf('orders')).not.toEqual(-1);
        });
        it('should return keys as firs element with xaxis',()=>{
            const groupedData = utils.prepareGroupedData(positiveData);
            expect(groupedData['clickThruRate'][0][0]).toEqual('date');
            expect(groupedData['clickThruRate'][0][1]).toEqual('Click Thru Rate');
        });
        it('should return values for 0+n element',()=>{
            const groupedData = utils.prepareGroupedData(positiveData);
            expect(groupedData['clickThruRate'][1][0]).toEqual('04/27/2016');
            expect(groupedData['clickThruRate'][1][1]).toEqual(11.575086019490813);
        });
        it('return empty object for null',()=>{
            expect(Object.keys(utils.prepareGroupedData(null)).length).toEqual(0);
        });
        it('return empty object for undefined',()=>{
            expect(Object.keys(utils.prepareGroupedData(undefined)).length).toEqual(0);
        });
    });

    describe('getLabel',()=>{
        it('should return label for matched key',()=>{
            expect(utils.getLabel('clickThruRate')).toEqual('Click Through Rate');
        });

        it('should return formatted key for missing key',()=>{
            expect(utils.getLabel('vueIsAwesome')).toEqual('Vue Is Awesome');
        });

        it('should return empty string for null',()=>{
            expect(utils.getLabel(null)).toEqual('');
        });

        it('should return empty string for undefined',()=>{
            expect(utils.getLabel(undefined)).toEqual('');
        });
    });
});