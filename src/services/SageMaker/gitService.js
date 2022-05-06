import http from "./httpService";
import { PYTHON_API_ROOT } from "../../src/config";

const apiEndpoint = PYTHON_API_ROOT;

export function getList(token) {
  return http.get(`${apiEndpoint}kpiMaster/${token}`);
}

export function getDtl(treeId, Id, token) {
  return http.get(`${apiEndpoint}/${treeId}/${Id}/${token}`);
}

export function getlineChart(treeId, Id, token) {
  return http.get(`${apiEndpoint}lineChart/${treeId}/${Id}/${token}`);
}

export function getEChart(treeId, Id, token) {
  return http.get(`${apiEndpoint}cohortChart/${treeId}/${Id}/${token}`);
}

export function getCohortTable(treeId, Id, token) {
  return http.get(`${apiEndpoint}cohortTable/${treeId}/${Id}/${token}`);
}

export function getKeyInsight(treeId, Id, token) {
  return http.get(`${apiEndpoint}cohortKeyInsight/${treeId}/${Id}/${token}`);
}
