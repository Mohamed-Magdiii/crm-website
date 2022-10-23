import {
  FETCH_TRADING_ACCOUNTS_REQUESTED,
  FETCH_TRADING_ACCOUNTS_SUCCESS,
  FETCH_TRADING_ACCOUNTS_FAIL,
  FETCH_ACCOUNT_TYPES_START,
  FETCH_ACCOUNT_TYPES_END,
  FETCH_TRADING_ACCOUNT_START,
  FETCH_TRADING_ACCOUNT_END,
  CREATE_TRADING_ACCOUNT_START,
  CREATE_TRADING_ACCOUNT_END,
  CREATE_TRADING_ACCOUNT_CLEAR
} from "./actionTypes";

export const fetchAccountTypes = (params = {})=>{
  return {
    type:FETCH_ACCOUNT_TYPES_START,
    payload: params
  };
};
export const fetchAccountTypesEnd = (data)=>{
  return {
    type:FETCH_ACCOUNT_TYPES_END,
    payload: data
  };
};

// fetch trading account by login
export const fetchTradingAccountsByLogin = (params = {}) => {
  return {
    type: FETCH_TRADING_ACCOUNTS_REQUESTED,
    payload: params
  };
};

export const fetchTradingAccounts = (params = {})=>{
  return {
    type:FETCH_TRADING_ACCOUNT_START,
    payload: params
  };
};

export const fetchTradingAccountsSuccess = (data) => {
  return {
    type: FETCH_TRADING_ACCOUNTS_SUCCESS,
    payload: data
  };
};

export const fetchTradingAccountsFail = (error) => {
  return {
    type: FETCH_TRADING_ACCOUNTS_FAIL,
    payload: { error }
  };
};

export const fetchTradingAccountEnd = (data)=>{
  return {
    type:FETCH_TRADING_ACCOUNT_END,
    payload: data
  };
};

export const createTradingAccount = (params = {})=>{
  return {
    type:CREATE_TRADING_ACCOUNT_START,
    payload: params
  };
};

export const createTradingAccountEnd = (data)=>{
  return {
    type:CREATE_TRADING_ACCOUNT_END,
    payload: data
  };
};

export const createAccountClear = (data)=>{
  return {
    type:CREATE_TRADING_ACCOUNT_CLEAR,
    payload: data
  };
};
