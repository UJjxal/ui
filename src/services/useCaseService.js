import axios from 'axios';
import util from '../utilities/util';
import { API_ROOT } from "../config";


class useCaseService{
getUseCaseNames(){
    const token = util.getToken();
    return axios({
        method: `GET`,
        url: API_ROOT + `usecaseNames/`,
        headers: { Authorization: `Bearer ${token}`, "Access-Control-Allow-Origin": "*", }
    })
}
}

export default new useCaseService();