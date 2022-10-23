
import {
  FETCH_USERS_START,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  FETCH_USERS_ROLES_START,
  FETCH_USERS_ROLES_SUCCESS,
  FETCH_USERS_ROLES_ERROR,
  ADD_USERS_START,
  ADD_USERS_SUCCESS,
  ADD_USERS_ERROR,
  ADD_USER_CLEAR,
  EDIT_USERS_START,
  EDIT_USERS_PASS_START,
  EDIT_USERS_DONE,
  EDIT_USER_CLEAR,
  DELETE_USERS_START,
  DELETE_USERS_DONE,
  EDIT_USERS_ERROR,
  GET_ASSIGNED_USERS_SUCCESS
} from "./actionTypes";

const initialState = {
  loading: false,
  error: "",
  users: [],
  clearingCounter: 0,
  editClearingCounter: 0,
  deleteClearingCounter: 0,
  salesAgent:[],
  addSuccess: false,
  // totalDocs: 0,
  // docs: [],
  // page: 1
};
const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_START:
      state = {
        ...state,
        loading: true,
      };
      break;
    case FETCH_USERS_SUCCESS:
      state = {
        ...state,
        docs: [...action.payload.docs],
        totalDocs: action.payload.totalDocs,
        hasNextPage: action.payload.hasNextPage,
        hasPrevPage: action.payload.hasPrevPage,
        limit: action.payload.limit,
        nextPage: action.payload.nextPage,
        page: action.payload.page,
        pagingCounter: action.payload.pagingCounter,
        prevPage: action.payload.prevPage,
        totalPages: action.payload.totalPages,
        loading: false,
      };
      break;
    case FETCH_USERS_ERROR:
      state = {
        ...state,
        loading: false,
        error: action.payload.error
      };
      break;

    case FETCH_USERS_ROLES_START:
      state = {
        ...state,
        rolesloading: true,
      };
      break;
    case FETCH_USERS_ROLES_SUCCESS:
      state = {
        ...state,
        rolesloading: false,
        rolesData: [...action.payload.docs],
      };
      break;
    case FETCH_USERS_ROLES_ERROR:
      state = {
        ...state,
        rolesloading: false,
        roleError: action.payload.error
      };
      break;

    case ADD_USERS_START:
      state = {
        ...state,
        addLoading: true,
      };
      break;
    case ADD_USERS_SUCCESS:
      state = {
        ...state,
        addResult: action.payload,
        docs: [action.payload, ...state.docs],
        addSuccess: true,
        addError: false,
        addLoading: false,
        addFlag: false,
      };
      break;
    case ADD_USERS_ERROR:
      state = {
        ...state,
        addLoading: false,
        addErrorDetails: action.payload,
        addSuccess: false,
        addError: true,
      };
      break;
    case ADD_USER_CLEAR:
      state = {
        ...state,
        addErrorDetails: "",
        addSuccess: false,
        addError: false,
        addResult: null,
        clearingCounter: state.clearingCounter + 1
      };
      break;

    case EDIT_USERS_START:
      state = {
        ...state,
        docs:state.docs.map((doc)=>{
          if (doc._id === action.payload.id){
            return {
              ...doc,
              ...action.payload.values
            };
          }
          else 
            return doc;
        }),
        editLoading: true,
      };
      break;

    case EDIT_USERS_PASS_START:
      state = {
        ...state,
        editLoading: true,
      };

      break;
    case EDIT_USERS_DONE:
      state = {
        ...state,
        editLoading: false,
        editResult: action.payload.result,
        editSuccess: true,
        clearingCounter: state.clearingCounter + 1
      };
      break;
    case EDIT_USERS_ERROR:
      state = {
        ...state,
        editLoading: false,
        editError: action.payload.error,
        editSuccess: false,
      };
      break;
    case EDIT_USER_CLEAR:
      state = {
        ...state,
        editResult: null,
        editError: null,
        editSuccess: false,
        editClearingCounter: state.editClearingCounter + 1
      };
      break;
    case DELETE_USERS_START:
      state = {
        ...state,
        deleteLoading: true,
      };
      break;
    case DELETE_USERS_DONE:
      state = {
        ...state,
        docs: state.docs.filter(obj => obj._id !== action.payload.id),
        deleteLoading: false,
        deleteResult: action.payload.result,
        deleteError: action.payload.error,
        deleteClearingCounter: state.deleteClearingCounter + 1,
      };
      break;
    case GET_ASSIGNED_USERS_SUCCESS:
      state = { 
        ...state,
        salesAgent:[...action.payload.docs]
      };
      break;
    default:
      state = { ...state };

  }
  return state;
};
export default usersReducer;