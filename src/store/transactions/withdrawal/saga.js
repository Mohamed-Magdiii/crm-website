import {
  call,
  put,
  takeEvery,
  delay
} from "redux-saga/effects";
import { addWithdrawal, getWithdrawals} from "apis/withdrawal";
import { MAKE_WITHDRAWAL_START, FETCH_WITHDRAWALS_START } from "./actionTypes";
import { 
  makeWithdrawalSuccess, fetchWithdrawalsSuccess, withdrawalError, modalClear
} from "./action";
function *fetchWithdrawals(params){
  try {
    const data = yield call(getWithdrawals, params);
    yield put(fetchWithdrawalsSuccess(data));
  } catch {
    yield put(withdrawalError("Error happened while fetching withdrawals"));
  }
  
}
function * makeWithdrawal({ payload:{ withdrawal } }){
  try {
    const data = yield call(addWithdrawal, withdrawal);
    const { status, result } = data;
    
    if (status){
      
      yield put(makeWithdrawalSuccess(result));
      yield delay(3000);
      yield put(modalClear());
    }
    
  } catch (error){
    yield put(withdrawalError("An error happened.Please try again"));
  }

}
function * withdrawalSaga(){
  yield takeEvery(FETCH_WITHDRAWALS_START, fetchWithdrawals);
  yield takeEvery(MAKE_WITHDRAWAL_START, makeWithdrawal);
}
export default withdrawalSaga;