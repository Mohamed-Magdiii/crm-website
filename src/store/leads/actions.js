import {
    FETCH_LEADS,
    FETCH_LEADS_SUCCESS,
    API_ERROR
} from './actionsType'
export const fetchLeads=(leads)=>{
    return {
        type:FETCH_LEADS,
        payload:{leads}
    }
}
export const fetchLeadsSuccess=(loading)=>{
      return {
          type:FETCH_LEADS_SUCCESS,
          payload:{loading}
      }
}
export const apiError=(error)=>{
    return {
        type:API_ERROR,
        payload:{error}
    }
}