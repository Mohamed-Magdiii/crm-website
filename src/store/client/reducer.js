import {
  FETCH_CLIENT_DETAILS_REQUESTED,
  FETCH_CLIENT_DETAILS_SUCCESS,
  FETCH_CLIENT_DETAILS_FAIL,
  FETCH_CLIENT_DETAILS_CLEAR,

  FETCH_CLIENT_BANK_ACCOUNT_REQUESTED,
  FETCH_CLIENT_BANK_ACCOUNT_SUCCESS,
  FETCH_CLIENT_BANK_ACCOUNT_FAIL,

  FETCH_CLIENT_WALLET_REQUESTED,
  FETCH_CLIENT_WALLET_SUCCESS,
  FETCH_CLIENT_WALLET_FAIL,

  FETCH_CLIENT_TRANSACTIONS_REQUESTED,
  FETCH_CLIENT_TRANSACTIONS_SUCCESS,
  FETCH_CLIENT_TRANSACTIONS_FAIL,

  EDIT_CLIENT_DETAILS_REQUESTED,
  EDIT_CLIENT_DETAILS_SUCCESS,
  EDIT_CLIENT_DETAILS_FAIL,
  EDIT_CLIENT_DETAILS_CLEAR,

  ADD_BANK_ACCOUNT_REQUESTED,
  ADD_BANK_ACCOUNT_SUCCESS,
  ADD_BANK_ACCOUNT_FAIL,
  ADD_BANK_ACCOUNT_CLEAR,

  DELETE_BANK_ACCOUNT_REQUESTED,
  DELETE_BANK_ACCOUNT_SUCCESS,
  DELETE_BANK_ACCOUNT_FAIL,

  EDIT_BANK_ACCOUNT_REQUESTED,
  EDIT_BANK_ACCOUNT_SUCCESS,
  EDIT_BANK_ACCOUNT_FAIL,
  EDIT_BANK_ACCOUNT_CLEAR
} from "./actionsType";

const initalState = {
  error:"",
  loading:true,
  clients:[],
  successMessage:"",
  clientDetails: {},
  editSuccess: false,
  deleteClearingCounter: 0,
  addClearingCounter: 0,
  bankAccountEditClearingCounter: 0
};

