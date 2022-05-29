import { 
  call, put, takeEvery
} from "redux-saga/effects";
import { 
  getDictionary, addNewItem, removeItem 
} from "apis/dictionary";
import { 
  fetchDictionarySuccess,
  apiError, 
  addItemToActions,
  addItemToEmailProviders,
  addItemToCountries,
  addItemToExchanges,
  removeItemFromActions,
  removeItemFromCountries,
  removeItemFromExchanges,
  removeItemFromEmailProviders
  
} from "./actions";
import {
  FETCH_DICTIONARY_START,
  ADD_NEW_ITEM, 
  REMOVE_ITEM, 
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
function * addItem({ payload }){
  
  const result = yield call(addNewItem, payload);
  const { status } = result;
  const { data } = payload;
 
  const actionValue = Object.values(data);
  const key = Object.keys(data);
  if (status.code === 200){
    if (key[0] === "actions"){
      yield put(addItemToActions(actionValue));
    }
    else if (key[0] === "exchanges"){
      yield put(addItemToExchanges(actionValue));
    }
    else if (key[0] === "emailProviders"){
      yield put(addItemToEmailProviders(actionValue));
    }
    else if (key[0] === "countries"){
      yield put(addItemToCountries(actionValue));
    }
    
  }
  
  
}
function * removeItemFromDictionary({ payload }){
  try {
    console.log(payload);
    const result = yield call(removeItem, payload); 
    const { status } = result;
    const { data } = payload;
    const actionValue = Object.values(data);
    const key = Object.keys(data);
    console.log(actionValue);
    if ( status.code === 200){
      if (key[0] === "actions"){
        yield put(removeItemFromActions(actionValue));
      }
      else if (key[0] === "exchanges"){
        yield put(removeItemFromExchanges(actionValue));
      }
      else if (key[0] === "emailProviders"){
        yield put(removeItemFromEmailProviders(actionValue));
      }
      else if (key[0] === "countries"){
        yield put(removeItemFromCountries(actionValue));
      }
    }
  } catch (error){
    yield put(apiError(error));
  }
  
}

function * dictionarySaga (){
  yield takeEvery(FETCH_DICTIONARY_START, fetchDictionary);
  yield takeEvery(ADD_NEW_ITEM, addItem);
  yield takeEvery(REMOVE_ITEM, removeItemFromDictionary);
  
}
export default dictionarySaga;