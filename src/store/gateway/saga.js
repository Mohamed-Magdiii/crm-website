import { 
  call, put, takeEvery
} from "redux-saga/effects";
import { getGatewayOfDeposit } from "apis/gateway";
import { FETCH_GATEWAYS_START } from "./actionTypes";
import { fetchGatewaysSuccess } from "./action";
function * fetchGateways(params = {}){
  try {
    const gateways = yield call(getGatewayOfDeposit, params);
    yield put(fetchGatewaysSuccess(gateways));
  } catch (error){
     
  }
  
}

function * gatewaySaga(){
  yield takeEvery(FETCH_GATEWAYS_START, fetchGateways);
}
export default gatewaySaga;