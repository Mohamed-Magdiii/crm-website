import {
  FETCH_SYSTEM_EMAILS_REQUESTED,
  FETCH_SYSTEM_EMAILS_SUCCESS,
  FETCH_SYSTEM_EMAILS_FAIL,

  ADD_SYSTEM_EMAIL_REQUESTED,
  ADD_SYSTEM_EMAIL_SUCCESS,
  ADD_SYSTEM_EMAIL_FAIL,
  ADD_SYSTEM_EMAIL_CLEAR,

  DELETE_SYSTEM_EMAIL_REQUESTED,
  DELETE_SYSTEM_EMAIL_SUCCESS,
  DELETE_SYSTEM_EMAIL_FAIL,

  EDIT_SYSTEM_EMAIL_REQUESTED,
  EDIT_SYSTEM_EMAIL_SUCCESS,
  EDIT_SYSTEM_EMAIL_FAIL,
  EDIT_SYSTEM_EMAIL_CLEAR
} from "./actionTypes";

export const fetchSystemEmails = (params = {}) => {
  return {
    type: FETCH_SYSTEM_EMAILS_REQUESTED,
    payload: params 
  };
};
export const fetchSystemEmailsSuccess = (data) => {
  return {
    type: FETCH_SYSTEM_EMAILS_SUCCESS,
    payload: data
  };
};
export const fetchSystemEmailsFail = (error) => {
  return {
    type: FETCH_SYSTEM_EMAILS_FAIL,
    payload: { error }
  };
};

export const addSystemEmail = (params = {}) => {
  return {
    type: ADD_SYSTEM_EMAIL_REQUESTED,
    payload: params
  };
};
export const addSystemEmailSuccess = (data) => {
  return {
    type: ADD_SYSTEM_EMAIL_SUCCESS,
    payload: data
  };
};
export const addSystemEmailFail = (error) => {
  return {
    type: ADD_SYSTEM_EMAIL_FAIL,
    payload: { error }
  };
};
export const addSystemEmailClear = (data) => {
  return {
    type:ADD_SYSTEM_EMAIL_CLEAR,
    payload: data
  };
};

export const deleteSystemEmail = (params = {}) => {
  return {
    type: DELETE_SYSTEM_EMAIL_REQUESTED,
    payload: params
  };
};
export const deleteSystemEmailSuccess = (data) => {
  return {
    type: DELETE_SYSTEM_EMAIL_SUCCESS,
    payload: data
  };
};
export const deleteSystemEmailFail = (error) => {
  return {
    type: DELETE_SYSTEM_EMAIL_FAIL,
    payload: { error }
  };
};

export const editSystemEmail = (params = {}) => {
  return {
    type: EDIT_SYSTEM_EMAIL_REQUESTED,
    payload: params
  };
};
export const editSystemEmailSuccess = (data) => {
  return {
    type: EDIT_SYSTEM_EMAIL_SUCCESS,
    payload: data
  };
};
export const editSystemEmailFail = (error) => {
  return {
    type: EDIT_SYSTEM_EMAIL_FAIL,
    payload: { error }
  };
};
export const editSystemEmailClear = (data) => {
  return {
    type: EDIT_SYSTEM_EMAIL_CLEAR,
    payload: data
  };
};