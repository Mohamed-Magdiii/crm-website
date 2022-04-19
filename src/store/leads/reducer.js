const initialState = {
  loading:false,
  error:"",
  successMessage:"",
  leads:[],
  totalDocs:0
};
const leadReducer = (state = initialState, action)=>{
  switch (action.type){
    case "FETCH_LEADS_START":
      state = {
        ...state,
        loading:true,
        
      };
      break;
    case "FETCH_LEADS_SUCCESS":
      state = {
        ...state,
        leads: [...action.payload.result.docs],
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
    case "API_ERROR":
      state = {
        ...state,
        error:action.payload.error,
        successMessage:""
      };
      break;
    case "ADD_NEW_LEAD":
      state = {
        ...state,
        error:"",
        successMessage:"",
        
      };
      break;
    case "ADD_NEW_LEAD_SUCCESS":
      state = {
        ...state,
        error:"",
        loading:false,
        successMessage:action.payload.message,
        totalDocs:action.payload.newLead ? state.totalDocs + 1 : state.totalDocs,
        leads: action.payload.newLead ? [{ 
          createdAt:new Date().toLocaleDateString(), 
          language:"en-gb",
          source:"REGISTER_DEMO",
          ...action.payload.newLead 
        },
        ...state.leads] : [...state.leads],
        
      
      };
      break;
  
    default:
      state = { ...state };

  }
  return state;
};
export default leadReducer;