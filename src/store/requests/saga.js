import {
  call, put, takeEvery 
} from "redux-saga/effects";
import {
  fetchIbStartsSuccess, fetchIbStartsError, ibRequestStateChange, ibRequestToApproveStateChange, ibRequestToRejectStateChange,
  fetchLeverageStartsSuccess, fetchLeverageStartsError, leverageRequestToApproveStateChange, leverageRequestToRejectStateChange
}  from "./actions";
import * as actionTypes from "./actionTypes";
import * as requestApi from "../../apis/requests";


function * fetchIbs(params) {
  try {
    const data = yield call(requestApi.getIbsRequsts, params);
    yield put(fetchIbStartsSuccess(data.result));
  }
  catch (error) {
    yield put(fetchIbStartsError(error));
  }
}


function* ibRequestApprove( params){
  try {
    const data = yield call(requestApi.approveIbRequest, { requestId: params.payload });
    const { result } = data;
    yield put(ibRequestToApproveStateChange(result));
  } catch (error) {
  }
  
}

function* ibRequestReject( params){
  try {
    const data = yield call(requestApi.rejectIbRequest, { requestId: params.payload });
    const { result } = data;
    yield put(ibRequestToRejectStateChange(result));
  } catch (error) {
  }
  
}

function * fetchLeverages(params) {
  try {
    const data = yield call(requestApi.getLeveragesRequsts, params);
    yield put(fetchLeverageStartsSuccess(data.result));
  }
  catch (error) {
    yield put(fetchLeverageStartsError(error));
  }
}


function* leverageRequestApprove( params){
  try {
    const data = yield call(requestApi.approveLeverageRequest, { requestId: params.payload });
    const { result } = data;
    yield put(leverageRequestToApproveStateChange(result));
  } catch (error) {
  }
}

function* leverageRequestReject( params){
  try {
    const data = yield call(requestApi.rejectLeverageRequest, { requestId: params.payload });
    const { result } = data;
    yield put(leverageRequestToRejectStateChange(result));
  } catch (error) {
  }
}

function* requestSaga() {
  yield takeEvery(actionTypes.FETCH_IB_REQUESTS_START, fetchIbs);
  yield takeEvery(actionTypes.IB_REQUEST_APPROVE_START, ibRequestApprove);
  yield takeEvery(actionTypes.IB_REQUEST_REJECT_START, ibRequestReject);
  yield takeEvery(actionTypes.FETCH_LEVERAGE_REQUESTS_START, fetchLeverages);
  yield takeEvery(actionTypes.LEVERAGE_REQUEST_APPROVE_START, leverageRequestApprove);
  yield takeEvery(actionTypes.LEVERAGE_REQUEST_REJECT_START, leverageRequestReject);
}

export default requestSaga;