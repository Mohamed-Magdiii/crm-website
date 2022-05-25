import {
  call, put, takeEvery, delay
} from "redux-saga/effects";
import { 
  getClients, 
  addClient,
  getClientById,
  getClientBankDetails,
  getClientWalletDetails
} from "apis/client";
import {
  fetchClientsSuccess, 
  apiError, 
  addNewClientSuccess,
  
  fetchClientDetailsSuccess,
  fetchClientDetailsFail,
  fetchClientDetailsClear,

  fetchClientBankAccountSuccess,
  fetchClientBankAccountFail,

  fetchClientWalletSuccess,
  fetchClientWalletFail
} from "./actions";
import { 
  ADD_NEW_CLIENT, 
  FETCH_CLIENTS_START,
  
  FETCH_CLIENT_DETAILS_REQUESTED,
  FETCH_CLIENT_BANK_ACCOUNT_REQUESTED,
  FETCH_CLIENT_WALLET_REQUESTED
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

function * fetchClientBankAccount(params){
  try {
    const data = yield call(getClientBankDetails, params);
    yield put (fetchClientBankAccountSuccess(data));
  } catch (error){
    yield put(fetchClientBankAccountFail({ error: error.message }));
  }
}

function * fetchClientWallet(params){
  try {
    const data = yield call(getClientWalletDetails, params);
    yield put (fetchClientWalletSuccess(data));
  } catch (error){
    yield put(fetchClientWalletFail({ error: error.message }));
  }
}

function * clientSaga() {
  yield takeEvery(FETCH_CLIENTS_START, fetchClients);
  yield takeEvery(ADD_NEW_CLIENT, addNewClient);
  yield takeEvery(FETCH_CLIENT_DETAILS_REQUESTED, fetchClientDetails);
  yield takeEvery(FETCH_CLIENT_BANK_ACCOUNT_REQUESTED, fetchClientBankAccount);
  yield takeEvery(FETCH_CLIENT_WALLET_REQUESTED, fetchClientWallet);
}

export default clientSaga;