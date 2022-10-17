import {
  call, put, takeEvery 
} from "redux-saga/effects";
import {
  fetchIbStartsSuccess, fetchIbStartsError, ibRequestStateChange, ibRequestToApproveStateChange, ibRequestToRejectStateChange 
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


function* requestSaga() {
  yield takeEvery(actionTypes.FETCH_IB_REQUESTS_START, fetchIbs);
  yield takeEvery(actionTypes.IB_REQUEST_APPROVE_START, ibRequestApprove);
  yield takeEvery(actionTypes.IB_REQUEST_REJECT_START, ibRequestReject);
}

export default requestSaga;