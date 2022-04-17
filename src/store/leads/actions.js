import {
  FETCH_LEADS,
  FETCH_LEADS_SUCCESS,
  API_ERROR,
  ADD_NEW_LEAD,
  ADD_NEW_LEAD_SUCCESS
} from "./actionsType";
export const fetchLeads = (leads)=>{
  return {
    type:FETCH_LEADS,
    payload:{ leads }
  };
};
export const fetchLeadsSuccess = (loading)=>{
  return {
    type:FETCH_LEADS_SUCCESS,
    payload:{ loading }
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
export const addNewLeadSuccess = (message)=>{
  return {
    type:ADD_NEW_LEAD_SUCCESS,
    payload:{ message }
  };
};
export const fetchLeadsFromAPI = (dispatch, setTotalDocs, sizePerPage, currentPage)=>{
    
  fetch(`http://localhost:3001/api/v1/crm/leads?limit=${sizePerPage}&page=${currentPage}`)
    .then(result=>result.json())
    .then(data=>{
      dispatch(fetchLeads(data.result.docs));
      setTotalDocs(data.result.totalDocs);
      dispatch(fetchLeadsSuccess(false));
    }).catch(error=>{
      dispatch(error);
    });
};