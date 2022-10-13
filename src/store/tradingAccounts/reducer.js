import {
  FETCH_TRADING_ACCOUNTS_REQUESTED,
  FETCH_TRADING_ACCOUNTS_SUCCESS,
  FETCH_TRADING_ACCOUNTS_FAIL,

  FETCH_TRADING_ACCOUNTS_BY_CUSTOMERID_REQUESTED,
  FETCH_TRADING_ACCOUNTS_BY_CUSTOMERID_SUCCESS,
  FETCH_TRADING_ACCOUNTS_BY_CUSTOMERID_FAIL
} from "./actionTypes";

const initalState = {
  tradingAccounts:[],
  loading:false,
  fetchTradingAccountsByCustomerIdLoading: false,
  error:"",
  modalClear:false
};

const tradingAccountReducer = (state = initalState, action) => {
  switch (action.type){
    // fetch trading account by login
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
        fetchTradingAccountsFail: false
      };
      break;
    case FETCH_TRADING_ACCOUNTS_FAIL:
      state = {
        ...state,
        loading: false,
        errorMessage: action.payload,
        fetchTradingAccountsFail: true
      };
      break;

      // fetch trading accounts by customer ID
    case FETCH_TRADING_ACCOUNTS_BY_CUSTOMERID_REQUESTED:
      state = {
        ...state,
        fetchTradingAccountsByCustomerIdLoading: true
      };
      break;
    case FETCH_TRADING_ACCOUNTS_BY_CUSTOMERID_SUCCESS:
      state = {
        ...state,
        tradingAccountsByCustomerId: [...action.payload.result.docs],
        tradingAccountsByCustomerIdTotalDocs: action.payload.result.totalDocs,
        hasNextPage: action.payload.result.hasNextPage,
        hasPrevPage: action.payload.result.hasPrevPage,
        limit: action.payload.result.limit,
        nextPage: action.payload.result.nextPage,
        page: action.payload.result.page,
        pagingCounter: action.payload.result.pagingCounter,
        prevPage: action.payload.result.prevPage,
        totalPages: action.payload.result.totalPages,
        fetchTradingAccountsByCustomerIdLoading: false,  
        fetchTradingAccountsByCustomerIdFail: false
      };
      break;
    case FETCH_TRADING_ACCOUNTS_BY_CUSTOMERID_FAIL:
      state = {
        ...state,
        fetchTradingAccountsByCustomerIdLoading: false,
        fetchTradingAccountsByCustomerIdErrorMessage: action.payload,
        fetchTradingAccountsByCustomerIdFail: true
      };
      break;
    default:
      state = { ...state };
  }
  return state;
};

export default tradingAccountReducer;