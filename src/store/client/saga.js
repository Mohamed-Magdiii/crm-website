import {
  call, put, takeEvery, delay
} from "redux-saga/effects";
import { getClients, addClient } from "apis/client";
import {
  fetchClientsSuccess, apiError, addNewClientSuccess, addModalClear
} from "./actions";
import { ADD_NEW_CLIENT, FETCH_CLIENTS_START } from "./actionsType";
  
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
    
    console.log(newClient);
    const data = yield call(addClient, newClient);
    const { status } = data;
    if (status){
      console.log("hi");
      //yield put(addNewClientSuccess(newClient));
      //yield delay(2000);
      yield put(addModalClear());
    }
  } catch (error){
    yield put(apiError("Invalid data"));
  }
}

function * clientSaga() {
  yield takeEvery(FETCH_CLIENTS_START, fetchClients);
  yield takeEvery(ADD_NEW_CLIENT, addNewClient);
}

export default clientSaga;