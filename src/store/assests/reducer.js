const initalState = {
  loading:false,
  error:"",
  assets:[],
  addSymbolsuccessMessage:""
};
export const assetReducer = (state = initalState, action)=>{
  switch (action.type){
    case "FETCH_ASSETS_START":
      state = {
        ...state,
        loading:true,
      };
  
      break;
    case "FETCH_ASSETS_SUCCESS":
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
        assets:[{
          
          ...action.payload.newSymbol,
          _id:action.payload.newSymbol.id,
          createdAt:new Date().toLocaleDateString(),
          
          minAmount:{
            deposit:action.payload.newSymbol.minDepositAmount,
            withdrawal:action.payload.newSymbol.minDepositAmount
          },
          fee:{
            deposit:action.payload.newSymbol.depositFee,
            withdrawal:action.payload.newSymbol.withdrawFee
          }
        }, ...state.assets],
        addSymbolSuccessMessage:"New symbol is added successfully",
      };
      break;
    case "ADD_SYMBOL_CLEAR":
      
      state = {
        ...state,
        addSymbolSuccessMessage:""
      };
      break;
    case "EDIT_SYMBOL_START":
      state = {
        ...state,
        editLoading:true,
        editClear:false,
      };
      break;
    case "EDIT_SYMBOL_DONE":
      
      state = {
        ...state,
        assets:state.assets.map(asset=>{
          // eslint-disable-next-line no-case-declarations
          const { name, description, markup, explorerLink } = action.payload.values;
          if (asset._id === action.payload.id){
            
            return {

              ...asset,
              name,
              description,
              markup,
              explorerLink,
              fee: {
                deposit:action.payload.values.depositFee,
                withdrawal:action.payload.values.withdrawFee
              },
              minAmount: {
                deposit :action.payload.values.minDepositAmount,
                withdrawal:action.payload.values.minWithdrawAmount
              },
            };
           
          }
          else {
            return asset;
          }
        }),
        editLoading:false,
        editDone:true
      };
      break;
    case "EDIT_SYMBOL_CLEAR":
      state = {
        ...state,
        editDone:false,
        editClear:true,
      };
    
      break;
    case "DELETE_SYMBOL_START":
      state = {
        ...state,
        deleteLoading:true,
        deleteModalClear:false
      };
      break;
    case "DELETE_SYMBOL_DONE":
      state = {
        ...state,
        assets:state.assets.filter(asset=>asset._id != action.payload.id),
        deleteLoading:false,
        deleteModalClear: true,
        deleteResult:action.payload.result,
        deleteError:action.payload.error,
        totalDocs:state.totalDocs - 1
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
export default assetReducer;