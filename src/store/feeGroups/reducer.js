const initalState = {
  loading:false,
  error:"",
  feeGroups :[],
  successMessage:""
};
const feeGroupReducer = (state = initalState, action)=>{
  switch (action.type){
    case "FETCH_FEE_GROUPS_START":
      state = {
        ...state,
        loading:true,
        error:""
      };
      break;
    case "FETCH_FEE_GROUPS_SUCCESS":
      state = {
        ...state,
        feeGroups: [...action.payload.result.docs],
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
    case "ADD_FEES_GROUP_SUCCESS":
      state = {
        ...state,
        feeGroups:[{ ...action.payload }, ...state.feeGroups],
        totalDocs: state.totalDocs + 1
      };
      break;
    case "API_ERROR":
      state = {
        ...state,
        error:action.payload.error
      };
      break;
    default :
      state = { ...state };
  }
  return state;
};
export default feeGroupReducer;