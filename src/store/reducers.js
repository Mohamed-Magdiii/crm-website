import { combineReducers } from "redux";

// Front
import Layout from "./layout/reducer";

// Authentication
import Login from "./auth/login/reducer";
import Account from "./auth/register/reducer";
import ForgetPassword from "./auth/forgetpwd/reducer";
import Profile from "./auth/profile/reducer";


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
import ordersReducer from "./orders/reducer"; 
import bankAccountReducer from "./bankAccount/reducer"; 
import dictionaryReducer from "./dictionary/reducer";
import marketsReducer from "./markets/reducer";
import feeGroupReducer from "./feeGroups/reducer";
import markupsReducer from "./markups/reducer";
import MarketPricing from "./marketPricing/reducer";
import { reducer as notifications } from "react-notification-system-redux";
import transactionFeeGroupReducer from "./transactionFeeGroups/reducer";
import documentsReducer from "./documents/reducer";
import ordersProfitsReducer from "./ordersProfit/reducer";
import transactionsProfitsReducer from "./transactionsProfit/reducer";
import todosReducer from "./todos/reducer";
import logsReducer from "./logs/reducer";
import dashboardReducer from "./dashboard/reducer";
import requestReducer from "./requests/reducer";

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Account,
  ForgetPassword,
  Profile,
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
  ordersReducer, 
  bankAccountReducer,
  dictionaryReducer,
  marketsReducer,
  feeGroupReducer,
  markupsReducer,
  notifications,
  MarketPricing,
  transactionFeeGroupReducer,
  documentsReducer,
  ordersProfitsReducer,
  transactionsProfitsReducer,
  todosReducer,
  logsReducer,
  dashboardReducer,
  requestReducer
});

export default rootReducer;
