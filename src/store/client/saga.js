import {
  call, put, takeEvery, delay
} from "redux-saga/effects";
import { 
  getClients, 
  addClient,
  getClientById 
} from "apis/client";
import {
  fetchClientsSuccess, 
  apiError, 
  addNewClientSuccess,
  
  fetchClientDetailsSuccess,
  fetchClientDetailsFail,
  fetchClientDetailsClear
} from "./actions";
import { 
  ADD_NEW_CLIENT, 
  FETCH_CLIENTS_START,
  
  FETCH_CLIENT_DETAILS_REQUESTED
} from "./actionsType";
  
function *fetchClients(params) {
  try {
    const data = yield call(getClients, params);
    yield put(fetchClientsSuccess(data));
  } catch (error){
    yield put(apiError, "Oppos there is a problem in the server");
  }
    
}

function * addNewClient({ payload:{ newClient } }) {
  try {
    const data = yield call(addClient, newClient);
    const { status } = data;
    if (status){
      yield put(addNewClientSuccess("Client is added successfully", newClient));
    }
  } catch (error){
    yield put(apiError("Invalid data"));
  }
}

function * fetchClientDetails(params){
  try {
    const data = yield call(getClientById, params);
    yield put(fetchClientDetailsSuccess(data));
    yield delay(2000);
    yield put(fetchClientDetailsClear());
  } catch (error){
    yield put(fetchClientDetailsFail({ error: error.message }));
  }
}

function * clientSaga() {
  yield takeEvery(FETCH_CLIENTS_START, fetchClients);
  yield takeEvery(ADD_NEW_CLIENT, addNewClient);
  yield takeEvery(FETCH_CLIENT_DETAILS_REQUESTED, fetchClientDetails);
}


export default clientSaga;