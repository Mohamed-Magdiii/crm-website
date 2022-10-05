import { 
  call, put, takeEvery
} from "redux-saga/effects";
import { getForexGatewayOfDeposit, getForexGatewaysOfWithdraw } from "apis/fxGateway";
import { FETCH_FOREX_GATEWAYS_START, FETCH_WITHDRAWALS_FOREX_GATEWAYS_START } from "./actionTypes";
import { fetchForexGatewaysSuccess, fetchForexGatewaysOfWithdrawalsStart } from "./action";

function * fetchForexGatewaysOfWithdrawals(params = {}){
  try {
    const gateways = yield call(getForexGatewaysOfWithdraw, params);
    yield put(fetchForexGatewaysOfWithdrawalsStart(gateways));
  } catch (error ){
    
  }
}
function * fetchForexGateways(params = {}){
  try {
    const gateways = yield call(getForexGatewayOfDeposit, params);
    yield put(fetchForexGatewaysSuccess(gateways));
  } catch (error){  
  }
}

function * fxGatewaySaga(){
  yield takeEvery(FETCH_FOREX_GATEWAYS_START, fetchForexGateways);
  yield takeEvery(FETCH_WITHDRAWALS_FOREX_GATEWAYS_START, fetchForexGatewaysOfWithdrawals);
}
export default fxGatewaySaga;