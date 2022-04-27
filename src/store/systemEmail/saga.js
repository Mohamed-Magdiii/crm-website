import {
  call, put, takeEvery
} from "redux-saga/effects";
// import login redux states (started or requested)
import {
  FETCH_SYSTEM_EMAILS_REQUESTED,
  ADD_SYSTEM_EMAIL_REQUESTED,
  DELETE_SYSTEM_EMAIL_REQUESTED,
  EDIT_SYSTEM_EMAIL_REQUESTED
} from "./actionTypes";
// import all actions except the login oncs (started or requested)
import {
  fetchSystemEmailsSuccess,
  fetchSystemEmailsFail,
  addSystemEmailSuccess,
  addSystemEmailFail,
  deleteSystemEmailSuccess,
  deleteSystemEmailFail,
  editSystemEmailSuccess,
  editSystemEmailFail
} from "./actions";
import * as systemEmailApi from "../../apis/systemEmails";

function * fetchSystemEmails(params){
  try {
    const data = yield call(systemEmailApi.getSystemEmails, params);
    yield put(fetchSystemEmailsSuccess(data));
  } catch (error){
    yield put(fetchSystemEmailsFail(error));
  }
}

function * addSystemEmail(params){
  try {
    const data = yield call(systemEmailApi.addSystemEmail, params);
    yield put(addSystemEmailSuccess(data));
  } catch (error){
    yield put(addSystemEmailFail(error));
  }
}

function * editSystemEmail(params){
  try {
    const data = yield call(systemEmailApi.editSystemEmail, params);
    yield put(editSystemEmailSuccess({
      data,
      id: data.params.id
    }));
  } catch (error){
    yield put(editSystemEmailFail(error));
  }
}

function * deleteSystemEmail(params){
  try {
    const data = yield call(systemEmailApi.deleteSystemEmail, params);
    const { result } = data;
    yield put(deleteSystemEmailSuccess({
      result,
      // params.payload = id of deleted system email
      id: params.payload 
    }));
  } catch (error){
    yield put(deleteSystemEmailFail({ error: error.message }));
  }
}

function * authSaga(){
  yield takeEvery(FETCH_SYSTEM_EMAILS_REQUESTED, fetchSystemEmails);
  yield takeEvery(ADD_SYSTEM_EMAIL_REQUESTED, addSystemEmail);
  yield takeEvery(EDIT_SYSTEM_EMAIL_REQUESTED, editSystemEmail);
  yield takeEvery(DELETE_SYSTEM_EMAIL_REQUESTED, deleteSystemEmail);
}

export default authSaga;