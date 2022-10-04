import {
  call,
  put,
  takeEvery
} from "redux-saga/effects";
import { 
  FETCH_TRADING_ACCOUNTS_REQUESTED
} from "./actionTypes";
import {
  fetchTradingAccountsSuccess,
  fetchTradingAccountsFail
} from "./actions";
import * as tradingAccountsApis from "apis/tradingAccounts";
// import { showSuccessNotification } from "store/notifications/actions";

function * fetchTradingAccounts(params){
  try {
    const data = yield call(tradingAccountsApis.getTradingAccounts, params);
    yield put(fetchTradingAccountsSuccess(data));
  } catch (err){
    yield put(fetchTradingAccountsFail(err.message));
  }
}

function * tradingAccountSaga(){
  yield takeEvery(FETCH_TRADING_ACCOUNTS_REQUESTED, fetchTradingAccounts);
}
export default tradingAccountSaga;