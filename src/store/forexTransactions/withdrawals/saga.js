import {
  call,
  put,
  takeEvery
} from "redux-saga/effects";
import { 
  FETCH_FOREX_WITHDRAWALS_REQUESTED,
  ADD_FOREX_WITHDRAWAL_REQUESTED
} from "./actionTypes";
import {
  fetchForexWithdrawalsSuccess,
  fetchForexWithdrawalsFail,

  addForexWithdrawalSuccess,
  addForexWithdrawalFail,
  addForexWithdrawalClear
} from "./actions";
import * as forexWithdrawalApis from "apis/forexWithdrawal";
import { showSuccessNotification } from "store/notifications/actions";

function * fetchForexWithdrawals(params){
  try {
    const data = yield call(forexWithdrawalApis.getForexWithdrawals, params);
    yield put(fetchForexWithdrawalsSuccess(data));
  } catch (err){
    yield put(fetchForexWithdrawalsFail(err.message));
  }
}

function * addForexWithdrawal(params){
  try {
    const data = yield call(forexWithdrawalApis.postForexWithdrawal, params);
    yield put(addForexWithdrawalSuccess(data));
    yield put(showSuccessNotification("Withdrawal Added Successfully"));
    yield put(addForexWithdrawalClear());
  } catch (err){
    yield put(addForexWithdrawalFail(err.message));
  }
}

function * forexWithdrawalSaga(){
  yield takeEvery(FETCH_FOREX_WITHDRAWALS_REQUESTED, fetchForexWithdrawals);
  yield takeEvery(ADD_FOREX_WITHDRAWAL_REQUESTED, addForexWithdrawal);
}
export default forexWithdrawalSaga;