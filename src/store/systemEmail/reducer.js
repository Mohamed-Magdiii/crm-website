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

const initialState = {
  error: "",
  loading: false,
  systemEmails: [],
  clearingCounter: 0,
  deleteClearingCounter: 0,
  editClearingCounter: 0
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
        addLoading: true
      };
      break;
    case ADD_SYSTEM_EMAIL_SUCCESS:
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
      state = {
        ...state,
        addErrorDetails: action.payload,
        addLoading: false,
        addSuccess: false,
        addError: true
      };
      break;
    case ADD_SYSTEM_EMAIL_CLEAR:
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
        editLoading: true
      };
      break;
    case EDIT_SYSTEM_EMAIL_SUCCESS:
      // eslint-disable-next-line no-case-declarations
      const { id, ...payload } = action.payload; 
      state = {
        ...state,
        docs: state.docs.map(obj => {
          if (obj.id === id){
            return {
              ...obj,
              title: payload.result.title,
              action: payload.result.action
            }; 
          } else {
            return obj;
          }
        }),
        editLoading: false,
        editResult: action.payload.result,
        editError: action.payload.error
      };
      break;
    case EDIT_SYSTEM_EMAIL_FAIL:
      state = {
        ...state,
        editError: action.payload.error
      };
      break;
    case EDIT_SYSTEM_EMAIL_CLEAR:
      state = {
        ...state,
        editResult: null,
        editError: null,
        editClearingCounter: state.editClearingCounter + 1
      };
      break;
    
    default: 
      state = { ...state };
  }

  return state;
};

export default systemEmailsReducer;