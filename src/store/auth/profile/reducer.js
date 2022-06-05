import ActionsAdd from "pages/Dictionary.js/Actions.js/ActionsAdd";
import {
  PROFILE_ERROR, PROFILE_SUCCESS, EDIT_PROFILE, RESET_PROFILE_FLAG 
} from "./actionTypes";

const initialState = {
  roles:{},
  users:{},
  clients:{},
  error: "",
  success: "",
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_PROFILE:
      state = { ...state };
      break;
    case PROFILE_SUCCESS:
      state = {
        ...state,
        success: action.payload 
      };
      break;
    case PROFILE_ERROR:
      state = {
        ...state,
        error: action.payload 
      };
      break;
    case RESET_PROFILE_FLAG :
      state = {
        ...state,
        success: null 
      };
      break;
    case "GET_PROFILE_SUCCESS":
      state = {
        ...state,
        roles:{ ...action.payload.roles },
        users :{ ...action.payload.users },
        clients : { ...action.payload.clients }
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default profile;
