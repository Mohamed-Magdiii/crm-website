
import {
  FETCH_TEAMS_START, FETCH_TEAMS_SUCCESSFUL, API_ERROR, MODAL_CLEAR, ADD_TEAMS_START, ADD_TEAMS_SUCCESSFUL
} from "./actionsTypes";

export const fetchTeamsStart = (params)=>{
  return {
    type:FETCH_TEAMS_START,
    payload:{ params }
  };
};
export const fetchTeamsSuccess = (data)=>{
  return {
    type:FETCH_TEAMS_SUCCESSFUL,
    payload:data
  };
};

export const addTeamsStart = (params)=>{
  return {
    type:ADD_TEAMS_START,
    payload:{ params }
  };
};
export const addTeamsSuccess = (data)=>{
  return {
    type:ADD_TEAMS_SUCCESSFUL,
    payload:data
  };
};

export const apiError = (error)=> {
  return {
    type:API_ERROR,
    payload:{ error }
  };
};

export const modalClear = () =>{
  return {
    type:MODAL_CLEAR
  };
}; 