const initalState = {
  withdrawals:[],
  loading:false,
  error:"",
  withdrawResponseMessage:"",
  modalClear:false
};
const withdrawalReducer = (state = { initalState }, action)=>{
  switch (action.type){
    case "FETCH_WITHDRAWALS_START":
      state = {
        ...state,
        loading:true,
        error:""
      };
      break;
    case "FETCH_WITHDRAWALS_SUCCESS":
      state = {
        withdrawals: [...action.payload.result.docs],
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
    case "MAKE_WITHDRAWAL_START":
      state = {
        ...state,
        withdrawalSuccess:false
      };
      break;
    case "MAKE_WITHDRWAL_SUCCESS":
      state = {
        ...state,
        withdrawals:[{ ...action.payload.withdrawal }, ...state.withdrawals],
        totalDocs:state.totalDocs + 1,
        withdrawResponseMessage:action.payload.withdrawal.status
      };
      break;
    case "MODAL_CLEAR":
      state = {
        ...state,
        modalClear:true,
        withdrawResponseMessage:""
      };
      break;
    case "WITHDRAWAL_ERROR": 
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
export default withdrawalReducer;