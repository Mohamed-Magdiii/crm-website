import {
  FETCH_CLIENTS_START,
  FETCH_CLIENTS_SUCCESS,
  ADD_NEW_CLIENT,
  ADD_NEW_CLIENT_SUCCESS,
  API_ERROR,

  FETCH_CLIENT_DETAILS_REQUESTED,
  FETCH_CLIENT_DETAILS_SUCCESS,
  FETCH_CLIENT_DETAILS_FAIL,
  FETCH_CLIENT_DETAILS_CLEAR,
  FETCH_CLIENT_STAGES_START,
  FETCH_CLIENT_STAGES_END,
  EDIT_CLIENT_DETAILS_REQUESTED,
  EDIT_CLIENT_DETAILS_SUCCESS,
  EDIT_CLIENT_DETAILS_FAIL,
  EDIT_CLIENT_DETAILS_CLEAR,
  ADD_MODAL_CLEAR,
  ASSIGN_AGENT_START,
  ASSIGN_AGENT_SUCCESS,
  UPDATE_EMPLOYMENT_INFO_START,
  UPDATE_EMPLOYMENT_INFO_SUCCESS,
  UPDATE_FINANCIAL_INFO_START,
  UPDATE_FINANCIAL_INFO_SUCCESS,
  UPDATE_EMPLOYMENT_INFO_FAIL,
  UPDATE_FINANCIAL_INFO_FAIL,
  CHANGE_PASSWORD_START,
  RESET_PASSWORD_CLEAR,
  SEND_EMAIL_TO_RESET_PASSWORD_START, 
  SEND_EMAIL_MODAL_CLEAR,
  CLIENT_FORGOT_PASSWORD_START,
  CLIENT_FORGOT_PASSWORD_CLEAR,
  CLIENT_DISABLE_2FA_START
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
export const assignAgentToClientStart = (params = {})=>{
  return {
    type:ASSIGN_AGENT_START,
    payload:params
  };
};
export const assignAgentToClientSuccess = (data)=>{
  return {
    type: ASSIGN_AGENT_SUCCESS,
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
    payload:newClient
  };
};
export const addNewClientSuccess = (newClient)=>{
  return {
    type:ADD_NEW_CLIENT_SUCCESS,
    payload:newClient
    
  };
};

// fetch client details by id
export const fetchClientDetails = (params = {}) => {
  return {
    type: FETCH_CLIENT_DETAILS_REQUESTED,
    payload: params 
  };
};
export const fetchClientDetailsSuccess = (data) => {
  return {
    type: FETCH_CLIENT_DETAILS_SUCCESS,
    payload: data
  };
};
export const fetchClientDetailsFail = (error) => {
  return {
    type: FETCH_CLIENT_DETAILS_FAIL,
    payload: { error }
  };
};
export const fetchClientDetailsClear = (data) => {
  return {
    type: FETCH_CLIENT_DETAILS_CLEAR,
    payload: data
  };
};
export const  fetchClientStagesStart = (data) => {
  return {
    type: FETCH_CLIENT_STAGES_START,
    payload: data
  };
};
export const fetchClientStagesEnd = (data) => {
  return {
    type: FETCH_CLIENT_STAGES_END,
    payload: data
  };
};

// update client details 
export const editClientDetails = (params = {}) => {
  return {
    type: EDIT_CLIENT_DETAILS_REQUESTED,
    payload: params
  };
};
export const editClientDetailsSuccess = (data) => {
  return {
    type: EDIT_CLIENT_DETAILS_SUCCESS,
    payload: data 
  };
};
export const editClientDetailsFail = (error) => {
  return {
    type: EDIT_CLIENT_DETAILS_FAIL,
    payload: { error }
  };
};
export const editClientDetailsClear = (data) => {
  return {
    type: EDIT_CLIENT_DETAILS_CLEAR,
    payload: data
  };
};
export const addModalClear = ()=>{
  return {
    type:ADD_MODAL_CLEAR
  };
};
export const updateFinancialInfoStart = (params)=>{
  return {
    type:UPDATE_FINANCIAL_INFO_START,
    payload:params
  };
};
export const  updateFinancialInfoSuccess = (data)=>{
  return {
    type:UPDATE_FINANCIAL_INFO_SUCCESS,
    payload:data
  };
};
export const updateEmploymentStatusStart = (params)=>{
  return {
    type:UPDATE_EMPLOYMENT_INFO_START,
    payload:params
  };
};
export const updateEmploymentStatusSuccess = (data)=>{
  return {
    type:UPDATE_EMPLOYMENT_INFO_SUCCESS,
    payload:data
  };
};
export const updateEmploymentInfoFail = ()=>{
  return {
    type:UPDATE_EMPLOYMENT_INFO_FAIL
  };
};
export const updateFinancialInfoFail = ()=>{
  return {
    type: UPDATE_FINANCIAL_INFO_FAIL
  };
};
export const resetPasswordStart = (params)=>{
  return {
    type:CHANGE_PASSWORD_START,
    payload:params
  };
};

export const resetPasswordClear = ()=>{
  return {
    type:RESET_PASSWORD_CLEAR
  };
};

export const clientForgotPasswordStart = (params)=>{
  return {
    type:CLIENT_FORGOT_PASSWORD_START,
    payload:params
  };
};

export const clientForgotPasswordClear = ()=>{
  return {
    type:CLIENT_FORGOT_PASSWORD_CLEAR
  };
};
export const disable2FA = (params)=>{
  return {
    type:CLIENT_DISABLE_2FA_START,
    payload:params
  };
};