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
        loading: false,
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
        leads:[{ 
          createdAt:new Date().toLocaleDateString(), 
          ...action.payload.newLead 
        },
        ...state.leads],
        
      };
      break;
    case "ADD_NEW_LEAD_SUCCESS":
      state = {
        ...state,
        error:"",
        loading:false,
        successMessage:action.payload.message
      };
      break;
  
    default:
      state = { ...state };

  }
  return state;
};
export default leadReducer;