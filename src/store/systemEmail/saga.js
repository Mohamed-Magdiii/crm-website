import {
  call, delay, put, takeEvery
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
  addSystemEmailClear,
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

// this issue is a 100% right here data is not defined
// the calling isn't returning any data
// in the addSystemEmail function let's see what we can do 
// addSystemEmail function in the API file in doesn't return data for some reason 
function * addSystemEmail(params){
  try {
    const data = yield call(systemEmailApi.addSystemEmail, params);
    const { result } = data;
    yield put(addSystemEmailSuccess(result));
    yield delay(2000);
    yield put(addSystemEmailClear());
  } catch (error){
    console.log("error from saga file", error);
    yield put(addSystemEmailFail(error));
  }
}

// the same issue with the axiosHnadler not returning any data 
// so any function following it will never work 
function * editSystemEmail(params){
  try {
    const data = yield call(systemEmailApi.editSystemEmail, params);
    console.log("returned data from saga file", data);
    yield put(editSystemEmailSuccess({
      data,
      id: data.params.id
    }));
  } catch (error){
    console.log("error from saga file", error);
    yield put(editSystemEmailFail(error));
  }
}

function * deleteSystemEmail(params){
  try {
    const data = yield call(systemEmailApi.deleteSystemEmail, params);
    console.log("data from saga file", data);
    const { result } = data;
    yield put(deleteSystemEmailSuccess({
      result,
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