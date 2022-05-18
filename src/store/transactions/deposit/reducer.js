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
        pagingCounter: action.payload.result.pagingCounter,
        prevPage: action.payload.result.prevPage,
        totalPages: action.payload.result.totalPages,
        loading: false,       
      };
      break;
    case "ADD_DEPOSIT_START":
      state = {
        ...state,
        modalClear:false
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
    case "DEPOSIT_STATUS_CHANGE_SUCCESS":
      // eslint-disable-next-line no-case-declarations
      const { _id } = action.payload;
      state  = {
        ...state,
        deposits:state.deposits.map(deposit=>{
          if (deposit._id === _id){
            return {
  
              ...deposit,
              status:action.payload.status
            };
          }
          else {
            return deposit;
          } 
        })
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