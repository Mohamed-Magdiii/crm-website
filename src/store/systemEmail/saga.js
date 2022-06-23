import {
  call, delay, put, takeEvery
} from "redux-saga/effects";
// import login redux states (started or requested)
import {
  FETCH_SYSTEM_EMAILS_REQUESTED,
  FETCH_SYSTEM_EMAIL_BY_ID_REQUESTED,
  ADD_SYSTEM_EMAIL_REQUESTED,
  DELETE_SYSTEM_EMAIL_REQUESTED,
  EDIT_SYSTEM_EMAIL_REQUESTED,
  EDIT_SYSTEM_EMAIL_CONTENT_REQUESTED,
  FETCH_SYSTEM_EMAIL_HTML_REQUESTED
} from "./actionTypes";
// import all actions except the login oncs (started or requested)
import {
  fetchSystemEmailsSuccess,
  fetchSystemEmailsFail,

  fetchSystemEmailByIdSuccess,
  fetchSystemEmailByIdFail,
  fetchSystemEmailByIdClear,

  addSystemEmailSuccess,
  addSystemEmailFail,
  addSystemEmailClear,

  deleteSystemEmailSuccess,
  deleteSystemEmailFail,
  
  editSystemEmailSuccess,
  editSystemEmailFail,
  editSystemEmailClear,

  editSystemEmailContentSuccess,
  editSystemEmailContentFail,
  editSystemEmailContentClear,

  fetchSystemEmailHTMLSuccess,
  fetchSystemEmailHTMLFail
} from "./actions";
import * as systemEmailApi from "../../apis/systemEmails";
import { showErrorNotification, showSuccessNotification } from "store/notifications/actions";

function * fetchSystemEmails(params){
  try {
    const data = yield call(systemEmailApi.getSystemEmails, params);
    yield put(fetchSystemEmailsSuccess(data));
  } catch (error){
    yield put(fetchSystemEmailsFail(error));
  }
}

function * fetchSystemEmailById(params){
  try {
    const data = yield call(systemEmailApi.getSystemEmailById, params);
    const { result } = data;
    yield put(fetchSystemEmailByIdSuccess({
      result,
      id: params.payload
    }));
    yield delay(2000);
    yield put(fetchSystemEmailByIdClear());
  } catch (error){
    yield put(fetchSystemEmailByIdFail({ error: error.message }));
  }
}

function * addSystemEmail(params){
  try {
    const data = yield call(systemEmailApi.addSystemEmail, params);
    const { result } = data;
    yield put(addSystemEmailSuccess(result));
    yield put(showSuccessNotification("System email added successfully"));
    // yield delay(2000);
    yield put(addSystemEmailClear());
  } catch (error){
    yield put(addSystemEmailFail(error));
  }
}

function * editSystemEmail(params){
  try {
    const data = yield call(systemEmailApi.editSystemEmail, params);
    yield put(editSystemEmailSuccess({
      data,
      id: params.id
    }));
    yield delay(2000);
    yield put(editSystemEmailClear());
  } catch (error){
    yield put(editSystemEmailFail({ error: error.message }));
  }
}

function * editSystemEmailContent(params){
  try {
    const data = yield call(systemEmailApi.editSystemEmailContent, params);
    yield put(editSystemEmailContentSuccess({
      data,
      id: params.id
    }));
    yield delay(2000);
    yield put(editSystemEmailContentClear());
  } catch (error){
    yield put(editSystemEmailContentFail({ error: error.message }));
  }
}

function * deleteSystemEmail(params){
  try {
    const data = yield call(systemEmailApi.deleteSystemEmail, params);
    const { result } = data;
    yield put(deleteSystemEmailSuccess({
      result,
      id: params.payload 
    }));
  } catch (error){
    yield put(deleteSystemEmailFail({ error: error.message }));
  }
}

function * fetchSystemEmailHTML(params){
  try {
    const data = yield call(systemEmailApi.fetchSystemEmailHTML, params);
    yield put(fetchSystemEmailHTMLSuccess(data));
  } catch (error){
    yield put(fetchSystemEmailHTMLFail({ error: error.message }));
  }
}

function * authSaga(){
  yield takeEvery(FETCH_SYSTEM_EMAILS_REQUESTED, fetchSystemEmails);
  yield takeEvery(FETCH_SYSTEM_EMAIL_BY_ID_REQUESTED, fetchSystemEmailById);
  yield takeEvery(ADD_SYSTEM_EMAIL_REQUESTED, addSystemEmail);
  yield takeEvery(EDIT_SYSTEM_EMAIL_REQUESTED, editSystemEmail);
  yield takeEvery(EDIT_SYSTEM_EMAIL_CONTENT_REQUESTED, editSystemEmailContent);
  yield takeEvery(DELETE_SYSTEM_EMAIL_REQUESTED, deleteSystemEmail);
  yield takeEvery(FETCH_SYSTEM_EMAIL_HTML_REQUESTED, fetchSystemEmailHTML);
}

export default authSaga;