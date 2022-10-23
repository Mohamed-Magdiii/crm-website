import {
  call,
  put,
  takeEvery,
  delay
} from "redux-saga/effects";
import { 
  FETCH_INTERNAL_TRANSFERS_REQUESTED,
  ADD_INTERNAL_TRANSFER_REQUESTED
} from "./actionTypes";
import {
  fetchInternalTransfersSuccess,
  fetchInternalTransfersFail,

  addInternalTransferSuccess,
  addInternalTransferFail,
  addInternalTransferClear,
  addInternalTransferErrorClear
} from "./actions";
import * as internalTransferApis from "apis/internalTransfer";
import { showSuccessNotification } from "store/notifications/actions";

function * fetchInternalTransfers(params){
  try {
    const data = yield call(internalTransferApis.getInternalTransfers, params);
    yield put(fetchInternalTransfersSuccess(data));
  } catch (err){
    yield put(fetchInternalTransfersFail(err.message));
  }
}

function * addInternalTransfer(params){
  try {
    const data = yield call(internalTransferApis.postInternalTransfer, params);
    yield put(addInternalTransferSuccess(data));
    yield put(showSuccessNotification("Internal transfer Added Successfully"));
    yield put(addInternalTransferClear());
  } catch (err){
    yield put(addInternalTransferFail(err.message));
    yield delay(5000);
    yield put(addInternalTransferErrorClear());
  }
}

function * internalTransferSaga(){
  yield takeEvery(FETCH_INTERNAL_TRANSFERS_REQUESTED, fetchInternalTransfers);
  yield takeEvery(ADD_INTERNAL_TRANSFER_REQUESTED, addInternalTransfer);
}
export default internalTransferSaga;