import { combineReducers } from "redux";

// Front
import Layout from "./layout/reducer";

// Authentication
import Login from "./auth/login/reducer";
import Account from "./auth/register/reducer";
import ForgetPassword from "./auth/forgetpwd/reducer";
import Profile from "./auth/profile/reducer";

//Calendar
import calendar from "./calendar/reducer";

//chat
import chat from "./chat/reducer";

//invoices
import invoices from "./invoices/reducer";

//contacts
import contacts from "./contacts/reducer";
import clientReducer from "./client/reducer";
import leadReducer from "./leads/reducer";

// system emails 
import systemEmailsReducer from "./systemEmail/reducer";
import rolesReducer from "./roles/reducer";
import usersReducer from "./users/reducer";
import teamsReducer from "./teams/reducer";
import assetReducer from "./assests/reducer";
import walletReducer from "./wallet/reducer";
import gatewayReducer from "./gateway/reducer";
import depositReducer from "./transactions/deposit/reducer";
import withdrawalReducer from "./transactions/withdrawal/reducer";
import dictionaryReducer from "./dictionary/reducer";
import marketsReducer from "./markets/reducer";
import feeGroupReducer from "./feeGroups/reducer";
import markupsReducer from "./markups/reducer";
import { reducer as notifications } from "react-notification-system-redux";

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Account,
  ForgetPassword,
  Profile,
  calendar,
  chat,
  invoices,
  contacts,
  clientReducer,
  leadReducer,
  systemEmailsReducer,
  rolesReducer,
  usersReducer,
  teamsReducer,
  assetReducer,
  walletReducer,
  gatewayReducer,
  depositReducer,
  withdrawalReducer,
  dictionaryReducer,
  marketsReducer,
  feeGroupReducer,
  markupsReducer,
  notifications
});

export default rootReducer;
