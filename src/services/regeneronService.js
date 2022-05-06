import http from "./httpService";
const apiEndpoint=`https://tgnr0tmj4g.execute-api.us-east-1.amazonaws.com/dev/`;
class regeneronService{
    maFilters(){
        return http.get(`${apiEndpoint}MA_filter-api`);
    }

    maImpactedPlan(parameter){
        return http.post(`${apiEndpoint}MA_filter_impacted_plan-api`, parameter);
    }

    maImpactedSaleTeam(parameter){
        return http.post(`${apiEndpoint}MA_sales_team-api`,parameter);
    }

    maImpactedHcp(parameter){
        return http.post(`${apiEndpoint}MA_impacted_hcps-api`,parameter);
    }

    maPlanChange(parameter){
        return http.post(`${apiEndpoint}MA_plan_change-api`, parameter);
    }
    
    maChangeFrTo(parameter){
        return http.post(`${apiEndpoint}MA_check_box-api`, parameter);
    }

    maMapState(){
        return http.get(`${apiEndpoint}MA_map_function-api`);
    }

    maTop5HCP(parameter){
        return http.post(`${apiEndpoint}MA_email_trigger-api`,parameter);
    }
}

export default new regeneronService();