import {
  FETCH_TRADING_ACCOUNTS_REQUESTED,
  FETCH_TRADING_ACCOUNTS_SUCCESS,
  FETCH_TRADING_ACCOUNTS_FAIL
} from "./actionTypes";


// fetch trading accounts
export const fetchTradingAccounts = (params = {}) => {
  return {
    type: FETCH_TRADING_ACCOUNTS_REQUESTED,
    payload: params
  };
};
export const fetchTradingAccountsSuccess = (data) => {
  return {
    type: FETCH_TRADING_ACCOUNTS_SUCCESS,
    paylad: data
  };
};
export const fetchTradingAccountsFail = (error) => {
  return {
    type: FETCH_TRADING_ACCOUNTS_FAIL,
    payload: { error }
  };
};