import { 
  call, put, takeEvery
} from "redux-saga/effects";
import { getDictionary } from "apis/dictionary";
import { fetchDictionarySuccess, apiError } from "./actions";
import { FETCH_DICTIONARY_START } from "./actionsType";
function * fetchDictionary(){
  try {
    const dictionary = yield call(getDictionary);
    const { result } = dictionary;
    yield put(fetchDictionarySuccess(result));
    
  } catch (error){
    yield put(apiError("Error happend while getting dictionary"));
  }
  
}
function * dictionarySaga (){
  yield takeEvery(FETCH_DICTIONARY_START, fetchDictionary);
}
export default dictionarySaga;