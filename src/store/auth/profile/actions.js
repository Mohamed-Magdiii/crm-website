import {
  PROFILE_ERROR,
  PROFILE_SUCCESS,
  EDIT_PROFILE, 
  RESET_PROFILE_FLAG, 
  GET_PROFILE,
  GET_PROFILE_SUCCESS
} from "./actionTypes";

export const editProfile = user => {
  return {
    type: EDIT_PROFILE,
    payload: { user },
  };
};

export const profileSuccess = msg => {
  return {
    type: PROFILE_SUCCESS,
    payload: msg,
  };
};

export const profileError = error => {
  return {
    type: PROFILE_ERROR,
    payload: error,
  };
};

export const resetProfileFlag = error => {
  return {
    type: RESET_PROFILE_FLAG,
    payload: error,
  };
};
export const getUserProfile = ()=>{
  return {
    type:GET_PROFILE
  };
};
export const getProfileSuccess = (data)=>{
  return {
    type:GET_PROFILE_SUCCESS,
    payload:data
  };
};