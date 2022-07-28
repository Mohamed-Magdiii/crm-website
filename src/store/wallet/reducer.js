import {
  FETCH_CLIENT_WALLETS_REQUESTED,
  FETCH_CLIENT_WALLETS_SUCCESS,
  FETCH_CLIENT_WALLETS_FAIL,

  CHANGE_STATUS_WALLET_END,
  CHANGE_STATUS_WALLET_START,

  ADD_CLIENT_WALLET_REQUESTED,
  ADD_CLIENT_WALLET_SUCCESS,
  ADD_CLIENT_WALLET_FAIL,
  ADD_CLIENT_WALLET_CLEAR,
  CONVERT_WALLET_ERROR,
  CONVERT_WALLET_START,
  ERROR_CLEAR
} from "./actionTypes";

const initState = {
  wallets: [],
  loading: false,
  error: "",
  addClearingCounter: 0
};

const walletReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_WALLET_START":
      state = {
        ...state,
        loading: true
      };
      break;
    case "FETCH_WALLET_SUCCESS":
      state = {
        ...state,
        wallets: [...action.payload.result.docs],
        loading: false
      };
      break;
    case "CLEAR_WALLETS":
      state = {
        wallets: [],
        loading: false
      };
      break;

    // fetch client wallet details
    case FETCH_CLIENT_WALLETS_REQUESTED:
      state = {
        ...state,
        loading: true
      };
      break;
    case FETCH_CLIENT_WALLETS_SUCCESS:
      state = {
        ...state,
        error: false,
        success: true,
        docs: action.payload.result.docs,
        totalWalletDocs: action.payload.result.totalDocs,
        loading: false
      };
      break;
    case FETCH_CLIENT_WALLETS_FAIL:
      state = {
        ...state,
        error: true,
        errorDetails: action.payload.error,
        loading: false
      };
      break;

    // add wallet
    case ADD_CLIENT_WALLET_REQUESTED:
      state = {
        addLoading: true,
        addSuccess: false,
        addError: false
      };
      break;
    case ADD_CLIENT_WALLET_SUCCESS:
      state = {
        addLoading: false,
        addSuccess: true,
        addError: false,
        addResult: action.payload.result
      };
      break;
    case ADD_CLIENT_WALLET_FAIL:
      state = {
        addLoading: false,
        addSuccess: false,
        addFail: true,
        addFailDetails: action.payload.error.message
      };
      break;
    case ADD_CLIENT_WALLET_CLEAR:
      state = {
        addSuccess: false,
        addClearingCounter: state.addClearingCounter + 1
      };
      break;
    case CHANGE_STATUS_WALLET_START:
      state = {
        ...state,
        changeStatusLoading: true,
        changeStatusLoadingIndex: action.payload.index,
      };
      break;
    case CHANGE_STATUS_WALLET_END:
      state = {
        ...state,
        docs: state.docs.map((obj, index) => {
          if (index === action.payload.index && !action.payload.error) {
            obj.active = !obj.active;
          }
          return obj;
        }),
        changeStatusLoading: false,
      };
      break;
    case CONVERT_WALLET_START:
      state = {
        ...state,
        disableConvertWalletButton:true
      };
      break;
    case CONVERT_WALLET_ERROR:
      state = {
        ...state,
        disableConvertWalletButton:false,
        convertWalletError: action.payload
      };
      break;
    case ERROR_CLEAR:
      state = {
        ...state,
        convertWalletError:""
      };
      break;
    default:
      state = { ...state };
  }


  return state;
};
export default walletReducer;