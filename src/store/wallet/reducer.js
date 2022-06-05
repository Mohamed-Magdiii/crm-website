import {
  FETCH_CLIENT_WALLET_REQUESTED,
  FETCH_CLIENT_WALLET_SUCCESS,
  FETCH_CLIENT_WALLET_FAIL,
} from "./actionTypes";

const initState = {
  wallets:[],
  loading:false,
  error:""
};

const walletReducer = (state = initState, action)=>{
  switch (action.type){
    case "FETCH_WALLET_START":
      state = {
        ...state,
        loading:true
      };
      break;
    case "FETCH_WALLET_SUCCESS":
      state = {
        ...state,
        wallets:[...action.payload.result.docs],
        loading:false
      };
      break;
    case "CLEAR_WALLETS":
      state = {
        wallets:[],
        loading:false
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
        totalWalletDocs: action.payload.result.totalDocs,
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
    
    default:
      state = { ...state };
  }
    

  return state;
};
export default walletReducer;