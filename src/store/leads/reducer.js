const initialState = {
  loading:false,
  error:"",
  leads:[]
};
const leadReducer = (state = initialState, action)=>{
  switch (action.type){
    case "FETCH_LEADS":
      state = {
        ...state,
        loading:true,
        leads:action.payload.leads
      };
      break;
    case "FETCH_LEADS_SUCCESS":
      state = {
        ...state,
        loading:action.payload.loading
      };
      break;
    case "API_ERROR":
      state = {
        ...state,
        error:action.payload.error
      };
      break;
    default:
      state = { ...state };

  }
  return state;
};
export default leadReducer;