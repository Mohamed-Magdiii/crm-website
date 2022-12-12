import { combineReducers } from "redux";

// Front
import Layout from "./layout/reducer";

// Authentication
import Login from "./auth/login/reducer";
import Account from "./auth/register/reducer";
import ForgetPassword from "./auth/forgetpwd/reducer";
import ResetPasswordReducer from "./auth/resetpwd/reducer";
import Profile from "./auth/profile/reducer";
import lob from "./lob/reducer";
import products from "./products/reducer";
import teams from "./teams/reducer";


//chat
import chat from "./chat/reducer";


const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Account,
  ForgetPassword,
  ResetPasswordReducer,
  Profile,
  chat,
  lob,
  products,
  teams
});

export default rootReducer;
