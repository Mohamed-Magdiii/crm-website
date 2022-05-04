import {
  call, put, takeEvery 
} from "redux-saga/effects";
import { 
  fetchAssestsSuccess, apiError, addNewSymbolSuccess, deleteSymbolDone
} from "./actions";
import { 
  getAssests, addNewSymbol, updateSymbol, deleteSymbol
} from "apis/assets";
import {
  FETCH_ASSESTS_START, ADD_NEW_SYMBOL, EDIT_SYMBOL_START, DELETE_SYMBOL_START
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
function * deleteAsset(params){
  try {
    const data = yield call(deleteSymbol, params);

    const { result } = data;
    yield put(deleteSymbolDone({
      result,
      id:params.payload,
      
    }));
    
  } catch (error){
    yield put(apiError("An error happned during deleting this record"));
  }
  

}
function * assestSaga(){
  yield  takeEvery(FETCH_ASSESTS_START, fetchAssest);
  yield  takeEvery(ADD_NEW_SYMBOL, addNewAssest);
  yield  takeEvery(EDIT_SYMBOL_START, editAsset);
  yield takeEvery(DELETE_SYMBOL_START, deleteAsset);
}
export default assestSaga;