export const clientReducer = (state = initalState, action)=>{
  switch (action.type){
    case "FETCH_CLIENTS_START":
      state = {
        ...state,
        loading:true,
        
      };
      break;
    case "FETCH_CLIENTS_SUCCESS":
      state = {
        ...state,
        clients: [...action.payload.result.docs],
        totalDocs: action.payload.result.totalDocs,
        hasNextPage: action.payload.result.hasNextPage,
        hasPrevPage: action.payload.result.hasPrevPage,
        limit: action.payload.result.limit,
        nextPage: action.payload.result.nextPage,
        page: action.payload.result.page,
        prevPage: action.payload.result.prevPage,
        totalPages: action.payload.result.totalPages,
        loading: false           
      };
      break;
    case "ADD_NEW_CLIENT":
      state = {
        ...state,
        error:"",
        successMessage:""
      };
    
      break;
    case "ADD_NEW_CLIENT_SUCCESS":
      state = {
        ...state,
        loading: false,
        successMessage:action.payload.message,
        totalDocs:action.payload.newClient ? state.totalDocs + 1 : state.totalDocs,
        clients: action.payload.newClient ? [{ 
          createdAt:new Date().toLocaleDateString(), 
          source:"REGISTER_DEMO",
          category:"LIVE_INDIVIDUAL",
          stages:{
            kycApproved:false,
            kyRejected:false
          },
          ...action.payload.newClient
        },
        ...state.clients] : [...state.clients]
      };
      break;
    case "API_ERROR":
      state = {
        ...state,
        loading:false,
        error:action.payload.error
      };
      break;

    // fetch client details
    case FETCH_CLIENT_DETAILS_REQUESTED:
      state = {
        ...state,
        loading: true
      };
      break;
    case FETCH_CLIENT_DETAILS_SUCCESS:
      state = {
        ...state,
        error: false,
        success: true,
        clientDetails: action.payload.result,
        loading: false,
        totalDocs: action.payload.totalDocs,
        hasNextPage: action.payload.hasNextPage,
        hasPrevPage: action.payload.hasPrevPage,
        limit: action.payload.limit,
        nextPage: action.payload.nextPage,
        page: action.payload.page,
        pagingCounter: action.payload.pagingCounter,
        prevPage: action.payload.prevPage,
        totalPages: action.payload.totalPages,
        addError: false
      };
      break;
    case FETCH_CLIENT_DETAILS_FAIL:
      state = {
        ...state,
        error: true,
        errorDetails: action.payload.error,
        loading: false
      };
      break;
    case FETCH_CLIENT_DETAILS_CLEAR:
      state = {
        ...state
      };
      break;

    // fetch client bank details
    case FETCH_CLIENT_BANK_ACCOUNT_REQUESTED:
      state = {
        ...state,
        loading: true
      };
      break;
    case FETCH_CLIENT_BANK_ACCOUNT_SUCCESS:
      state = { 
        ...state,
        success: true,
        error: false,
        loading: false,
        clientBankAccounts: [...action.payload.result.docs],
        totalDocs: action.payload.result.totalDocs,
        docs: action.payload.result.totalDocs,
        hasNextPage: action.payload.result.hasNextPage,
        hasPrevPage: action.payload.result.hasPrevPage,
        limit: action.payload.result.limit,
        nextPage: action.payload.result.nextPage,
        page: action.payload.result.page,
        pagingCounter: action.payload.result.pagingCounter,
        prevPage: action.payload.result.prevPage,
        totalPages: action.payload.result.totalPages,
        addError: false
      };
      break;
    case FETCH_CLIENT_BANK_ACCOUNT_FAIL:
      state = {
        ...state,
        error: true,
        errorDetails: action.payload.error,
        loading: false
      };
      break;

    // fetch client wallet details
    case FETCH_CLIENT_WALLET_REQUESTED:
      state = { 
        ...state,
        loading: true
      };
      break;
    case FETCH_CLIENT_WALLET_SUCCESS:
      state = {
        ...state,
        error: false,
        success: true,
        clientWalletDetails: action.payload.result,
        loading: false
      };
      break;
    case FETCH_CLIENT_WALLET_FAIL:
      state = { 
        ...state,
        error: true,
        errorDetails: action.payload.error,
        loading: false
      };
      break;

    // fetch client transactions 
    case FETCH_CLIENT_TRANSACTIONS_REQUESTED:
      state = {
        ...state,
        loading: true
      };
      break;
    case FETCH_CLIENT_TRANSACTIONS_SUCCESS:
      state = {
        ...state, 
        clientDeposits: action.payload.deposits,
        depositsTotalDocs: action.payload.deposits.result.totalDocs,
        clientWithdrawal: action.payload.withdrawals,
        withdrawalsTotalDocs: action.payload.withdrawals.result.totalDocs,
        error: false,
        success: true,
        loading: false
      };
      break;
    case FETCH_CLIENT_TRANSACTIONS_FAIL:
      state = {
        ...state,
        error: true,
        success: false,
        errorDetails: action.payload.error
      };
      break;

    // update client details
    case EDIT_CLIENT_DETAILS_REQUESTED:
      state = {
        ...state,
        loading: true
      };
      break;
    case EDIT_CLIENT_DETAILS_SUCCESS:
      state = { 
        ...state, 
        updatedClientDetails: action.payload.result,
        editSuccess: true,
        error: false,
        loading: false
      };
      break;
    // TODO check the error message with the backend
    case EDIT_CLIENT_DETAILS_FAIL:
      state = { 
        ...state,
        success: false,
        editError: true,
        EditErrorDetails: action.payload.error,
        loading: false
      };
      break;
    case EDIT_CLIENT_DETAILS_CLEAR:
      state = {
        ...state,
        editSuccess: false,
        error: false
      };
      break;
    
    // add bank account
    case ADD_BANK_ACCOUNT_REQUESTED:
      state = {
        ...state,
        addLoading: true
      };
      break;
    case ADD_BANK_ACCOUNT_SUCCESS:
      state = {
        ...state,
        newBankAccount: action.payload.result,
        addSuccess: true,
        addError: false,
        addLoading: false
      };
      break;
    case ADD_BANK_ACCOUNT_FAIL:
      state = {
        ...state,
        addError: true,
        addSuccess: false,
        addErrorDetails: action.payload.error,
        addLoading: false
      };
      break;
    case ADD_BANK_ACCOUNT_CLEAR:
      state = {
        ...state,
        addClearingCounter: state.addClearingCounter + 1,
        addSuccess: false,
        addError: false
      };
      break;
    
    // delete bank account
    case DELETE_BANK_ACCOUNT_REQUESTED:
      state = {
        ...state,
        loading: true,
        deleteLoading: true
      };
      break;
    case DELETE_BANK_ACCOUNT_SUCCESS:
      state = {
        ...state,
        success: true,
        fail: false,
        loading: false,
        deleteLoading: false,
        deleteClearingCounter: state.deleteClearingCounter + 1
      };
      break;
    case DELETE_BANK_ACCOUNT_FAIL:
      state = {
        ...state,
        success: false,
        fail: true,
        loading:false,
        deleteFailDetails: action.payload.error
      };
      break;

    // edit bank account
    case EDIT_BANK_ACCOUNT_REQUESTED:
      state = {
        ...state,
        loading: true
      };
      break;
    case EDIT_BANK_ACCOUNT_SUCCESS:
      state = {
        ...state,
        loading: false,
        editResult: action.payload.result,
        editSuccess: true,
        editError: false
      };
      break;
    case EDIT_BANK_ACCOUNT_FAIL:
      state = {
        ...state,
        loading: false,
        editSuccess: false,
        editError: true,
        editErrorDetails: action.payload.error
      };
      break;
    case EDIT_BANK_ACCOUNT_CLEAR:
      state = {
        ...state,
        loading: false,
        bankAccountEditClearingCounter: state.bankAccountEditClearingCounter + 1,
        editError: false,
        editResult: null
      };
      break;

    
    default:
      state = { ...state };
  }
  return state;
};
export default clientReducer;
