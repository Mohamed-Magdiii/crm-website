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
        ...state.clients] : [...state.clients],
        showAddSuccessMessage:true,
        disableAddButton:true
      };
      break;
    case "ADD_MODAL_CLEAR":
      state = {
        ...state,
        showAddSuccessMessage:false,
        disableAddButton:false
      };
      break;
    case "API_ERROR":
      state = {
        ...state,
        loading:false,
        error:action.payload.error
      };
      break;
    default:
      state = { ...state };
       

  }
  return state;
};
export default clientReducer;
