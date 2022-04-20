import {
  call, put, takeEvery
} from "redux-saga/effects";
// import login redux states (started or requested)
import {
  FETCH_EMAIL_TEMPLATES_REQUESTED,
  ADD_EMAIL_TEMPLATE_REQUESTED,
  DELETE_EMAIL_TEMPLATE_REQUESTED,
  EDIT_EMAIL_TEMPLATE_REQUESTED
} from "./actionTypes";
// import all actions except the login oncs (started or requested)
import {
  fetchEmailTemplatesSuccess,
  fetchEmailTemplatesFail,
  addEmailTemplateSuccess,
  addEmailTemplateFail,
  deleteEmailTemplateSuccess,
  deleteEmailTemplateFail,
  editEmailTemplateFail,
  editEmailTemplateSuccess
} from "./actions";
import * as emailTemplateApi from "../../apis/emailTemplates";

function * fetchEmailTemplates(params){
  try {
    const data = yield call(emailTemplateApi.getEmailTemplates, params);
    yield put(fetchEmailTemplatesSuccess(data));
  } catch (error){
    yield put(fetchEmailTemplatesFail(error));
  }
}

function * addEmailTemplate(params){
  try {
    const data = yield call(emailTemplateApi.addEmailTemplate, params);
    yield put(addEmailTemplateSuccess(data));
  } catch (error){
    yield put(addEmailTemplateFail(error));
  }
}

function * editEmailTemplate(params){
  try {
    const data = yield call(emailTemplateApi.editEmailTemplate, params);
    yield put(editEmailTemplateSuccess({
      data,
      id: data.params.id
    }));
  } catch (error){
    yield put(editEmailTemplateFail(error));
  }
}

function * deleteEmailTemplate(params){
  try {    
    const data = yield call(emailTemplateApi.deleteEmailTemplate, params);
    yield put(deleteEmailTemplateSuccess({
      data,
      id: params.payload
    }));
  } catch (error){
    yield put(deleteEmailTemplateFail(error));
  }
}

function * authSaga(){
  yield takeEvery(FETCH_EMAIL_TEMPLATES_REQUESTED, fetchEmailTemplates);
  yield takeEvery(ADD_EMAIL_TEMPLATE_REQUESTED, addEmailTemplate);
  yield takeEvery(EDIT_EMAIL_TEMPLATE_REQUESTED, editEmailTemplate);
  yield takeEvery(DELETE_EMAIL_TEMPLATE_REQUESTED, deleteEmailTemplate);
}

export default authSaga;