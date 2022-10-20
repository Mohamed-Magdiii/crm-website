import {
  call, put, takeEvery
} from "redux-saga/effects";
// Login Redux States
import {
  FETCH_ACCOUNT_TYPES_START,
  FETCH_TRADING_ACCOUNT_START,
  CREATE_TRADING_ACCOUNT_START,
  FETCH_TRADING_ACCOUNTS_REQUESTED,
} from "./actionTypes";

import {
  fetchTradingAccountsSuccess,
  fetchTradingAccountsFail,
  fetchAccountTypesEnd,
  fetchTradingAccountEnd,
  createAccountClear,
  createTradingAccountEnd
} from "./actions";
import { showErrorNotification, showSuccessNotification } from "store/notifications/actions";

//Include Both Helper File with needed methods
import * as accountsApi from "../../apis/tradingAccounts";

function * fetchTradingAccountsByLogin(params){
  try {
    const data = yield call(accountsApi.getTradingAccountByLogin, params);
    yield put(fetchTradingAccountsSuccess(data));
  } catch (err){
    yield put(fetchTradingAccountsFail(err.message));
  }
}

function * fetchAccountTypes(params){
  try {
    const data = yield call(accountsApi.getAccountTypes, params);    
    yield put(fetchAccountTypesEnd({ data }));
  }
  catch (error){
    yield put(fetchAccountTypesEnd({ error }));
  } 
}

function * fetchTradingAccounts(params){
  try {
    const data = yield call(accountsApi.getTradingAccounts, params);
    yield put(fetchTradingAccountsSuccess(data));
  } catch (err){
    yield put(fetchTradingAccountEnd(err.message));
  }
}

function * createTradingAccount(params){
  try {
    const data = yield call(accountsApi.createTradingAccount, params);    
    yield put(createTradingAccountEnd({ data }));
    yield put(createAccountClear());
    yield put(showSuccessNotification("Trading account created."));
  }
  catch (error){
    yield put(createTradingAccountEnd({ error }));
  } 
}

function * tradingAccountSaga(){
  yield takeEvery(FETCH_TRADING_ACCOUNTS_REQUESTED, fetchTradingAccountsByLogin);
  yield takeEvery(FETCH_ACCOUNT_TYPES_START, fetchAccountTypes);
  yield takeEvery(FETCH_TRADING_ACCOUNT_START, fetchTradingAccounts);
  yield takeEvery(CREATE_TRADING_ACCOUNT_START, createTradingAccount);
}

export default tradingAccountSaga;
