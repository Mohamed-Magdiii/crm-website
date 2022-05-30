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
  REMOVE_ITEM_FROM_COUNTRIES,
  UPATE_EMAIL_PROVIDER_START,
  UPDATE_ACTION_START,
  UPDATE_COUNTRY_START,
  UPDATE_EXCHANGE_START,
  UPDATE_ACTION_SUCCESS,
  UPDATE_EXCHANGE_SUCCESS,
  UPDATE_EMAIL_PROVIDER_SUCCESS,
  UPDATE_COUNTRY_SUCCESS,
  EDIT_CLEAR,
  ADD_CLEAR,
  CLEAR_DELETE_MODAL
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
export const updateActionStart = (value)=>{
  return {
    type:UPDATE_ACTION_START,
    payload :value
  };
};
export const updateEmailProviderStart = (value)=>{
  return {
    type:UPATE_EMAIL_PROVIDER_START,
    payload :value
  };
};
export const updateExchangeStart = (value)=>{
  return {
    type:UPDATE_EXCHANGE_START,
    payload:value
  };
};
export const updateCountryStart = (value)=>{
  return {
    type:UPDATE_COUNTRY_START,
    payload:value
  };
};
export const updateActionSuccess = (oldValue, newValue)=>{
  return {
    type:UPDATE_ACTION_SUCCESS,
    payload:{
      oldValue,
      newValue
    }
  };
};
export const updateExchangeSuccess = (oldValue, newValue)=>{
  return {
    type:UPDATE_EXCHANGE_SUCCESS,
    payload:{
      oldValue,
      newValue
    }

  };
};
export const updateEmailProviderSuccess = (oldValue, newValue)=>{
  return {
    type:UPDATE_EMAIL_PROVIDER_SUCCESS,
    payload:{
      oldValue,
      newValue
    }
  };
};
export const updateCountrySuccess = (countryId, newValue)=>{
  return {
    type:UPDATE_COUNTRY_SUCCESS,
    payload:{
      countryId,
      newValue
    },
  };
};
export const editClear = ()=>{
  return {
    type:EDIT_CLEAR
  };
};
export const addClear = ()=>{
  return {
    type:ADD_CLEAR
  };
};
export const clearDeleteModal = ()=>{
  return {
    type:CLEAR_DELETE_MODAL
  };
};