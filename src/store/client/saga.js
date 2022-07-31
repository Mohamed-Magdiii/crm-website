import {
  call, put, takeEvery, delay
} from "redux-saga/effects";
import * as clientApi from "apis/client";
import {
  fetchClientsSuccess, 
  apiError, 
  addNewClientSuccess,
  
  fetchClientDetailsSuccess,
  fetchClientDetailsFail,
  fetchClientDetailsClear,

  editClientDetailsSuccess,
  addModalClear,
  fetchClientStagesEnd,
  assignAgentToClientSuccess,
  updateEmploymentStatusSuccess,
  updateFinancialInfoSuccess,
  updateEmploymentInfoFail,
  updateFinancialInfoFail,
  resetPasswordClear,
  editClientDetailsFail
} from "./actions";
import { 
  ADD_NEW_CLIENT, 
  FETCH_CLIENTS_START,
  FETCH_CLIENT_STAGES_START,
  FETCH_CLIENT_DETAILS_REQUESTED,
  EDIT_CLIENT_DETAILS_REQUESTED,
  ASSIGN_AGENT_START,
  UPDATE_EMPLOYMENT_INFO_START,
  UPDATE_FINANCIAL_INFO_START,
  CHANGE_PASSWORD_START
} from "./actionsType"; 
import { showSuccessNotification, showErrorNotification } from "store/notifications/actions";
function *fetchClients(params) {
  try {
    const data = yield call(clientApi.getClients, params);
    yield put(fetchClientsSuccess(data));
  } catch (error){
    yield put(apiError, "Oppos there is a problem in the server");
  }
    
}

function * addNewClient({ payload }) {
  try {
    const data = yield call(clientApi.addClient, payload);
    const { status } = data;
    const { result:client } = data;
    if (status){
      yield put(addNewClientSuccess(client));
      yield put(showSuccessNotification("Client is added successfully"));
      yield delay(1000);
      yield put(addModalClear());
    }
  } catch (error){
    yield put(apiError("Invalid data"));
    yield delay(2000);
    yield put(apiError(""));
  }
}

function * fetchClientDetails(params){
  try {
    const data = yield call(clientApi.getClientById, params);
    yield put(fetchClientDetailsSuccess(data));
    yield delay(2000);
    yield put(fetchClientDetailsClear());
  } catch (error){
    yield put(fetchClientDetailsFail({ error: error.message }));
  }
}

function * editClientDetails(params){
  try {
    yield call(clientApi.updateClientDetails, params);
    const { payload } = params;
    const { values } = payload;
    yield put(editClientDetailsSuccess(values));
    yield put(showSuccessNotification("Client updated sucessfully!"));

    // yield delay(2000);
    // yield put(editClientDetailsClear());
  } catch (error){
    yield put(showErrorNotification(error.message || "Error updating client"));
    yield put(editClientDetailsFail({ errror:error.message }));
  }
}
function * assignAgent (params){
  
  const { payload :{ agent }  } = params;
  const { payload: { body } } = params;
  const { clientIds } = body;
  try {
    
    yield put(assignAgentToClientSuccess({
      clientIds,
      agent
    }));
  } catch (error){
    yield put(showErrorNotification("Error happened while assign the agent"));
  }
  
}
function * fetchClientStages(params){
  try {
    const data = yield call(clientApi.getClientById, params);
    if (data && data.result && data.result.stages) {
      yield put(fetchClientStagesEnd(data.result.stages));
    }
  } catch (error){ }
}
function * updateClientFinancialInfo ({ payload }){
  try {
    const data =  yield call(clientApi.updateClientFinancialInfo, payload);
    const { status } = data;
    if (status){
      yield put(updateFinancialInfoSuccess(payload));
      yield put(showSuccessNotification("Financial Info of the client has been updated"));
    }
  } catch (error){
    yield put(updateFinancialInfoFail());
    yield put(showErrorNotification("Error happened while updating financial info"));
  }
}
function * updateClientEmploymentInfo ({ payload }){
  try {

    const data =  yield call(clientApi.updateClientEmploymentStatus, payload);
    
    const { status } = data;
    if (status) {
      yield put(updateEmploymentStatusSuccess(payload));
      yield put(showSuccessNotification("Employpment Info has been updated successfully"));
    }
  } catch (error){
    yield put(updateEmploymentInfoFail());
    yield put(showErrorNotification("Error happened while updating employment info"));
  }
}
function * changePassword({ payload }){
  try {
    const data =  yield call(clientApi.resetPassowrd, payload);
    const { status } = data;
    if (status){
      yield put(showSuccessNotification("Password has been updated successfully"));
      yield delay(2000);
      yield put(resetPasswordClear());
    }
  } catch (error){
    yield put(showErrorNotification("Error Happend while changing password"));
  }
}
function * clientSaga() {
  yield takeEvery(FETCH_CLIENTS_START, fetchClients);
  yield takeEvery(ADD_NEW_CLIENT, addNewClient);
  yield takeEvery(FETCH_CLIENT_DETAILS_REQUESTED, fetchClientDetails);
  yield takeEvery(EDIT_CLIENT_DETAILS_REQUESTED, editClientDetails);
  yield takeEvery(FETCH_CLIENT_STAGES_START, fetchClientStages);
  yield takeEvery(ASSIGN_AGENT_START, assignAgent);
  yield takeEvery(UPDATE_FINANCIAL_INFO_START, updateClientFinancialInfo);
  yield takeEvery(UPDATE_EMPLOYMENT_INFO_START, updateClientEmploymentInfo);
  yield takeEvery(CHANGE_PASSWORD_START, changePassword);
}

export default clientSaga;