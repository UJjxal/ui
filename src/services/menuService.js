import axios from 'axios';
import util from '../utilities/util';
import {API_ROOT} from '../config';

class menuService{

    getContent(domain){
        const token = util.getToken();
        return axios({
            method: `GET`,
            url: API_ROOT + `mainMenu/${domain}`,
            headers: { Authorization: `Bearer ${token}`, "Access-Control-Allow-Origin": "*", }
        })
       // return axios.get(API_ROOT+`mainMenu/${domain}`);
    }

    setMenuTreeData(data){
        const token = util.getToken();
        return axios({
            method: `POST`,
            url: API_ROOT + `mainMenu`,
            data,
            headers: { Authorization: `Bearer ${token}`, "Access-Control-Allow-Origin": "*", }
        })
       // return axios.post(API_ROOT+`mainMenu/${domain}`, data);
    }

}

export default new menuService();