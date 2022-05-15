import {
  call,
  put,
  takeEvery,
  delay
} from "redux-saga/effects";
import { ADD_DEPOSIT_START, FETCH_DEPOSITS_START } from "./actionTypes";
import {
  addDepositSuccess, depositError, fetchDepositsSuccess, modalClear
} from "./action";
import { makeDeposit, getDeposits } from "apis/deposit";
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
function * depositSaga(){
  yield takeEvery(FETCH_DEPOSITS_START, fetchDeposits);
  yield takeEvery(ADD_DEPOSIT_START, addDeposit);
}
export default depositSaga;