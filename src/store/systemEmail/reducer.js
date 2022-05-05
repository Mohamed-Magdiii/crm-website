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
  EDIT_SYSTEM_EMAIL_FAIL
} from "./actionTypes";

const initialState = {
  error: "",
  loading: false,
  systemEmails: [],
  clearingCounter: 0,
  deleteClearingCounter: 0
};

const systemEmailsReducer = (state = initialState, action) => {
  switch (action.type){
    // FETCH
    case FETCH_SYSTEM_EMAILS_REQUESTED:
      state = {
        ...state,
        loading: true
      };
      break;
    case FETCH_SYSTEM_EMAILS_SUCCESS:
      state = {
        ...state,
        loading: false,
        docs: [...action.payload.docs],
        totalDocs: action.payload.totalDocs,
        hasNextPage: action.payload.hasNextPage,
        hasPrevPage: action.payload.hasPrevPage,
        limit: action.payload.limit,
        nextPage: action.payload.nextPage,
        page: action.payload.page,
        pagingCounter: action.payload.pagingCounter,
        prevPage: action.payload.prevPage,
        totalPages: action.payload.totalPages
      };
      break;
    case FETCH_SYSTEM_EMAILS_FAIL:
      state = {
        ...state,
        loading: false,
        error: action.payload.error
      };
      break;

    // ADD
    case ADD_SYSTEM_EMAIL_REQUESTED:
      console.log("from reducer.js requested");
      state = {
        ...state,
        addLoading: true
      };
      break;
    case ADD_SYSTEM_EMAIL_SUCCESS:
      // it's not getting to this function for some reason !
      console.log("from reducer system email add success");
      state = {
        ...state,
        addResult: action.payload,
        docs: [ action.payload, ...state.docs ],
        addSuccess: true,
        addError: false,
        addLoading: false
      };
      break;
    case ADD_SYSTEM_EMAIL_FAIL:
      console.log("from reducer system email add failure", action.payload);
      state = {
        ...state,
        addErrorDetails: action.payload,
        addLoading: false,
        addSuccess: false,
        addError: true
      };
      break;
    case ADD_SYSTEM_EMAIL_CLEAR:
      console.log("from reducer add system email clear");
      state = {
        ...state,
        addErrorDetails: "",
        addSuccess: false,
        addError: false,
        addResult: null,
        clearingCounter: state.clearingCounter + 1
      };
      break;

    // DELETE
    case DELETE_SYSTEM_EMAIL_REQUESTED:
      state = {
        ...state,
        deleteLoading: true
      };
      break;
    case DELETE_SYSTEM_EMAIL_SUCCESS:
      // it won't get to this function for some reason I still have no idea why
      state = {
        ...state,
        docs: state.docs.filter(obj => obj._id !== action.payload.id),
        deleteLoading: false,
        deleteResult: action.payload.result,
        deleteError: action.payload.error,
        deleteClearingCounter: state.deleteClearingCounter + 1
      };
      break;
    case DELETE_SYSTEM_EMAIL_FAIL:
      state = {
        ...state,
        deleteError: action.payload.error
      };
      break;

    // EDIT
    case EDIT_SYSTEM_EMAIL_REQUESTED:
      state = {
        ...state,
        loading: true
      };
      break;
    case EDIT_SYSTEM_EMAIL_SUCCESS: 
      // TODO create a new endpoint to edit the content this is just used to update 
      // title and action and that's it 
      state = {
        ...state,
        updatedSystemEmail: action.payload.data
      };
      break;
    case EDIT_SYSTEM_EMAIL_FAIL:
      console.log("from reducer edit fail function");
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

export default systemEmailsReducer;