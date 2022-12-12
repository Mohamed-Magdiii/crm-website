import {
  LOB_START, LOB_SUCCESSFUL, UPDATE_LOB_START, UPDATE_LOB_SUCCESS, ADD_LOB_START, ADD_LOB_SUCCESS,
  API_ERROR, ADD_MODAL_CLEAR
} from "./actionsTypes";

export const fetchLOBStart = (params)=>{
  return {
    type:LOB_START,
    payload:{ params }
  };
};
export const fetchLOBSuccess = (data)=>{
  return {
    type:LOB_SUCCESSFUL,
    payload:data
  };
};


export const editLOBStart = (id, body)=>{
  return {
    type: UPDATE_LOB_START,
    payload:{
      id,
      body
    }
  };
};
export const editLOBSuccess = (data)=>{
  return {
    type:UPDATE_LOB_SUCCESS,
    payload:data
  };
};

//
export const addLOBStart = (data)=>{
  return {
    type: ADD_LOB_START,
    payload:data
  };
};
export const addLOBSuccess = (data)=>{
  return {
    type:ADD_LOB_SUCCESS,
    payload:data
  };
};
export const apiError = (error)=> {
  return {
    type:API_ERROR,
    payload:{ error }
  };
};


export const addModalClear = ()=>{
  return {
    type:ADD_MODAL_CLEAR
  };
};