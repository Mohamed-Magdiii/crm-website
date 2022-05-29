import {

  FETCH_DICTIONARY_START,
  FETCH_DICTIONARY_SUCCESS,
  API_ERROR, 
  ADD_NEW_ITEM, 
  REMOVE_ITEM,
  ADD_ITEM_TO_ACTIONS,
  ADD_ITEM_TO_EMAIL_PROVIDERS,
  ADD_ITEM_TO_COUNTRIES,
  ADD_ITEM_TO_EXCHANGES,
  REMOVE_ITEM_FROM_ACTIONS,
  REMOVE_ITEM_FROM_EMAIL_PROVIDERS,
  REMOVE_ITEM_FROM_EXCHANGES,
  REMOVE_ITEM_FROM_COUNTRIES
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
export const addNewItem = (id, data)=>{
  return {
    type:ADD_NEW_ITEM,
    payload:{
      id,
      data 
    }
  };
};
export const removeItem = (id, data)=>{
  console.log("removing Item");
  return {
    type:REMOVE_ITEM,
    payload:{ 
      id, 
      data 
    }
  };
};
export const addItemToActions = (value)=>{
  return {
    type:ADD_ITEM_TO_ACTIONS,
    payload:value 
  };
};
export const addItemToExchanges = (value)=>{
  return {
    type:ADD_ITEM_TO_EXCHANGES,
    payload:value
  };
};
export const addItemToEmailProviders = (value)=>{
  return {
    type:ADD_ITEM_TO_EMAIL_PROVIDERS,
    payload:value
  };
};
export const addItemToCountries = (value)=>{
  return {
    type:ADD_ITEM_TO_COUNTRIES,
    payload:value
  };
};
export const removeItemFromCountries = (value)=>{
  return {
    type:REMOVE_ITEM_FROM_COUNTRIES,
    payload:value
  };
};
export const removeItemFromActions = (value)=>{
  return {
    type:REMOVE_ITEM_FROM_ACTIONS,
    payload:value
  };
};
export const removeItemFromEmailProviders = (value)=>{
  return {
    type:REMOVE_ITEM_FROM_EMAIL_PROVIDERS,
    payload:value
  };
};
export const removeItemFromExchanges = (value)=>{
  return {
    type:REMOVE_ITEM_FROM_EXCHANGES,
    payload:value
  };
};