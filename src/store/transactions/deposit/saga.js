import {
  call,
  put,
  takeEvery,
  delay
} from "redux-saga/effects";
import { 
  ADD_DEPOSIT_START, 
  FETCH_DEPOSITS_START, 
  DEPOSIT_APPROVE, 
  DEPOSIT_REJECT, 

  FETCH_CLIENT_DEPOSITS_REQUESTED
} from "./actionTypes";
import {
  addDepositSuccess, 
  depositError, 
  fetchDepositsSuccess, 
  modalClear, 
  transactionStateChange,

  fetchClientDepositsSuccess,
  fetchClientDepositsFail,
} from "./action";
import {
  makeDeposit, 
  getDeposits, 
  aprroveDeposit, 
  rejectDeposit,
  getClientDeposits
} from "apis/deposit";
function * fetchDeposits(params){
  try {
    const data = yield call(getDeposits, params);
    yield put(fetchDepositsSuccess(data));
  } catch (error){
    yield put(depositError("Error happened during fetching data"));
  }
  
}
function * addDeposit({ payload:{ deposit } }){
  try {
    const data = yield call(makeDeposit, deposit);
    const { status, result } = data;
  
    if (status === true){
      yield put(addDepositSuccess(result));
      yield delay(3000);
      yield put(modalClear());
    }
      
  } catch (error){
    
    yield  put(depositError("Deposit has failed.Please check your credentials"));
  }
  
}
function* depositApprove({ payload:{ id } }){
  try  {
    const data = yield call(aprroveDeposit, id);
    const { result } = data;
    yield put(transactionStateChange(result));
  } catch (error){

  }
 
 
}
function * depositReject({ payload: { id } }){
  
  const data = yield call(rejectDeposit, id);
  const { result } = data;
  yield put(transactionStateChange(result));
 

}

function * fetchClientDeposits(params){
  try {
    const data = yield call(getClientDeposits, params);
    yield put(fetchClientDepositsSuccess(data));
  } catch (error){ 
    yield put(fetchClientDepositsFail({ error: error.message }));
  }
}

function * depositSaga(){
  yield takeEvery(FETCH_DEPOSITS_START, fetchDeposits);
  yield takeEvery(ADD_DEPOSIT_START, addDeposit);
  yield takeEvery(DEPOSIT_REJECT, depositReject);
  yield takeEvery(DEPOSIT_APPROVE, depositApprove);
  yield takeEvery(FETCH_CLIENT_DEPOSITS_REQUESTED, fetchClientDeposits);
}
export default depositSaga;