import {
  call,
  put,
  takeEvery
} from "redux-saga/effects";
import { 
  FETCH_FOREX_DEPOSITS_REQUESTED,
  ADD_FOREX_DEPOSIT_REQUESTED
} from "./actionTypes";
import {
  fetchForexDepositsSuccess,
  fetchForexDepositsFail,

  addForexDepositSuccess,
  addForexDepositFail,
  addForexDepositClear
} from "./actions";
import * as forexDepositApis from "apis/forexDeposit";
import { showSuccessNotification } from "store/notifications/actions";

function * fetchForexDeposits(params){
  try {
    const data = yield call(forexDepositApis.getForexDeposits, params);
    yield put(fetchForexDepositsSuccess(data));
  } catch (err){
    yield put(fetchForexDepositsFail(err.message));
  }
}

function * addForexDeposit(params){
  try {
    const data = yield call(forexDepositApis.postForexDeposit, params);
    yield put(addForexDepositSuccess(data));
    yield put(showSuccessNotification("Deposit Added Successfully"));
    yield put(addForexDepositClear());
  } catch (err){
    yield put(addForexDepositFail(err.message));
  }
}

function * forexDepositSaga(){
  yield takeEvery(FETCH_FOREX_DEPOSITS_REQUESTED, fetchForexDeposits);
  yield takeEvery(ADD_FOREX_DEPOSIT_REQUESTED, addForexDeposit);
}
export default forexDepositSaga;