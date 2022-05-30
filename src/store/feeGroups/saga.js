import { 
  takeEvery, 
  call, 
  put 
} from "redux-saga/effects";
import { fetchFeeGroups } from "apis/fee-groups";
import { FETCH_FEE_GROUPS_START } from "./actionsType";
import { fetchFeeGroupsSuccess, apiError } from "./actions";
function * getFeeGroups({ payload }){
  try {
    const result = yield call(fetchFeeGroups, payload);
    yield put(fetchFeeGroupsSuccess(result));
  } catch (error){
    yield put(apiError(error));
  }
}
function * feeGroupSaga(){
  yield takeEvery(FETCH_FEE_GROUPS_START, getFeeGroups);
}
export default feeGroupSaga;