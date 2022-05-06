import http from "./httpService";
import { API_ROOT } from "../../src/config";

const apiEndpoint = API_ROOT;

export function getDropdown(treeId, token) {
  return http.get(`${apiEndpoint}kpiMaster/${treeId}/`);
}

export function getDtl(treeId, Id, token) {
  return http.get(`${apiEndpoint}/${treeId}/${Id}/`);
}

export function getlineChart(treeId, Id, token) {
  return http.get(`${apiEndpoint}lineChart/${treeId}/${Id}/`);
}

export function getEChart(treeId, Id, token) {
  return http.get(`${apiEndpoint}cohortChart/${treeId}/${Id}/`);
}

export function getCohortTable(treeId, Id, token) {
  return http.get(`${apiEndpoint}cohortTable/${treeId}/${Id}/`);
}

export function getKeyInsight(treeId, Id, token) {
  return http.get(`${apiEndpoint}cohortKeyInsight/${treeId}/${Id}/`);
}

// Summary Insights
export function cohortSummaryInsight(data, uri) {
  return http.post(`${apiEndpoint}${uri}/`, data);
}
