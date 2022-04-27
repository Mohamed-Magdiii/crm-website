import {
  FETCH_SYSTEM_EMAILS_REQUESTED,
  FETCH_SYSTEM_EMAILS_SUCCESS,
  FETCH_SYSTEM_EMAILS_FAIL,

  ADD_SYSTEM_EMAIL_REQUESTED,
  ADD_SYSTEM_EMAIL_SUCCESS,
  ADD_SYSTEM_EMAIL_FAIL,

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
      state = {
        ...state,
        loading: true,
      };
      break;
    case ADD_SYSTEM_EMAIL_SUCCESS:
      state = {
        ...state,
        loading: false,
        newSystemEmail: action.payload.data
      };
      break;
    case ADD_SYSTEM_EMAIL_FAIL:
      state = {
        ...state,
        loading: false,
        error: action.payload.error
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
      // TODO right now it's simple as it could be later on this needs to be updated 
      state = {
        ...state,
        updatedSystemEmail: action.payload.data
      };
      break;
    case EDIT_SYSTEM_EMAIL_FAIL:
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

export default systemEmailsReducer;