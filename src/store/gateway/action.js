import { FETCH_GATEWAYS_START, FETCH_GATEWAYS_SUCCESS } from "./actionTypes";

export const fetchGatewaysStart = (params)=>{
  return {
    type:FETCH_GATEWAYS_START,
    payload:params
  };
};
export const fetchGatewaysSuccess = (data)=>{
  return {
    type:FETCH_GATEWAYS_SUCCESS,
    payload:data
  };
};