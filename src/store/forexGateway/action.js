import {
  FETCH_FOREX_GATEWAYS_START, 
  FETCH_FOREX_GATEWAYS_SUCCESS,
  FETCH_WITHDRAWALS_FOREX_GATEWAYS_START,
  FETCH_WITHDRAWALS_FOREX_GATEWAYS_SUCCESS
} from "./actionTypes";

export const fetchForexGatewaysStart = (params)=>{
  return {
    type:FETCH_FOREX_GATEWAYS_START,
    payload:params
  };
};
export const fetchForexGatewaysSuccess = (data)=>{
  return {
    type:FETCH_FOREX_GATEWAYS_SUCCESS,
    payload:data
  };
};
export const fetchForexGatewaysOfWithdrawalsStart = (params)=>{
  return {
    type:FETCH_WITHDRAWALS_FOREX_GATEWAYS_START,
    payload:params
  };
};
export const fetchForexGatewaysOfWithdrawalsSuccess = (data)=>{
  return {
    type:FETCH_WITHDRAWALS_FOREX_GATEWAYS_SUCCESS,
    payload:data
  };
};