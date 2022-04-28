
import {
  FETCH_ASSESTS_START,
  FETCH_ASSESTS_SUCCESS,
  ADD_NEW_SYMBOL,
  ADD_NEW_SYMBOL_SUCCESS,
  API_ERROR
} from "./actionsType";
export const fetchAssestsStart = (params)=>{
  return {
    type:FETCH_ASSESTS_START,
    payload:params
  };
};
export const fetchAssestsSuccess = (data)=>{
  return {
    type:FETCH_ASSESTS_SUCCESS,
    payload:data
  };
};
export const addNewSymbol = (newSymbol)=>{
  return {
    type:ADD_NEW_SYMBOL,
    payload:{ newSymbol }
  };
};

export const addNewSymbolSuccess = (message, newSymbol)=>{
  return {
    type:ADD_NEW_SYMBOL_SUCCESS,
    payload:{
      message, 
      newSymbol
    }
  };
};
export const apiError = (error)=>{
  return {
    type:API_ERROR,
    payload:error
  };
};
