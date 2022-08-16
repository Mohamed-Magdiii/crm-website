import {
  FETCH_CLIENT_WITHDRAWALS_REQUESTED,
  FETCH_CLIENT_WITHDRAWALS_SUCCESS,
  FETCH_CLIENT_WITHDRAWALS_FAIL
} from "./actionTypes";

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
        error:"", 
        
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
        pagingCounter: action.payload.result.pagingCounter,
        prevPage: action.payload.result.prevPage,
        totalPages: action.payload.result.totalPages,
        loading: false,   
      };
      break;
    case "MAKE_WITHDRAWAL_START":
      state = {
        ...state,
        withdrawalModalClear:false,
        disableWithdrawalButton: true
      };
      break;
    case "MAKE_WITHDRWAL_SUCCESS":
      state = {
        ...state,
        // withdrawals:[{ ...action.payload.withdrawal }, ...state.withdrawals],
        // totalDocs:state.totalDocs + 1,
        withdrawResponseMessage:action.payload.withdrawal.status,

      };
      break;
    case "WITHDRAW_STATUS_CHANGE_SUCCESS":
      // eslint-disable-next-line no-case-declarations
      const { _id } = action.payload;
      
      state  = {
        ...state,
        withdrawals:state.withdrawals.map(withdraw=>{
          if (withdraw._id === _id){
            return {

              ...withdraw,
              status:action.payload.status 
            };
          }
          else {
            return withdraw;
          }
        })
      };
      break;

    case "MODAL_CLEAR":
      state = {
        ...state,
        withdrawalModalClear:true,
        withdrawResponseMessage:"",
        disableWithdrawalButton: false
      };
      break;
    case "WITHDRAWAL_ERROR": 
      state = {
        ...state,
        error:action.payload.error,
        disableWithdrawalButton:false
      };
      console.log(action.payload);
      break;
    case "ERROR_CLEAR":
      state = {
        ...state,
        error:""
      };
      break;
    // fetch client withdrawals 
    case FETCH_CLIENT_WITHDRAWALS_REQUESTED:
      state = {
        ...state,
        loading: true
      };
      break;
    case FETCH_CLIENT_WITHDRAWALS_SUCCESS:
      state = {
        ...state,
        clientWithdrawals: action.payload.withdrawals.result.docs,
        withdrawalsTotalDocs: action.payload.withdrawals.result.totalDocs,
        error: false,
        success: true,
        loading: false
      };
      break;
    case FETCH_CLIENT_WITHDRAWALS_FAIL:
      state = {
        ...state,
        error: true,
        success: false,
        errorDetails: action.payload.error
      };
      break;
    default:
      state = { ...state };
  
  }
  return state;
};
export default withdrawalReducer;