import {
  FETCH_CLIENTS,
  FETCH_CLIENTS_SUCCESS,
  API_ERROR
} from "./actionsType";

export const fetchClients = (clients)=>{
  return {
    type:FETCH_CLIENTS,
    payload:{ clients }
  };
};
export const fetchClientsSuccess = (loading)=>{
  return {
    type:FETCH_CLIENTS_SUCCESS,
    payload:{ loading }
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
      dispatch(fetchClients(data.result.docs)); 
      setTotalDocs(data.result.totalDocs);
      dispatch(fetchClientsSuccess(false));
    }).catch(error=>{
      dispatch(error);
    });
};