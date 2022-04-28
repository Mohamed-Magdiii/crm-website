import {
  call, put, takeEvery 
} from "redux-saga/effects";
import { 
  fetchAssestsSuccess, apiError, addNewSymbolSuccess
} from "./actions";
import { 
  getAssests, addNewSymbol, updateSymbol
} from "apis/assets";
import {
  FETCH_ASSESTS_START, ADD_NEW_SYMBOL, EDIT_SYMBOL_START
} from "./actionsType";
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

    const data = yield call(addNewSymbol, newSymbol);
    const { status } = data;
    if (status){
      yield put(addNewSymbolSuccess("New symbol is added successfully", newSymbol));
    }
    
  } catch (error){
    
    yield put(apiError("Please Enter valid data"));
  }
 
}
function * editAsset(params){
  try {
    const data = yield call(updateSymbol, params);
    console.log(data);
  } catch (error){
    yield apiError("Please Enter Valid data");
  }
  
}
function * assestSaga(){
  yield  takeEvery(FETCH_ASSESTS_START, fetchAssest);
  yield  takeEvery(ADD_NEW_SYMBOL, addNewAssest);
  yield  takeEvery(EDIT_SYMBOL_START, editAsset);
}
export default assestSaga;