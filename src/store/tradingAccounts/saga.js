import {
  call,
  put,
  takeEvery
} from "redux-saga/effects";
import { 
  FETCH_TRADING_ACCOUNTS_REQUESTED,
  FETCH_TRADING_ACCOUNTS_BY_CUSTOMERID_REQUESTED
} from "./actionTypes";
import {
  fetchTradingAccountsSuccess,
  fetchTradingAccountsFail,
  fetchTradingAccountsByCustomerIDSuccess,
  fetchTradingAccountsByCustomerIDFail
} from "./actions";
import * as tradingAccountsApis from "apis/tradingAccounts";

function * fetchTradingAccounts(params){
  try {
    const data = yield call(tradingAccountsApis.getTradingAccountByLogin, params);
    yield put(fetchTradingAccountsSuccess(data));
  } catch (err){
    yield put(fetchTradingAccountsFail(err.message));
  }
}

function * fetchTradingAccountsByCustomerId(params){
  try {
    const data = yield call(tradingAccountsApis.getTradingAccountsByCustomerId, params);
    yield put(fetchTradingAccountsByCustomerIDSuccess(data));
  } catch (err){
    yield put(fetchTradingAccountsByCustomerIDFail(err.message));
  }
}

function * tradingAccountSaga(){
  yield takeEvery(FETCH_TRADING_ACCOUNTS_REQUESTED, fetchTradingAccounts);
  yield takeEvery(FETCH_TRADING_ACCOUNTS_BY_CUSTOMERID_REQUESTED, fetchTradingAccountsByCustomerId);
}
export default tradingAccountSaga;