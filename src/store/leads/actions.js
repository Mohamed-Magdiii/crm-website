import {
  FETCH_LEADS_START,
  FETCH_LEADS_SUCCESS,
  API_ERROR,
  ADD_NEW_LEAD,
  ADD_NEW_LEAD_SUCCESS,
  ADD_MODAL_CLEAR
} from "./actionsType";
export const fetchLeadsStart = (params = {})=>{
  return {
    type:FETCH_LEADS_START,
    payload: params 
  };
};
export const fetchLeadsSuccess = (data)=>{
  return {
    type:FETCH_LEADS_SUCCESS,
    payload:data 
  };
};

export const apiError = (error)=>{
  return {
    type:API_ERROR,
    payload:{ error }
  };
};
export const addNewLead = (newLead)=>{
  return {
    type: ADD_NEW_LEAD,
    payload:{ newLead }
  }; 
};
export const addNewLeadSuccess = (newLead)=>{
  return {
    type:ADD_NEW_LEAD_SUCCESS,
    payload:{ 
      newLead 
    }
  };
};
export const addModalClear = ()=>{
  return {
    type:ADD_MODAL_CLEAR
  };
};