
import {
  FETCH_ROLES_START,
  FETCH_ROLES_SUCCESS,
  FETCH_ROLES_ERROR
} from "./actionTypes";

const initialState = {
  loading:false,
  error:"",
  roles:[],
  // totalDocs: 0,
  // docs: [],
  // page: 1
};
const leadReducer = (state = initialState, action)=>{
  switch (action.type){
    case FETCH_ROLES_START:
      state = {
        ...state,
        loading:true,
      };
      break;
    case FETCH_ROLES_SUCCESS:
      state = {
        ...state,
        docs: [...action.payload.docs],
        totalDocs: action.payload.totalDocs,
        // loading: false,
      };
      break;
    case FETCH_ROLES_ERROR:
      state = {
        ...state,
        loading: false,
        error:action.payload.error
      };
      break;
    default:
      state = { ...state };

  }
  return state;
};
export default leadReducer;