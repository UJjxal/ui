import axios from "axios";
import {PYTHON_API_ROOT} from "../config";
import util from "../utilities/util";

const axiosInstance=axios.create({
    baseURL:PYTHON_API_ROOT
});
  
axiosInstance.interceptors.request.use(
    (config)=>{
        config.headers={
            "Authorization":"Bearer "+util.getToken(),
            "Access-Control-Allow-Origin": "*",
        };
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response)=>{
        //console.log(response);
        return response;
    }, 
    (error)=>{
        return Promise.reject(error);
    }
);

export default axiosInstance;