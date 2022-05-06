import {API_ROOT} from "../../../../config";
import moment from "moment";
//import util from "../../../../utilities/util";
import axios from "../../../../services/axios";

class apiServices{
    page='';
    monthName=(n)=>{
        let months=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        return months[n-1];
    }

    fromAndToDate=(periodType, filter)=>{
        let from_date, to_date;
        if(periodType==='daily'){
            let daysMinus=14;

            if(filter){
                if(filter==='requestor'){
                    daysMinus=6;
                }
                if(this.page==='Overview'){
                    daysMinus=0;
                }
            }

            from_date=moment().subtract(daysMinus, 'd').format('YYYY-MM-DD');
            to_date=moment().format('YYYY-MM-DD');
        }else{
            //to_date=moment().endOf('month').format('YYYY-MM-DD');
            let monthMinus=2;
            if(filter){
                if(this.page==='Overview'){
                    monthMinus=0;
                }
            }
            from_date=moment().subtract(monthMinus, 'month').startOf('month').format('YYYY-MM-DD');
            if(periodType==='yeartodate'){
                from_date=moment().startOf('year').format('YYYY-MM-DD');
            }
            to_date=moment().format('YYYY-MM-DD');
        }

        return {from_date, to_date};
        //return {from_date:"2021-05-16", to_date:"2021-05-31"};
        //return {from_date:"2021-05-27", to_date:"2021-06-03"};
    }

    summaryAndTrends=(filter, periodType)=>{
        let {from_date, to_date}=this.fromAndToDate(periodType, filter);
        let params={filter, aggr:periodType, from_date, to_date};
        if(periodType==='yeartodate'){
            params.aggr='monthly';
        }
        
        return axios.get("risk360/alert-count", {params});
    }

    companyAlertsAndFindings=(periodType)=>{
        let {from_date, to_date}=this.fromAndToDate(periodType, null);
        if(periodType==='yeartodate'){
            periodType='monthly';
        }
        
        /* const apiUrl=API_ROOT+`table_data/${periodType}/${from_date}/${to_date}/${util.getToken()}`;
        return axios({
            method: "get",
            url: apiUrl,
        }); */

        const url=`risk360/table_data/${periodType}/${from_date}/${to_date}`;
        return axios.get(url);
    }
}

export default new apiServices();