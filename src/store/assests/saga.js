import {
  call, put, takeEvery 
} from "redux-saga/effects";
import { 
  fetchAssestsSuccess, apiError, addNewSymbolSuccess
} from "./actions";
import { getAssests, addNewSymbol} from "apis/assets";
import {FETCH_ASSESTS_START, ADD_NEW_SYMBOL} from "./actionsType";
function * fetchAssest(params){
  try {
    const data = yield call(getAssests, params);
    yield put(fetchAssestsSuccess(data));
  } catch (error){
    yield put(apiError, error);
  }
  

}
function * addNewAssest({ payload :{ newSymbol } }){
  try {
    console.log("Inside saga", newSymbol);
    const data = yield call(addNewSymbol, newSymbol);
    console.log(data);
    yield put(addNewSymbolSuccess("New symbol is added successfully", newSymbol));
  } catch (error){
    yield put(apiError("Please enter valid data"));
  }
 
}
function * assestSaga(){
  yield  takeEvery(FETCH_ASSESTS_START, fetchAssest);
  yield  takeEvery(ADD_NEW_SYMBOL, addNewAssest);
}
export default assestSaga;