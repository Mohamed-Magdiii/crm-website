import {
  FETCH_EMAIL_TEMPLATES_REQUESTED,
  FETCH_EMAIL_TEMPLATES_SUCCESS,
  FETCH_EMAIL_TEMPLATES_FAIL,

  ADD_EMAIL_TEMPLATE_REQUESTED,
  ADD_EMAIL_TEMPLATE_SUCCESS,
  ADD_EMAIL_TEMPLATE_FAIL,

  DELETE_EMAIL_TEMPLATE_REQUESTED,
  DELETE_EMAIL_TEMPLATE_SUCCESS,
  DELETE_EMAIL_TEMPLATE_FAIL,

  EDIT_EMAIL_TEMPLATE_REQUESTED,
  EDIT_EMAIL_TEMPLATE_SUCCESS,
  EDIT_EMAIL_TEMPLATE_FAIL
} from "./actionTypes";

export const fetchEmailTemplates = (params = {}) => {
  return {
    type: FETCH_EMAIL_TEMPLATES_REQUESTED,
    payload: params 
  };
};

export const fetchEmailTemplatesSuccess = (data) => {
  return {
    type: FETCH_EMAIL_TEMPLATES_SUCCESS,
    payload: data
  };
};

export const fetchEmailTemplatesFail = (error) => {
  return {
    type: FETCH_EMAIL_TEMPLATES_FAIL,
    payload: { error }
  };
};

export const addEmailTemplate = (params = {}) => {
  return {
    type: ADD_EMAIL_TEMPLATE_REQUESTED,
    payload: params
  };
};

export const addEmailTemplateSuccess = (data) => {
  return {
    type: ADD_EMAIL_TEMPLATE_SUCCESS,
    payload: data
  };
};

export const addEmailTemplateFail = (error) => {
  return {
    type: ADD_EMAIL_TEMPLATE_FAIL,
    payload: { error }
  };
};

export const deleteEmailTemplate = (params = {}) => {
  return {
    type: DELETE_EMAIL_TEMPLATE_REQUESTED,
    payload: params
  };
};

export const deleteEmailTemplateSuccess = (data) => {
  return {
    type: DELETE_EMAIL_TEMPLATE_SUCCESS,
    payload: data
  };
};

export const deleteEmailTemplateFail = (error) => {
  return {
    type: DELETE_EMAIL_TEMPLATE_FAIL,
    payload: { error }
  };
};

export const editEmailTemplate = (params = {}) => {
  return {
    type: EDIT_EMAIL_TEMPLATE_REQUESTED,
    payload: params
  };
};

export const editEmailTemplateSuccess = (data) => {
  return {
    type: EDIT_EMAIL_TEMPLATE_SUCCESS,
    payload: data
  };
};

export const editEmailTemplateFail = (error) => {
  return {
    type: EDIT_EMAIL_TEMPLATE_FAIL,
    payload: { error }
  };
};