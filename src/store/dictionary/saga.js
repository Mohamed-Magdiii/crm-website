import { 
  call, put, takeEvery
} from "redux-saga/effects";
import { 
  getDictionary, addNewItem, removeItem, updateActions, updateEmailProvider, updateCountries, updateExchange
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
  removeItemFromEmailProviders,
  updateActionSuccess,
  updateEmailProviderSuccess,
  updateExchangeSuccess,
  updateCountrySuccess
} from "./actions";
import {
  FETCH_DICTIONARY_START,
  ADD_NEW_ITEM, 
  REMOVE_ITEM, 
  UPDATE_ACTION_START,
  UPATE_EMAIL_PROVIDER_START,
  UPDATE_EXCHANGE_START,
  UPDATE_COUNTRY_START
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
function * updateAction({ payload }){
  
  try {
    yield call(updateActions, payload);
    const { body, value } = payload;
    const { actions: oldValue } = body;
    yield put(updateActionSuccess(oldValue, value));
  } catch (error){
    yield put(apiError(error));
  }
}
function * updateEmailProviderValue({ payload }){
  try {
    yield call(updateEmailProvider, payload);
    const {body, value : newValue } = payload;
    const { emailProviders :oldValue } = body;
    yield put(updateEmailProviderSuccess(oldValue, newValue));
  } catch (error){
    yield put(apiError(error));
  }
}
function * updateExchangeValue ({ payload }){
  try {
    yield call(updateExchange, payload);
    const { body, value:newValue } = payload;
    const { exchanges:oldValue } = body;
    yield put(updateExchangeSuccess(oldValue, newValue));
  } catch (error){
    yield put(apiError(error));
  }
}
function * removeItemFromDictionary({ payload }){
  try {
    
    const result = yield call(removeItem, payload); 
    const { status } = result;
    const { data } = payload;
    const actionValue = Object.values(data);
    const key = Object.keys(data);
  
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
  yield takeEvery (UPDATE_ACTION_START, updateAction);
  yield takeEvery(UPDATE_EXCHANGE_START, updateExchangeValue);
  yield takeEvery(UPATE_EMAIL_PROVIDER_START, updateEmailProviderValue);
  
}
export default dictionarySaga;