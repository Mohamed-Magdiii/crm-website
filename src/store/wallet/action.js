import { 
  FETCH_WALLET_START, 
  FETCH_WALLET_SUCCESS, 
  CLEAR_WALLETS,

  FETCH_CLIENT_WALLET_REQUESTED,
  FETCH_CLIENT_WALLET_SUCCESS,
  FETCH_CLIENT_WALLET_FAIL,

} from "./actionTypes";

export const fetchWalletStart = (params)=>{
  return {
    type:FETCH_WALLET_START,
    payload:params
  };
};
export const fetchWalletSuccess = (data)=>{
  return {
    type:FETCH_WALLET_SUCCESS,
    payload:data
  };
};
export const clearWallets = ()=>{
  return {
    type:CLEAR_WALLETS
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
