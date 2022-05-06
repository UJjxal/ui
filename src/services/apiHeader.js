import { HeaderAcceptType } from "../config";
import util from "../utilities/util";

const headers = () => ({
    "Access-Control-Allow-Origin": "*",
    "Authorization": 'Bearer ' + util.getToken(),
    "Accept": HeaderAcceptType ? HeaderAcceptType : null
});
export default headers;
