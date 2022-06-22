import {
  FETCH_DEPOSITS_START,
  FETCH_DEPOSITS_SUCCESS,
  DEPOSIT_ERROR,
  ADD_DEPOSIT_START,
  ADD_DEPOSIT_SUCCESS,
  MODAL_CLEAR,
  DEPOSIT_APPROVE,
  DEPOSIT_REJECT,
  DEPOSIT_STATUS_CHANGE_SUCCESS,
  FETCH_CLIENT_DEPOSITS_REQUESTED,
  FETCH_CLIENT_DEPOSITS_SUCCESS,
  FETCH_CLIENT_DEPOSITS_FAIL,
} from "./actionTypes";
export const fetchDepositsStart = (params = {})=>{
  return {
    type:FETCH_DEPOSITS_START,
    payload:params
  };
};
export const fetchDepositsSuccess = (data)=>{
  return {
    type:FETCH_DEPOSITS_SUCCESS,
    payload:data
  };
};
export const addDepositStart = (deposit)=>{
  return {
    type:ADD_DEPOSIT_START,
    payload:{ deposit }
  };
};
export const addDepositSuccess = (deposit)=>{
  return {
    type:ADD_DEPOSIT_SUCCESS,
    payload:{ deposit }
  };
   
};
export const depositError = (error)=>{
  return {
    type:DEPOSIT_ERROR,
    payload:{ error }
  };
};
export const modalClear = (data)=>{
  return {
    type:MODAL_CLEAR,
    payload:data
  };
};
export const depositApproveStart = (id)=>{
  return {
    type:DEPOSIT_APPROVE,
    payload:{ id }
  };
};
export const depositRejectStart = (id)=>{
  return {
    type:DEPOSIT_REJECT,
    payload: { id }
  };
};
export const transactionStateChange = (data)=>{
  return {
    type:DEPOSIT_STATUS_CHANGE_SUCCESS,
    payload: data
  };
};

// fetch client deposits
export const fetchClientDeposits = (params = {}) => {
  return {
    type: FETCH_CLIENT_DEPOSITS_REQUESTED,  
    payload: params
  };
};
export const fetchClientDepositsSuccess = (data) => {
  return {
    type: FETCH_CLIENT_DEPOSITS_SUCCESS,
    payload: data
  };
};
export const fetchClientDepositsFail = (error) => {
  return {
    type: FETCH_CLIENT_DEPOSITS_FAIL,
    payload: { error }
  };
};