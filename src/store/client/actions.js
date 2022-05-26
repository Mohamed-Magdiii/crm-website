import {
  FETCH_CLIENTS_START,
  FETCH_CLIENTS_SUCCESS,
  ADD_NEW_CLIENT,
  ADD_NEW_CLIENT_SUCCESS,
  API_ERROR,

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
  EDIT_CLIENT_DETAILS_CLEAR
} from "./actionsType";

export const fetchClientsStart = (params = {})=>{
  return {
    type:FETCH_CLIENTS_START,
    payload:params
  };
};
export const fetchClientsSuccess = (data)=>{
  return {
    type:FETCH_CLIENTS_SUCCESS,
    payload:data
  };
};
export const apiError = (error)=>{
  return {
    type:API_ERROR,
    payload:{ error }
  };
};

export const fetchClientsFromAPI = (dispatch, setTotalDocs, sizePerPage, currentPage)=>{
    
  fetch(`http://localhost:3001/api/v1/crm/clients?limit=${sizePerPage}&page=${currentPage}`)
    .then(result=>result.json())
    .then(data=>{
      dispatch(fetchClientsStart(data.result.docs)); 
      setTotalDocs(data.result.totalDocs);
      dispatch(fetchClientsSuccess(false));
    }).catch(error=>{
      dispatch(error);
    });
};
export const addNewClient = (newClient)=>{
  return {
    type:ADD_NEW_CLIENT,
    payload:{ newClient }
  };
};
export const addNewClientSuccess = (message, newClient)=>{
  return {
    type:ADD_NEW_CLIENT_SUCCESS,
    payload:{
      message,
      newClient
    }
  };
};

// fetch client details by id
export const fetchClientDetails = (params = {}) => {
  return {
    type: FETCH_CLIENT_DETAILS_REQUESTED,
    payload: params 
  };
};
export const fetchClientDetailsSuccess = (data) => {
  return {
    type: FETCH_CLIENT_DETAILS_SUCCESS,
    payload: data
  };
};
export const fetchClientDetailsFail = (error) => {
  return {
    type: FETCH_CLIENT_DETAILS_FAIL,
    payload: { error }
  };
};
export const fetchClientDetailsClear = (data) => {
  return {
    type: FETCH_CLIENT_DETAILS_CLEAR,
    payload: data
  };
};

// fetch client bank details
export const fetchClientBankAccount = (params = {}) => {
  return {
    type: FETCH_CLIENT_BANK_ACCOUNT_REQUESTED,
    payload: params
  };
};
export const fetchClientBankAccountSuccess = (data) => {
  return {
    type: FETCH_CLIENT_BANK_ACCOUNT_SUCCESS,
    payload: data
  };
};
export const fetchClientBankAccountFail = (error) => {
  return {
    type: FETCH_CLIENT_BANK_ACCOUNT_FAIL,
    payload: { error }
  };
};

// fetch client wallet details
export const fetchClientWallet = (params = {}) => {
  return {
    type: FETCH_CLIENT_WALLET_REQUESTED,
    payload: params
  };
};
export const fetchClientWalletSuccess = (data) => {
  return {
    type: FETCH_CLIENT_WALLET_SUCCESS,
    payload: data
  };
};
export const fetchClientWalletFail = (error) => {
  return {
    type: FETCH_CLIENT_WALLET_FAIL,
    payload: { error }
  };
};

// fetch client transactions 
export const fetchClientTransactions = (params = {}) => {
  return {
    type: FETCH_CLIENT_TRANSACTIONS_REQUESTED,  
    payload: params
  };
};
export const fetchClientTransactionsSuccess = (data) => {
  return {
    type: FETCH_CLIENT_TRANSACTIONS_SUCCESS,
    payload: data
  };
};
export const fetchClientTransactionsFail = (error) => {
  return {
    type: FETCH_CLIENT_TRANSACTIONS_FAIL,
    payload: { error }
  };
};

// update client details 
export const editClientDetails = (params = {}) => {
  return {
    type: EDIT_CLIENT_DETAILS_REQUESTED,
    payload: params
  };
};
export const editClientDetailsSuccess = (data) => {
  return {
    type: EDIT_CLIENT_DETAILS_SUCCESS,
    payload: data 
  };
};
export const editClientDetailsFail = (error) => {
  return {
    type: EDIT_CLIENT_DETAILS_FAIL,
    payload: { error }
  };
};
export const editClientDetailsClear = (data) => {
  return {
    type: EDIT_CLIENT_DETAILS_CLEAR,
    payload: data
  };
};