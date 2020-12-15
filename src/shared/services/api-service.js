import axios from 'axios';
import {BASE_ROUTE} from '../constants';

export default {
    /**
     * gets the data required for chart
     */
    getData(){
        return axios.get(BASE_ROUTE+'data.json');
    }
}