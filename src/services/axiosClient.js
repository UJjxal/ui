import axios from "axios";
import { PYTHON_API_ROOT } from "../config";
import apiHeader from "./apiHeader";
const apiInstance = (baseUrl) => {	
	const api = axios.create({
		baseURL: baseUrl || PYTHON_API_ROOT,
		headers: apiHeader(),
	});
	
	api.interceptors.response.use(
		(response) => {
			// console.log("API-Response-Axios", response);
			if(response.data.code === 200 || response.data.code === 201){
			return response;
			}else{
				// console.log("API-Error-Axios ", response.data.message)
			}
		},
		(error) => {
			console.log("API-Error-Axios", error);
			throw error;
		}
	);

	return api;
};

export default apiInstance;