import {
  call, put, takeEvery
} from "redux-saga/effects";
import { FETCH_WALLET_START } from "./actionTypes";
import { fetchWalletSuccess } from "./action";
import { getWallets } from "apis/wallet";
function * fetchWallet(params){
  const wallets = yield call(getWallets, params);
  yield put(fetchWalletSuccess(wallets));
}

function * walletSaga(){
  yield takeEvery(FETCH_WALLET_START, fetchWallet);
}
export default walletSaga;