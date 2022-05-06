import {API_ROOT} from '../config';
import util from '../utilities/util';
import axios from 'axios';
import http from './httpService';

class kpiService {

    // cohorts
    getAllCohorts() {
        return http.get(API_ROOT + `listKpiCohort/`);
    }

    createCohorts(cohorts) {
        return http.post(API_ROOT + `kpiCohort/`, cohorts);
    }

    updateCohorts(cohorts) {
        return http.put(API_ROOT + `kpiCohort/`, cohorts);
    }

    deleteCohorts(cohortId) {
        return http.patch(API_ROOT + `kpiCohort/`, cohortId);
    }

    // metrics
    getAllMetrics() {
        return http.get(API_ROOT + `listKpiMetrics/`);
    }

    createMetrics(metrics) {
        return http.post(API_ROOT + `kpiMetrics/`, metrics);
    }

    updateMetrics(metrics) {
        return http.put(API_ROOT + `kpiMetrics/`, metrics);
    }

    deleteMetrics(metricId) {
        return http.patch(API_ROOT + `kpiMetrics/`, metricId);
    }

    // parameters - LC-723 Parameterized SQL Queries
    getAllParameters() {
        return http.get(API_ROOT + `listParameters/`);
    }

    getParameterById(parameterId) {
        return http.post(API_ROOT + `parameterById/`, parameterId);
    }

    createParameters(parameters) {
        return http.post(API_ROOT + `parameter/`, parameters);
    }

    updateParameters(parameters) {
        return http.put(API_ROOT + `parameter/`, parameters);
    }

    deleteParameters(parameterId) {
        return http.patch(API_ROOT + `parameter/`, parameterId);
    }

    // KPI tree
    getTreeNodes(treeId) {
        return http.get(API_ROOT + `kpiTree/${treeId}`);
    }

    setTreeData(treeId, data, existingTree) {
        if (existingTree) {
            return http.put(API_ROOT + `kpiTree`, data);
        } else {
            return http.post(API_ROOT + `kpiTree`, data);
        }
    }

    deleteTreeData(treeId) {
        return http.delete(API_ROOT + `kpiTree/${treeId}`);
    }

    getCalculateTreeData(treeId) {
        return http.get(API_ROOT + `kpiTreeNodes/${treeId}`);
    }

    setCalculateTreeData(data) {
        return http.post(API_ROOT + `kpiTreeNodes/`, data);
    }

    getTreeNodeCohorts(data) {
        return http.post(API_ROOT + `cohortOutput/`, data);
    }

    getCalculatedTreeList() {
        return http.get(API_ROOT + `listCalculatedTree/`);
    }

    getFilteredAnalysis(data) {
        return http.post(API_ROOT + `displayCalculatedTree/`, data);
    }

    getKPITreeFilter(treeID) {
        return http.get(API_ROOT + `listAggDataFilter/${treeID}/`);
    }

    getAnamoliesData(data) {
        return http.post(API_ROOT + `cohorteChart/`, data);
    }

    listCohortDriven() {
        return http.get(API_ROOT + `cohortDriven/`);
    }

    getFiltersForKPI() {
        return http.get(API_ROOT + `treeFilterAll/`);
    }

    getSequence() {
        return http.get(API_ROOT + `getSequence/`);
    }


    // by App provider
    getKPIsByDomain(path) {
        return http.get(API_ROOT + path);
    }

    getAssetClassCount(assetClass) {
        //return http.get(API_ROOT+`kpiTree/domainCount?domain=${assetClass}`);
        const token = util.getToken();
        return axios({
            method: `GET`,
            url: API_ROOT + `kpiTree/domainCount?domain=${assetClass}`,
            // url: API_ROOT+`kpiTree/domainCount`,
            headers: {Authorization: `Bearer ${token}`, "Access-Control-Allow-Origin": "*",}
        })
    }

}

export default new kpiService();