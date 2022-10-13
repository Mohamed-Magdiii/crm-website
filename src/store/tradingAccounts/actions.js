import {
  FETCH_TRADING_ACCOUNTS_REQUESTED,
  FETCH_TRADING_ACCOUNTS_SUCCESS,
  FETCH_TRADING_ACCOUNTS_FAIL,

  FETCH_TRADING_ACCOUNTS_BY_CUSTOMERID_REQUESTED,
  FETCH_TRADING_ACCOUNTS_BY_CUSTOMERID_SUCCESS,
  FETCH_TRADING_ACCOUNTS_BY_CUSTOMERID_FAIL
} from "./actionTypes";


// fetch trading account by login
export const fetchTradingAccounts = (params = {}) => {
  return {
    type: FETCH_TRADING_ACCOUNTS_REQUESTED,
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

// fetch trading accounts by customer ID
export const fetchTradingAccountsByCustomerID = (params = {}) => {
  return {
    type: FETCH_TRADING_ACCOUNTS_BY_CUSTOMERID_REQUESTED,
    payload: params
  };
};
export const fetchTradingAccountsByCustomerIDSuccess = (data) => {
  return {
    type: FETCH_TRADING_ACCOUNTS_BY_CUSTOMERID_SUCCESS,
    payload: data
  };
};
export const fetchTradingAccountsByCustomerIDFail = (error) => {
  return {
    type: FETCH_TRADING_ACCOUNTS_BY_CUSTOMERID_FAIL,
    payload: { error }
  };
};