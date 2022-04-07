import {
    FETCH_CLIENTS,
    FETCH_CLIENTS_SUCCESS,
    API_ERROR
} from './actionsType'
export const fetchClients=(clients)=>{
   return {
       type:FETCH_CLIENTS,
       payload:{clients}
   }
}
export const fetchClientsSuccess=(loading)=>{
   return{
       type:FETCH_CLIENTS_SUCCESS,
       payload:{loading}
}
}
export const apiError=(error)=>{
    return {
        type:API_ERROR,
        payload:{error}
    }
}