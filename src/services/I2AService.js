import http from "./httpService";
import {API_ROOT} from "../config";

// Actions
export function listActions(data) {
    return http.post(`${API_ROOT}v2/listActions/`, data);
}

export function createAction(data) {
    return http.post(`${API_ROOT}action/`, data);
}

export function updateAction(data) {
    return http.put(`${API_ROOT}action/`, data);
}

export function deleteAction(action_id) {
    return http.delete(`${API_ROOT}action/${action_id}`, {headers: {'Access-Control-Allow-Origin': '*'}});
}

export function pushAction(data) {
    return http.post(`${API_ROOT}pushAction/`, data);
}

export function markAsCompleteAction(data) {
    return http.post(`${API_ROOT}completeAction/`, data);
}


export function listActionsMonitoring(data) {
    return http.post(`${API_ROOT}actionMonitoring/`, data);
}


// Experiments
export function fetchExperiment(actionId) {
    return http.get(`${API_ROOT}listExperimentByAction/${actionId}`);
}

export function createExperiment(data) {
    return http.post(`${API_ROOT}experiments/`, data);
}

export function updateExperiment(data) {
    return http.put(`${API_ROOT}experiments/`, data);
}

export function deleteExperiment(data) {
    return http.patch(`${API_ROOT}/deleteExperiments/`, data);
}