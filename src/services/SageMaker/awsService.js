import http from "./httpService";
import { API_ROOT } from "../../../src/config";

const apiEndpoint = API_ROOT;

// get url
export function getUrl(awsRole, userName, service,token) {
  return http.get(`${apiEndpoint}createFedrationUrl/${awsRole}/${userName}/${service}/${token}`);
}

// get services
export function getServices(token, awsRole) {
  return http.get(`${apiEndpoint}listRoleServicePermissions/${token}/${awsRole}`);
} 