import {
  FETCH_TRADING_ACCOUNTS_REQUESTED,
  FETCH_TRADING_ACCOUNTS_SUCCESS,
  FETCH_TRADING_ACCOUNTS_FAIL
} from "./actionTypes";

const initalState = {
  tradingAccounts:[],
  loading:false,
  error:"",
  modalClear:false
};

const tradingAccountReducer = (state = initalState, action) => {
  switch (action.type){
    case FETCH_TRADING_ACCOUNTS_REQUESTED:
      state = {
        ...state,
        loading: true
      };
      break;
    case FETCH_TRADING_ACCOUNTS_SUCCESS:
      state = {
        ...state,
        tradingAccounts: [action.payload.result],
        tradingAccountsTotalDocs: action.payload.result.totalDocs,
        hasNextPage: action.payload.result.hasNextPage,
        hasPrevPage: action.payload.result.hasPrevPage,
        limit: action.payload.result.limit,
        nextPage: action.payload.result.nextPage,
        page: action.payload.result.page,
        pagingCounter: action.payload.result.pagingCounter,
        prevPage: action.payload.result.prevPage,
        totalPages: action.payload.result.totalPages,
        loading: false,  
      };
      break;
    case FETCH_TRADING_ACCOUNTS_FAIL:
      state = {
        ...state,
        loading: false,
        errorMessage: action.payload
      };
      break;

    default:
      state = { ...state };
  }
  return state;
};

export default tradingAccountReducer;