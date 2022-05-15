import {
  FETCH_DEPOSITS_START,
  FETCH_DEPOSITS_SUCCESS,
  DEPOSIT_ERROR,
  ADD_DEPOSIT_START,
  ADD_DEPOSIT_SUCCESS,
  MODAL_CLEAR
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