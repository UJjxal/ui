import mode from './httpService';
import { API_ROOT } from "../config";
const { get, post, put} = mode;

export function getkeyInsight(insight_id) {
  return get(`${API_ROOT}getkeyInsight/${insight_id}`, { headers: { 'Access-Control-Allow-Origin': '*' } });
}

export function listKeyInsights(data) {
  return post(`${API_ROOT}listKeyInsight/`, data);
}

export function addkeyInsight(data) {
  return post(`${API_ROOT}keyInsight/`, data);
}

export function updatekeyInsight(data) {
  return put(`${API_ROOT}keyInsight/`, data);
}

export function deletekeyInsight(insight_id) {
  return mode.delete(`${API_ROOT}keyInsight/${insight_id}`);
}