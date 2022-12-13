import {
  PRODUCTS_START, PRODUCTS_SUCCESSFUL, API_ERROR, ADD_PRODUCT_START,
  EDIT_PRODUCT_START,
  EDIT_PRODUCT_SUCCESS,
  ADD_PRODUCT_SUCCESS,
  MODAL_CLEAR
} from "./actionsTypes";

export const fetchProductsStart = (params)=>{
  return {
    type:PRODUCTS_START,
    payload:{ params }
  };
};
export const fetchProductsSuccess = (data)=>{
  return {
    type:PRODUCTS_SUCCESSFUL,
    payload:data
  };
};

export const addProductStart = (data)=>{
  return {
    type: ADD_PRODUCT_START,
    payload:data
  };
};
export const addProductSuccess = (data)=>{
  return {
    type:ADD_PRODUCT_SUCCESS,
    payload:data
  };
};

export const editProductStart = (id, body)=>{
  return {
    type: EDIT_PRODUCT_START,
    payload:{
      id,
      body
    }
  };
};

export const editProductSuccess = (data)=>{
  return {
    type:EDIT_PRODUCT_SUCCESS,
    payload:data
  };
};


export const apiError = (error)=> {
  return {
    type:API_ERROR,
    payload:{ error }
  };
};

export const ModalClear = ()=>{
  return {
    type:MODAL_CLEAR
  };
};