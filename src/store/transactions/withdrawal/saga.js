import {
  call,
  put,
  takeEvery,
  delay
} from "redux-saga/effects";
import { 
  addWithdrawal, 
  getWithdrawals, 
  approveWithdrawal, 
  rejectWithdrawal,
  getClientWithdrawals
} from "apis/withdrawal";
import { 
  MAKE_WITHDRAWAL_START, 
  FETCH_WITHDRAWALS_START, 
  WITHDRAW_APPROVE, 
  WITHDRAW_REJECT,
  FETCH_CLIENT_WITHDRAWALS_REQUESTED
} from "./actionTypes";
import { 
  makeWithdrawalSuccess, 
  fetchWithdrawalsSuccess, 
  withdrawalError, 
  modalClear, 
  withdrawStatusChangeSuccess,

  fetchClientWithdrawalsSuccess,
  fetchClientWithdrawalsFail, 
  errorClear
} from "./action";
import { showSuccessNotification } from "store/notifications/actions";
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
      yield put(showSuccessNotification(`Withdrawal has been ${result.status}`));
      // yield delay(1000);
      yield put(modalClear());
    }
    
  } catch (error){
    yield put(withdrawalError(error.message));
    // yield delay(1000);
    yield put(errorClear());
  }

}
function * WithdrawReject ({ payload : { id, customerId } }){
  try {
    const data = yield call(rejectWithdrawal, id, customerId);
    const { result } = data;
    yield put(withdrawStatusChangeSuccess(result));
  } catch (error){

  }

}
function * withdrawApprove({ payload : { id, customerId } }){
  try {
    
    const data = yield call(approveWithdrawal, id, customerId);
  
    const { result } = data;
    yield put(withdrawStatusChangeSuccess(result));
  } catch (error){

  }
 
}

function * fetchClientWithdrawals(params){
  try {
    const data = yield call(getClientWithdrawals, params);
    yield put(fetchClientWithdrawalsSuccess(data));
  } catch (error){ 
    yield put(fetchClientWithdrawalsFail({ error: error.message }));
  }
}

function * withdrawalSaga(){
  yield takeEvery(FETCH_WITHDRAWALS_START, fetchWithdrawals);
  yield takeEvery(MAKE_WITHDRAWAL_START, makeWithdrawal);
  yield takeEvery(WITHDRAW_APPROVE, withdrawApprove);
  yield takeEvery( WITHDRAW_REJECT, WithdrawReject);
  yield takeEvery( FETCH_CLIENT_WITHDRAWALS_REQUESTED, fetchClientWithdrawals);
}
export default withdrawalSaga;