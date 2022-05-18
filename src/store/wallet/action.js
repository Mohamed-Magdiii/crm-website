import { 
  FETCH_WALLET_START, FETCH_WALLET_SUCCESS, CLEAR_WALLETS
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