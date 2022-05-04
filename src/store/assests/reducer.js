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
        assets: [...action.payload.result.docs],
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
        totalDocs:state.totalDocs + 1,
        successMessage:action.payload.message,
        assets:[{
          ...action.payload.newSymbol,
          createdAt:new Date().toLocaleDateString(),
          minAmount:{
            deposit:action.payload.newSymbol.minDepositAmount,
            withdrawal:action.payload.newSymbol.minDepositAmount
          },
          fee:{
            deposit:action.payload.newSymbol.depositFee,
            withdrawal:action.payload.newSymbol.withdrawFee
          }
        }, ...state.assets]
      };
      
      break;
    case "DELETE_SYMBOL_START":
      state = {
        ...state,
        deleteLoading:true,
        deleteClearingCounter:0
      };
      break;
    case "DELETE_SYMBOL_DONE":
      state = {
        ...state,
        assets:state.assets.filter(asset=>asset._id != action.payload.id),
        deleteLoading:false,
        deleteClearingCounter: 1,
        deleteResult:action.payload.result,
        deleteError:action.payload.error,
        
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
export default assestReducer;