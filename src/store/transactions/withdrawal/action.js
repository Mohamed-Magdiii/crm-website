import {
  FETCH_WITHDRAWALS_START,
  FETCH_WITHDRAWALS_SUCCESS,
  MAKE_WITHDRAWAL_START,
  MAKE_WITHDRAWAL_SUCCESS,
  WITHDRAWAL_ERROR,
  MODAL_CLEAR
} from "./actionTypes";
export const fetchWithdrawalsStart = (params)=>{
  return {
    type:FETCH_WITHDRAWALS_START,
    payload:params
  };
};
export const fetchWithdrawalsSuccess = (data)=>{
  return {
    type:FETCH_WITHDRAWALS_SUCCESS,
    payload:data
  };
};
export const makeWithdrawalStart = (withdrawal)=>{
  return {
    type:MAKE_WITHDRAWAL_START,
    payload:{ withdrawal }
  };

};
export const makeWithdrawalSuccess = (withdrawal)=>{
  return {
    type:MAKE_WITHDRAWAL_SUCCESS,
    payload: { withdrawal }
  };
};
export const withdrawalError = (error)=>{
  return {
    type:WITHDRAWAL_ERROR,
    payload:{ error }
  };
};
export const modalClear = (data)=>{
  return {
    type:MODAL_CLEAR,
    payload:data
  };
};