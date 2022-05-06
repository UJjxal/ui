import axios from 'axios';
import util from '../utilities/util';
import {API_ROOT} from '../config';

class themeService{

    setTheme(data){
        console.log("THEME DATA", data)
        const token = util.getToken();
        return axios({
            method: `POST`,
            url: API_ROOT + `userProfile/`,
            data,
            headers: { Authorization: `Bearer ${token}`, "Access-Control-Allow-Origin": "*", }
        })
        // return axios.post(API_ROOT+`setTheme/`, data);
    }

    getTheme(){
        const token = util.getToken();
        return axios({
            method: `GET`,
            url: API_ROOT + `userProfile/`,
            headers: { Authorization: `Bearer ${token}`, "Access-Control-Allow-Origin": "*", }
        })
    }

    getAssetClass(){
        const token = util.getToken();
        return axios({
            method: `GET`,
            url: API_ROOT + `assetClass/`,
            headers: { Authorization: `Bearer ${token}`, "Access-Control-Allow-Origin": "*", }
        })
    }

    setAssetClass(data){
        console.log("SET ASSET CLASS DATA", data)
        const token = util.getToken();
        return axios({
            method: `POST`,
            url: API_ROOT + `assetClass/`,
            data,
            headers: { Authorization: `Bearer ${token}`, "Access-Control-Allow-Origin": "*", }
        })
    }

}

export default new themeService();