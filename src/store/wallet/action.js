import { FETCH_WALLET_START, FETCH_WALLET_SUCCESS } from "./actionTypes";

export const fetchWalletStart = (params)=>{
  return {
    type:FETCH_WALLET_START,
    payload:params
  };
};
export const fetchWalletSuccess = (data)=>{
  return {
    type:FETCH_WALLET_SUCCESS,
    payload:data
  };
};