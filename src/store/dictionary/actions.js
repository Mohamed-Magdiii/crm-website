import { 
  FETCH_DICTIONARY_START, FETCH_DICTIONARY_SUCCESS, API_ERROR
} from "./actionsType";

export const fetchDictionaryStart = (params = {})=>{
  return {
    type:FETCH_DICTIONARY_START,
    payload:params
  };
};
export const fetchDictionarySuccess = (data)=>{
  return {
    type:FETCH_DICTIONARY_SUCCESS,
    payload:data
  };
};
export const apiError = (error)=>{
  return {
    type:API_ERROR,
    payload:{ error }
  };
};