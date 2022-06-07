import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

//Dashboard
import Dashboard from "../pages/Dashboard/index";

// Authentication related pages
import UserProfile from "../pages/Authentication/Profile/UserProfile";
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";
import ClientList from "../pages/Client/ClientList";
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
import feeGroupList from "pages/feeGroups/feeGroupList";
import usePermissions from "./permissions";

function userRoutes(){
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
    systemEmailPermissions,
    dictionariesPermissions,
    feeGroupsPermissions,
    currencyPairsPermissions,
    markupsPermissions
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
      path: "/leads",
      component: LeadsList,
      get : leadsPermissions.get
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
      get :systemEmailPermissions.get
    },
    {
      path: "/assets",
      component: AssetsList,
      get: symbolsPermissions.get
    },
    {
      path: "/currency-pairs",
      component: CurrencyPairsList,
      get : currencyPairsPermissions.get
    },
    {
      path: "/markups",
      component: MarkUpsList,
      get: markupsPermissions.get
    },
    {
      path: "/transactions/deposit",
      component: Deposit,
      get : depositsPermissions.get
    },
    {
      path: "/transactions/withdrawals",
      component: Withdrawal,
      get : withdrawalsPermissions.get
    },
    {
      path:"/dictionaries",
      component:DictionaryList,
      get : dictionariesPermissions.get
    },
    {
      path:"/fee-groups",
      component:feeGroupList,
      get : feeGroupsPermissions.get
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
