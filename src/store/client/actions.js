import {
  FETCH_CLIENTS_START,
  FETCH_CLIENTS_SUCCESS,
  ADD_NEW_CLIENT,
  ADD_NEW_CLIENT_SUCCESS,
  API_ERROR
} from "./actionsType";

export const fetchClientsStart = (params = {})=>{
  return {
    type:FETCH_CLIENTS_START,
    payload:params
  };
};
export const fetchClientsSuccess = (data)=>{
  return {
    type:FETCH_CLIENTS_SUCCESS,
    payload:data
  };
};
export const apiError = (error)=>{
  return {
    type:API_ERROR,
    payload:{ error }
  };
};

export const fetchClientsFromAPI = (dispatch, setTotalDocs, sizePerPage, currentPage)=>{
    
  fetch(`http://localhost:3001/api/v1/crm/clients?limit=${sizePerPage}&page=${currentPage}`)
    .then(result=>result.json())
    .then(data=>{
      dispatch(fetchClientsStart(data.result.docs)); 
      setTotalDocs(data.result.totalDocs);
      dispatch(fetchClientsSuccess(false));
    }).catch(error=>{
      dispatch(error);
    });
};
export const addNewClient = (newClient)=>{
  return {
    type:ADD_NEW_CLIENT,
    payload:{ newClient }
  };
};
export const addNewClientSuccess = (message, newClient)=>{
  return {
    type:ADD_NEW_CLIENT_SUCCESS,
    payload:{
      message,
      newClient
    }
  };
};
