import { 
  takeEvery, 
  call, 
  put 
} from "redux-saga/effects";
import { fetchFeeGroups, addFeeGroup } from "apis/fee-groups";
import { FETCH_FEE_GROUPS_START, ADD_FEES_GROUPS_START } from "./actionsType";
import { 
  fetchFeeGroupsSuccess,
  apiError,
  addFeeGroupSuccess
} from "./actions";
function * getFeeGroups({ payload :{ params } }){
  try {
    const result = yield call(fetchFeeGroups, params);
    yield put(fetchFeeGroupsSuccess(result));
  } catch (error){
    yield put(apiError(error));
  }
}
function * addNewFeesGroup ({ payload }){
  
  try {
    const data = yield call(addFeeGroup, payload);
    const { status, result } = data;
    if (status === true){
      yield put(addFeeGroupSuccess(result));
    }
  } catch (error){
    yield put(apiError(error));
  }
}
function * feeGroupSaga(){
  yield takeEvery(FETCH_FEE_GROUPS_START, getFeeGroups);
  yield takeEvery (ADD_FEES_GROUPS_START, addNewFeesGroup);
}
export default feeGroupSaga;