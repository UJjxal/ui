import http from "./httpService";
import { API_ROOT } from "../../src/config";

export function getOptionsForData() {
  return http.get(`${API_ROOT}dataCatalog/`);
}

export function addOptionsForData(data) {
  return http.post(`${API_ROOT}dataCatalog/`, data);
}

export function updateOptionsForData(data) {
  return http.put(`${API_ROOT}dataCatalog/`, data);
}

export function updateOptionsForDataTable(data) {
  return http.put(`${API_ROOT}dataCatalog/table/`, data);
}

export function deleteOptionsForData(data) {
  return http.delete(`${API_ROOT}dataCatalog/`, { data, headers: { 'Access-Control-Allow-Origin': '*' } });
}