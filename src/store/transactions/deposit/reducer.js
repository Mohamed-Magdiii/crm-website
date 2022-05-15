const initalState = {
  deposits:[],
  loading:false,
  error:"",
  modalClear:false,
  depositResponseMessage:""
};
const depositReducer = (state = { initalState }, action)=>{
  switch (action.type){
    case "FETCH_DEPOSITS_START":
      state = {
        ...state,
        loading:true,
        error:""
      };
      break;
    case "FETCH_DEPOSITS_SUCCESS":
      state = {
        deposits: [...action.payload.result.docs],
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
    case "ADD_DEPOSIT_START":
      state = {
        ...state,
        
      };
      break;
    case "ADD_DEPOSIT_SUCCESS":
      
      state = {
        ...state,
        deposits:[{ ...action.payload.deposit }, ...state.deposits],
        totalDocs:state.totalDocs + 1,
        depositResponseMessage:action.payload.deposit.status
      };
      break;
    case "DEPOSIT_ERROR": 
      state = {
        ...state,
        error:action.payload.error
      };
      break;
    case "MODAL_CLEAR":
      state = {
        ...state,
        modalClear:true,
        depositResponseMessage:""
      };
      break;
    default:
      state = { ...state };

  }
  return state;
};
export default depositReducer;