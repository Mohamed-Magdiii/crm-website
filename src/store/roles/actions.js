import {
  FETCH_ROLES_START,
  FETCH_ROLES_SUCCESS,
  FETCH_ROLES_ERROR
} from "./actionTypes";

export const fetchRoles = (params = {})=>{
  return {
    type:FETCH_ROLES_START,
    payload: params
  };
};
export const fetchRolesSuccess = (data)=>{
  return {
    type:FETCH_ROLES_SUCCESS,
    payload: data
  };
};
export const fetchRolesError = (error)=>{
  return {
    type:FETCH_ROLES_ERROR,
    payload:{ error }
  };
};
