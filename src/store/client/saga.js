import {
  call, put, takeEvery, delay
} from "redux-saga/effects";
import { 
  getClients, 
  addClient,
  getClientById,
  getClientBankDetails,
  getClientWalletDetails,
  getClientTransactions,
  updateClientDetails
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
  fetchClientWalletFail,

  fetchClientTransactionsSuccess,
  fetchClientTransactionsFail,

  editClientDetailsSuccess,
  editClientDetailsFail,
  editClientDetailsClear
} from "./actions";
import { 
  ADD_NEW_CLIENT, 
  FETCH_CLIENTS_START,
  
  FETCH_CLIENT_DETAILS_REQUESTED,
  FETCH_CLIENT_BANK_ACCOUNT_REQUESTED,
  FETCH_CLIENT_WALLET_REQUESTED,
  FETCH_CLIENT_TRANSACTIONS_REQUESTED,
  EDIT_CLIENT_DETAILS_REQUESTED
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
    yield put(fetchClientWalletSuccess(data));
  } catch (error){
    yield put(fetchClientWalletFail({ error: error.message }));
  }
}

function * fetchClientTransactions(params){
  try {
    const data = yield call(getClientTransactions, params);
    yield put(fetchClientTransactionsSuccess(data));
  } catch (error){ 
    yield put(fetchClientTransactionsFail({ error: error.message }));
  }
}

function * editClientDetails(params){
  try {
    const data = yield call(updateClientDetails, params);
    yield put(editClientDetailsSuccess(data));
    yield delay(2000);
    yield put(editClientDetailsClear());
  } catch (error){
    yield put(editClientDetailsFail({ error: error.message }));
  }
}

function * clientSaga() {
  yield takeEvery(FETCH_CLIENTS_START, fetchClients);
  yield takeEvery(ADD_NEW_CLIENT, addNewClient);
  yield takeEvery(FETCH_CLIENT_DETAILS_REQUESTED, fetchClientDetails);
  yield takeEvery(FETCH_CLIENT_BANK_ACCOUNT_REQUESTED, fetchClientBankAccount);
  yield takeEvery(FETCH_CLIENT_WALLET_REQUESTED, fetchClientWallet);
  yield takeEvery(FETCH_CLIENT_TRANSACTIONS_REQUESTED, fetchClientTransactions);
  yield takeEvery(EDIT_CLIENT_DETAILS_REQUESTED, editClientDetails);
}

export default clientSaga;