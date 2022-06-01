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

  fetchClientBankAccountSuccess,
  fetchClientBankAccountFail,

  fetchClientWalletSuccess,
  fetchClientWalletFail,

  fetchClientTransactionsSuccess,
  fetchClientTransactionsFail,

  editClientDetailsSuccess,
  editClientDetailsFail,
  editClientDetailsClear,

  addBankAccountSuccess,
  addBankAccountFail,
  addBankAccountClear,

  deleteBankAccountSuccess,
  deleteBankAccountFail,
  
  editBankAccountSuccess,
  editBankAccountFail,
  editBankAccountClear
} from "./actions";
import { 
  ADD_NEW_CLIENT, 
  FETCH_CLIENTS_START,
  
  FETCH_CLIENT_DETAILS_REQUESTED,
  FETCH_CLIENT_BANK_ACCOUNT_REQUESTED,
  FETCH_CLIENT_WALLET_REQUESTED,
  FETCH_CLIENT_TRANSACTIONS_REQUESTED,
  EDIT_CLIENT_DETAILS_REQUESTED,
  ADD_BANK_ACCOUNT_REQUESTED,
  DELETE_BANK_ACCOUNT_REQUESTED,
  EDIT_BANK_ACCOUNT_REQUESTED
} from "./actionsType";
  
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
      yield put(addNewClientSuccess("Client is added successfully", newClient));
    }
  } catch (error){
    yield put(apiError("Invalid data"));
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

function * fetchClientBankAccount(params){
  try {
    const data = yield call(clientApi.getClientBankDetails, params);
    yield put (fetchClientBankAccountSuccess(data));
  } catch (error){
    yield put(fetchClientBankAccountFail({ error: error.message }));
  }
}

function * fetchClientWallet(params){
  try {
    const data = yield call(clientApi.getClientWalletDetails, params);
    yield put(fetchClientWalletSuccess(data));
  } catch (error){
    yield put(fetchClientWalletFail({ error: error.message }));
  }
}

function * fetchClientTransactions(params){
  try {
    const data = yield call(clientApi.getClientTransactions, params);
    yield put(fetchClientTransactionsSuccess(data));
  } catch (error){ 
    yield put(fetchClientTransactionsFail({ error: error.message }));
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

function * addBankAccount(params){
  try {
    const data = yield call(clientApi.postBankAccount, params);
    const { result } = data;
    yield put(addBankAccountSuccess(result));
    yield delay(2000);
    yield put(addBankAccountClear());
  } catch (error){
    yield put(addBankAccountFail({ error: error.message }));
  }
}

function * deleteBankAccount(params){
  // id = params
  try {
    const data = yield call(clientApi.deleteBankAccount, params);
    yield put(deleteBankAccountSuccess(data));
  } catch (error){
    yield put(deleteBankAccountFail({ error: error.message }));
  }
}

function * editBankAccount(params){
  try {
    const data = yield call(clientApi.updateBankAccount, params);
    yield put(editBankAccountSuccess(data));
    yield delay(2000);
    yield put(editBankAccountClear());
  } catch (error){
    yield put(editBankAccountFail({ error: error.message }));
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
  yield takeEvery(ADD_BANK_ACCOUNT_REQUESTED, addBankAccount);
  yield takeEvery(DELETE_BANK_ACCOUNT_REQUESTED, deleteBankAccount);
  yield takeEvery(EDIT_BANK_ACCOUNT_REQUESTED, editBankAccount);
}

export default clientSaga;