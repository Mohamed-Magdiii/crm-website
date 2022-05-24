import {
  FETCH_CLIENT_DETAILS_REQUESTED,
  FETCH_CLIENT_DETAILS_SUCCESS,
  FETCH_CLIENT_DETAILS_FAIL,
  FETCH_CLIENT_DETAILS_CLEAR
} from "./actionsType";

const initalState = {
  error:"",
  loading:false,
  clients:[],
  successMessage:""
};

export const clientReducer = (state = initalState, action)=>{
  switch (action.type){
    case "FETCH_CLIENTS_START":
      state = {
        ...state,
        loading:true,
        
      };
      break;
    case "FETCH_CLIENTS_SUCCESS":
      state = {
        ...state,
        clients: [...action.payload.result.docs],
        totalDocs: action.payload.result.totalDocs,
        hasNextPage: action.payload.result.hasNextPage,
        hasPrevPage: action.payload.result.hasPrevPage,
        limit: action.payload.result.limit,
        nextPage: action.payload.result.nextPage,
        page: action.payload.result.page,
        prevPage: action.payload.result.prevPage,
        totalPages: action.payload.result.totalPages,
        loading: false
                  
      };
      break;
    case "ADD_NEW_CLIENT":
      state = {
        ...state,
        error:"",
        successMessage:""
      };
    
      break;
    case "ADD_NEW_CLIENT_SUCCESS":
      state = {
        ...state,
        loading: false,
        successMessage:action.payload.message,
        totalDocs:action.payload.newClient ? state.totalDocs + 1 : state.totalDocs,
        clients: action.payload.newClient ? [{ 
          createdAt:new Date().toLocaleDateString(), 
          source:"REGISTER_DEMO",
          category:"LIVE_INDIVIDUAL",
          stages:{
            kycApproved:false,
            kyRejected:false
          },
          ...action.payload.newClient
        },
        ...state.clients] : [...state.clients]
      };
      break;
    case "API_ERROR":
      state = {
        ...state,
        loading:false,
        error:action.payload.error
      };
      break;

    // fetch client details
    case FETCH_CLIENT_DETAILS_REQUESTED:
      state = {
        ...state,
        loading: true
      };
      break;
    case FETCH_CLIENT_DETAILS_SUCCESS:
      state = {
        ...state,
        loading: false,
        error: false,
        success: true,
        clientDetails: action.payload.result
      };
      break;
    case FETCH_CLIENT_DETAILS_FAIL:
      state = {
        ...state,
        loading: false, 
        error: action.payload.error
      };
      break;
    case FETCH_CLIENT_DETAILS_CLEAR:
      state = {
        ...state
      };
      break;
      
    default:
      state = { ...state };
       

  }
  return state;
};
export default clientReducer;
