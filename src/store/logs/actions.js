import {
  GET_LOGS_START,
  GET_LOGS_END,
} from "./actionTypes";

export const fetchLogs = (params = {})=>{
  return {
    type: GET_LOGS_START,
    payload: params
  };
};
export const fetchLogsEnd = (data)=>{
  return {
    type: GET_LOGS_END,
    payload: data
  };
};