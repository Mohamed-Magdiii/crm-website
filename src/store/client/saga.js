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
  editClientDetailsFail,
  editClientDetailsClear,
  addModalClear,
  fetchClientStagesEnd,
  assignAgentToClientSuccess,
} from "./actions";
import { 
  ADD_NEW_CLIENT, 
  FETCH_CLIENTS_START,
  FETCH_CLIENT_STAGES_START,
  FETCH_CLIENT_DETAILS_REQUESTED,
  EDIT_CLIENT_DETAILS_REQUESTED,
  ASSIGN_AGENT_START
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

function * addNewClient({ payload:{ newClient } }) {
  try {
    const data = yield call(clientApi.addClient, newClient);
    const { status } = data;
    if (status){
      yield put(addNewClientSuccess(newClient));
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
    const data = yield call(clientApi.updateClientDetails, params);
    yield put(editClientDetailsSuccess(data));
    yield delay(2000);
    yield put(editClientDetailsClear());
  } catch (error){
    yield put(editClientDetailsFail({ error: error.message }));
  }
}
function * assignAgent (params){
  
  const { payload :{ id }  } = params;
  const { payload: { agent: clientAgent } } = params;
  try {
    yield call(clientApi.updateClientDetails, params);
    
    yield put(assignAgentToClientSuccess({
      id, 
      agent:{
        ...clientAgent
      }
    }));
    yield put(showSuccessNotification("Sales Agent has been assigned to the client successfully"));
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

function * clientSaga() {
  yield takeEvery(FETCH_CLIENTS_START, fetchClients);
  yield takeEvery(ADD_NEW_CLIENT, addNewClient);
  yield takeEvery(FETCH_CLIENT_DETAILS_REQUESTED, fetchClientDetails);
  yield takeEvery(EDIT_CLIENT_DETAILS_REQUESTED, editClientDetails);
  yield takeEvery(FETCH_CLIENT_STAGES_START, fetchClientStages);
  yield takeEvery(ASSIGN_AGENT_START, assignAgent);
  
}

export default clientSaga;