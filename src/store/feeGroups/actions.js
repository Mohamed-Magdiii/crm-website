import {
  FETCH_FEE_GROUPS_START,
  FETCH_FEE_GROUPS_SUCCESS,
  API_ERROR
} from "./actionsType";
export const fetchFeeGroupStart = (params)=>{
  return {
    type:FETCH_FEE_GROUPS_START,
    payload:{ params }
  };
};
export const fetchFeeGroupsSuccess = (data)=>{
  return {
    type:FETCH_FEE_GROUPS_SUCCESS,
    payload:data
  };
};
export const apiError = ({ error })=> {
  return {
    type:API_ERROR,
    payload:{ error }
  };
};