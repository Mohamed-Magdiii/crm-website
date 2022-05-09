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
  EDIT_SYSTEM_EMAIL_CLEAR,

  EDIT_SYSTEM_EMAIL_CONTENT_REQUESTED,
  EDIT_SYSTEM_EMAIL_CONTENT_SUCCESS,
  EDIT_SYSTEM_EMAIL_CONTENT_FAIL,
  EDIT_SYSTEM_EMAIL_CONTENT_CLEAR
} from "./actionTypes";

// fetch
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

// add
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

// delete
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

// edit
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

// edit content
export const editSystemEmailContent = (params = {}) => {
  return {
    type: EDIT_SYSTEM_EMAIL_CONTENT_REQUESTED,
    payload: params
  };
};
export const editSystemEmailContentSuccess = (data) => {
  return {
    type: EDIT_SYSTEM_EMAIL_CONTENT_SUCCESS,
    payload: data
  };
};
export const editSystemEmailContentFail = (error) => {
  return {
    type: EDIT_SYSTEM_EMAIL_CONTENT_FAIL,
    payload: { error }
  };
};
export const editSystemEmailContentClear = (data) => {
  return {
    type: EDIT_SYSTEM_EMAIL_CONTENT_CLEAR,
    payload: data
  };
};