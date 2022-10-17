
import {
  FETCH_IB_REQUESTS_START,
  FETCH_IB_REQUESTS_SUCCESS,
  FETCH_IB_REQUESTS_ERROR,
  IB_REQUEST_STATUS_CHANGE_TO_APPROVE_SUCCESS,
  IB_REQUEST_APPROVE_START,
  IB_REQUEST_STATUS_CHANGE_TO_REJECT_SUCCESS,
  IB_REQUEST_REJECT_START
} from "./actionTypes";

const initialState = {
  loading: false,
  error: "",
  ibs: [],
  clearingCounter: 0,
  editClearingCounter: 0,
  deleteClearingCounter: 0,
  isApproveOrReject: false
  // totalDocs: 0,
  // docs: [],
  // page: 1
};
const requestsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_IB_REQUESTS_START:
      state = {
        ...state,
        loading: true,
      };
      break;
    case FETCH_IB_REQUESTS_SUCCESS:
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
    case FETCH_IB_REQUESTS_ERROR:
      state = {
        ...state,
        loading: false,
        error: action.payload.error
      };
      break;
    case IB_REQUEST_APPROVE_START:
      state = {
        ...state,
        loading: true
      };
      break;

    case IB_REQUEST_STATUS_CHANGE_TO_APPROVE_SUCCESS:
      // eslint-disable-next-line no-case-declarations
      state = {
        ...state,
        loading: false,
        changeStatusLoading: false,
        isApproveOrReject: true,
      };
      break;
    case IB_REQUEST_REJECT_START:
      state = {
        ...state,
        loading: true
      };
      break;
    case IB_REQUEST_STATUS_CHANGE_TO_REJECT_SUCCESS:
      // eslint-disable-next-line no-case-declarations
      state = {
        ...state,
        loading: false,
        changeStatusLoading: false,
        isApproveOrReject: true,
      };
      break;
    default:
      state = { ...state };

  }
  return state;
};
export default requestsReducer;