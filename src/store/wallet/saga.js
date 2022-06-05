import {
  call, put, takeEvery
} from "redux-saga/effects";
import { 
  FETCH_WALLET_START,
  FETCH_CLIENT_WALLET_REQUESTED
} from "./actionTypes";
import { 
  fetchWalletSuccess,

  fetchClientWalletSuccess,
  fetchClientWalletFail,
} from "./action";
import * as walletApi from "apis/wallet";

function * fetchWallet(params){
  const wallets = yield call(walletApi.getWallets, params);
  yield put(fetchWalletSuccess(wallets));
}

function * fetchClientWallet(params){
  try {
    const data = yield call(walletApi.getClientWalletDetails, params);
    yield put(fetchClientWalletSuccess(data));
  } catch (error){
    yield put(fetchClientWalletFail({ error: error.message }));
  }
}

function * walletSaga(){
  yield takeEvery(FETCH_WALLET_START, fetchWallet);
  yield takeEvery(FETCH_CLIENT_WALLET_REQUESTED, fetchClientWallet);
}

export default walletSaga;