import {
  FETCH_CLIENTS_START,
  FETCH_CLIENTS_SUCCESS,
  ADD_NEW_CLIENT,
  ADD_NEW_CLIENT_SUCCESS,
  API_ERROR
} from "./actionsType";

export const fetchClientsStart = (params = {})=>{
  return {
    type:FETCH_CLIENTS_START,
    payload:params
  };
};
export const fetchClientsSuccess = (data)=>{
  return {
    type:FETCH_CLIENTS_SUCCESS,
    payload:data
  };
};
export const apiError = (error)=>{
  return {
    type:API_ERROR,
    payload:{ error }
  };
};
export const addNewClient = (newClient)=>{
  return {
    type:ADD_NEW_CLIENT,
    payload:{ newClient }
  };
};
export const addNewClientSuccess = (message, newClient)=>{
  return {
    type:ADD_NEW_CLIENT_SUCCESS,
    payload:{
      message,
      newClient
    }
  };
};
