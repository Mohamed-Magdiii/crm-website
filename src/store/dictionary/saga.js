import { 
  call, put, takeEvery
} from "redux-saga/effects";
import { 
  getDictionary, addNewItem, removeItem 
} from "apis/dictionary";
import { fetchDictionarySuccess, apiError } from "./actions";
import {
  FETCH_DICTIONARY_START, ADD_NEW_ITEM, REMOVE_ITEM
} from "./actionsType";
function * fetchDictionary(){
  try {
    const dictionary = yield call(getDictionary);
    const { result } = dictionary;
    yield put(fetchDictionarySuccess(result));
    
  } catch (error){
    yield put(apiError("Error happend while getting dictionary"));
  }
  
}
function * addItem({payload}){
  try {
    console.log(payload);
    const result = yield call(addNewItem, payload);
    console.log(result);
  } catch (error){
    yield put(apiError(error));
  }
}

function * dictionarySaga (){
  yield takeEvery(FETCH_DICTIONARY_START, fetchDictionary);
  yield takeEvery(ADD_NEW_ITEM, addItem);
}
export default dictionarySaga;