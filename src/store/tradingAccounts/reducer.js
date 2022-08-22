
import {
  FETCH_ACCOUNT_TYPES_START,
  FETCH_ACCOUNT_TYPES_END,
  FETCH_TRADING_ACCOUNT_START,
  FETCH_TRADING_ACCOUNT_END,
  CREATE_TRADING_ACCOUNT_START,
  CREATE_TRADING_ACCOUNT_END,
  CREATE_TRADING_ACCOUNT_CLEAR
} from "./actionTypes";

const initialState = {
  accountTypesLoading: false,
  createCounter : 0,
  accounts: {}
};
const leadReducer = (state = initialState, action)=>{
  switch (action.type){
    case FETCH_ACCOUNT_TYPES_START:
      state = {
        ...state,
        accountTypesLoading: true,
      };
      break;
    case FETCH_ACCOUNT_TYPES_END:
      state = {
        ...state,
        accountTypesLoading: false,
        accountTypes: action.payload.data,
        accountTypesError: action.payload.error,
      };
      break;
    
    case FETCH_TRADING_ACCOUNT_START:
      state = {
        ...state,
        loading: true,
      };
      break;
    case FETCH_TRADING_ACCOUNT_END:
      state = {
        ...state,
        loading: false,
        accounts: action.payload.data,
        accountsError: action.payload.error,
        createCounter: state.createCounter + 1,
      };
      break;
    
    case CREATE_TRADING_ACCOUNT_START:
      state = {
        ...state,
        creating: true,
      };
      break;
    case CREATE_TRADING_ACCOUNT_END:
      state = {
        ...state,
        creating: false,
        accounts: {
          ...state.accounts,
          docs : [
            action.payload.data,
            ...(state.accounts && state.accounts.docs || [])
          ]
        },
      };
      break;
    case CREATE_TRADING_ACCOUNT_CLEAR:
      state = {
        ...state,
        createCounter: state.createCounter + 1,
      };
      break;

    default:
      state = { ...state };

  }
  return state;
};
export default leadReducer;