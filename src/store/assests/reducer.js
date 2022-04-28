const initalState = {
  loading:false,
  error:"",
  assets:[],
  successMessage:""
};
export const assestReducer = (state = initalState, action)=>{
  switch (action.type){
    case "FETCH_ASSESTS_START":
      state = {
        ...state,
        loading:true,
      };
  
      break;
    case "FETCH_ASSESTS_SUCCESS":
      state = {
        assests: [...action.payload.result.docs],
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
    case "ADD_NEW_SYMBOL":
      state = {
        ...state,
        error:"",
        successMessage:""
      };
      break;
    case "ADD_NEW_SYMBOL_SUCCESS":
      state = {
        ...state,
        totalDocs:action.payload.newSymbol ? state.totalDocs + 1 : state.totalDocs,
        successMessage:action.payload.successMessage,
        assests:action.payload.newSymbol ? [...action.payload.newSymbol, ...state.assets] : [...state.assets]
      };
      break;
    case "API_ERROR":
      state = {
        ...state,
        error:action.payload.error
      };
  }
  return state;
};
export default assestReducer;