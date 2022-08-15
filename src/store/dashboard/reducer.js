
import {
  FETCH_CUSTOMERS_COUNTRIES_START,
  FETCH_CUSTOMERS_COUNTRIES_END,
  FETCH_CUSTOMERS_STATS_START,
  FETCH_CUSTOMERS_STATS_END
} from "./actionTypes";

const initialState = {
  loading:false,
};
const dashboardReducer = (state = initialState, action)=>{
  switch (action.type){
    case FETCH_CUSTOMERS_COUNTRIES_START:
      state = {
        ...state,
        loading:true,
      };
      break;
    case FETCH_CUSTOMERS_COUNTRIES_END:
      state = {
        ...state,
        loading: false,
        ...action.payload,
      };
      break;
    case FETCH_CUSTOMERS_STATS_START:
      state = {
        ...state,
        statsLoading:true,
      };
      break;
    case FETCH_CUSTOMERS_STATS_END:
      state = {
        ...state,
        statsLoading:false,
        ...action.payload,
      };
      break;
    default:
      state = { ...state };

  }
  return state;
};
export default dashboardReducer;