import React from "react";
import { Redirect } from "react-router-dom";

//Dashboard
import Dashboard from "../pages/Dashboard/index";

// Authentication related pages
import UserProfile from "../pages/Authentication/Profile/UserProfile";
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";
import ClientList from "../pages/Clients/ClientList";
import UsersList from "../pages/Users/UsersList";
import LeadsList from "../pages/Leads/LeadList";
import Teams from "../pages/Teams/Teams";
import RolesList from "../pages/Roles/RolesList";
import SystemEmailsList from "../pages/SystemEmail/SystemEmailList";
// import LeadsList from "../components/Leads/lead.record.list.component";
import Page404 from "../pages/Authentication/Page404";
import AssetsList from "../pages/Assests/AssetsList";
import CurrencyPairsList from "../pages/CurrencyPairs/CurrencyPairsList";
import MarkUpsList from "../pages/Markups/MarkUpsList";
import Deposit from "pages/Transactions/Deposit";
import Withdrawal from "pages/Transactions/Withdrawal";
import Reminder from "../pages/Reminder/Reminder";
import DictionaryList from "pages/Dictionary.js/DictionaryList";
import MarketPrice from "pages/MarketPrice/MarketPrice";
import feeGroupList from "pages/feeGroups/feeGroupList";
import ClientMainPage from "pages/ClientDetail/ClientMainPage";
import SystemEmailMainPage from "pages/SystemEmail/SystemEmailMainPage";
import usePermissions from "./permissions";
import TransactionFeeGroupList from "pages/transactionFeeGroups/TransactionFeeGroupList";

function userRoutes() {
  const object = usePermissions();
  const {
    userPermissions,
    clientPermissions,
    rolesPermissions,
    teamsPermissions,
    withdrawalsPermissions,
    depositsPermissions,
    leadsPermissions,
    symbolsPermissions,
    systemEmailsPermissions,
    dictionariesPermissions,
    feeGroupsPermissions,
    currencyPairsPermissions,
    markupsPermissions,
    transactionFeeGroupsPermissions
  } = object;

  return [
    //dashboard
    {
      path: "/dashboard",
      component: Dashboard,

    },

    //profile
    {
      path: "/profile",
      component: UserProfile,

    },
    {
      path: "/clients",
      component: ClientList,
      get: clientPermissions.get
    },
    {
      path: "/clients/:id",
      component: ClientMainPage,
      notExact: true,
    },
    {
      path: "/system-emails/:id",
      component: SystemEmailMainPage,
      notExact: true,
    },
    {
      path: "/leads",
      component: LeadsList,
      get: leadsPermissions.get
    },
    //users
    {
      path: "/users",
      component: UsersList,
      get: userPermissions.get
    },
    //teams
    {
      path: "/teams",
      component: Teams,
      get: teamsPermissions.get
    },
    //calender
    {
      path: "/calendar/reminders",
      component: Reminder,
    },
    {
      path: "/roles",
      component: RolesList,
      get: rolesPermissions.get
    },
    // system emails
    {
      path: "/system-emails",
      component: SystemEmailsList,
      get: systemEmailsPermissions.get
    },
    {
      path: "/assets",
      component: AssetsList,
      get: symbolsPermissions.get
    },
    {
      path: "/currency-pairs",
      component: CurrencyPairsList,
      get: currencyPairsPermissions.get
    },
    {
      path: "/price/:pairName",
      component: MarketPrice,
    },
    {
      path: "/markups",
      component: MarkUpsList,
      get: markupsPermissions.get
    },
    {
      path: "/transactions/deposit",
      component: Deposit,
      get: depositsPermissions.get
    },
    {
      path: "/transactions/withdrawals",
      component: Withdrawal,
      get: withdrawalsPermissions.get
    },
    {
      path: "/dictionaries",
      component: DictionaryList,
      get: dictionariesPermissions.get
    },
    {
      path: "/fee-groups",
      component: feeGroupList,
      get: feeGroupsPermissions.get
    },
    {
      path: "/transaction-fee-groups",
      component: TransactionFeeGroupList,
      get : transactionFeeGroupsPermissions.get
    },
    {
      path: "/",
      exact: true,
      component: () => <Redirect to="/dashboard" />,
    },

    // this route should be at the end of all other routes
  ];
}


const authRoutes = [
  //authencation page
  {
    path: "/logout",
    component: Logout,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/forgot-password",
    component: ForgetPwd,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "*",
    exact: true,
    component: Page404,
  },
];

export { userRoutes, authRoutes };
