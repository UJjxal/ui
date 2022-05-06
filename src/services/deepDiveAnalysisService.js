import { API_ROOT } from "../config";
import http from './httpService';

export function getDeepDiveAnalysis(data) {
  return http.post(`${API_ROOT}listDeepDiveAnalysis/`, data);
}

export function addDeepDiveAnalysis(data) {
  return http.post(`${API_ROOT}deepDiveAnalysis/`, data);
}

export function updateDeepDiveAnalysis(data) {
  return http.put(`${API_ROOT}deepDiveAnalysis/`, data);
}

export function deleteDeepDiveAnalysis(uuid) {
  return http.delete(`${API_ROOT}deepDiveAnalysis/${uuid}`);
}