import {
  FETCH_CUSTOMERS_COUNTRIES_START,
  FETCH_CUSTOMERS_COUNTRIES_END,
  FETCH_CUSTOMERS_STATS_START,
  FETCH_CUSTOMERS_STATS_END
} from "./actionTypes";

export const fetchCustomerCountriesStart = (params = {})=>{
  return {
    type:FETCH_CUSTOMERS_COUNTRIES_START,
    payload: params
  };
};
export const fetchCustomerCountriesEnd = (data)=>{
  return {
    type:FETCH_CUSTOMERS_COUNTRIES_END,
    payload: data
  };
};

export const fetchCustomerStatsStart = (params = {})=>{
  return {
    type:FETCH_CUSTOMERS_STATS_START,
    payload: params
  };
};
export const fetchCustomerStatsEnd = (data)=>{
  return {
    type:FETCH_CUSTOMERS_STATS_END,
    payload: data
  };
};