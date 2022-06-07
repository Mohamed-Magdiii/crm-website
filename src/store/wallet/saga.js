import {
  call, put, takeEvery, delay
} from "redux-saga/effects";
import { 
  FETCH_WALLET_START,
  FETCH_CLIENT_WALLETS_REQUESTED,
  ADD_CLIENT_WALLET_REQUESTED
} from "./actionTypes";
import { 
  fetchWalletSuccess,

  fetchClientWalletsSuccess,
  fetchClientWalletsFail,
  addWalletSuccess,
  addWalletFail,
  addWalletClear
} from "./action";
import * as walletApi from "apis/wallet";

function * fetchWallet(params){
  const wallets = yield call(walletApi.getWallets, params);
  yield put(fetchWalletSuccess(wallets));
}

function * fetchClientWallet(params){
  try {
    const data = yield call(walletApi.getClientWalletDetails, params);
    yield put(fetchClientWalletsSuccess(data));
  } catch (error){
    yield put(fetchClientWalletsFail({ error: error.message }));
  }
}

function * addClientWallet(params){
  try {
    const data = yield call(walletApi.addNewWallet, params);
    yield put(addWalletSuccess(data));
    yield delay(2000);
    yield put(addWalletClear());
  } catch (error){
    yield put(addWalletFail({ error: error.message }));
  }
}

function * walletSaga(){
  yield takeEvery(FETCH_WALLET_START, fetchWallet);
  yield takeEvery(FETCH_CLIENT_WALLETS_REQUESTED, fetchClientWallet);
  yield takeEvery(ADD_CLIENT_WALLET_REQUESTED, addClientWallet);
}

export default walletSaga;