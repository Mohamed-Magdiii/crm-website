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

const initialState = {
  error: "",
  loading: false,
  emailTemplates: []
};

const emailTemplateReducer = (state = initialState, action) => {
  switch (action.type){
    // FETCH
    case FETCH_EMAIL_TEMPLATES_REQUESTED:
      state = {
        ...state,
        loading: true
      };
      break;
    
    case FETCH_EMAIL_TEMPLATES_SUCCESS:
      state = {
        ...state,
        loading: false,
        emailTemplates: action.payload.data
      };
      break;

    case FETCH_EMAIL_TEMPLATES_FAIL:
      state = {
        ...state,
        loading: false,
        error: action.payload.error
      };
      break;

    // ADD
    case ADD_EMAIL_TEMPLATE_REQUESTED:
      state = {
        ...state,
        loading: true,
      };
      break;

    case ADD_EMAIL_TEMPLATE_SUCCESS:
      state = {
        ...state,
        loading: false,
        newEmailTemplate: action.payload.data
      };
      break;

    case ADD_EMAIL_TEMPLATE_FAIL:
      state = {
        ...state,
        loading: false,
        error: action.payload.error
      };
      break;

    // DELETE
    case DELETE_EMAIL_TEMPLATE_REQUESTED:
      state = {
        ...state,
        loading: true
      };
      break;

    case DELETE_EMAIL_TEMPLATE_SUCCESS:
      state = {
        ...state,
        deletedEmailTemplate: action.payload.data
      };
      break;

    case DELETE_EMAIL_TEMPLATE_FAIL:
      state = {
        ...state,
        error: action.payload.error
      };
      break;

    // EDIT
    case EDIT_EMAIL_TEMPLATE_REQUESTED:
      state = {
        ...state,
        loading: true
      };
      break;

    case EDIT_EMAIL_TEMPLATE_SUCCESS:
      // TODO right now it's simple as it could be later on this needs to be updated 
      state = {
        ...state,
        updatedEmailTemplate: action.payload.data
      };
      break;
      
    case EDIT_EMAIL_TEMPLATE_FAIL:
      // TODO right now it's simple as it could be later on this needs to be updated 
      state = {
        ...state,
        error: action.payload.error
      };
      break;
    
    default: 
      state = { ...state };
  }

  return state;
};

export default emailTemplateReducer;