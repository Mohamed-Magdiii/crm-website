import React from "react";
import { Redirect } from "react-router-dom";

//Dashboard
import Dashboard from "../pages/Dashboard/index";

// Authentication related pages
import userProfile from "../pages/Authentication/user-profile";
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";
import ClientList from "../pages/Client/ClientList";
import UsersList from "../pages/Users/UsersList";
import LeadsList from "../pages/Leads/LeadList"; 
import Teams from "../pages/Teams/Teams"; 
import RolesList from "../pages/Roles/RolesList";
import Page404 from "../pages/Authentication/Page404";
import AssetsList from "../pages/Assests/AssetsList";
import Deposit from "pages/Transactions/Deposit";
import Withdrawal from "pages/Transactions/Withdrawal";
const userRoutes = [

  //dashboard
  {
    path: "/dashboard",
    component: Dashboard 
  },

  //profile
  {
    path: "/profile",
    component: userProfile 
  },
  {
    path:"/clients",
    component:ClientList 
  },
  {
    path:"/leads",
    component: LeadsList 
  },
  //users
  {
    path: "/users",
    component: UsersList 
  },
  //teams
  {
    path: "/teams",
    component: Teams 
  },
  {
    path: "/roles",
    component: RolesList 
  },
  {
    path:"/assets",
    component:AssetsList
  },
  {
    path:"/transactions/deposit",
    component:Deposit
  },
  {
    path:"/transactions/withdrawals",
    component:Withdrawal
  },
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/dashboard" /> 
  },

  // this route should be at the end of all other routes
];

const authRoutes = [
  //authencation page
  {
    path: "/logout",
    component: Logout 
  },
  {
    path: "/login",
    component: Login 
  },
  {
    path: "/forgot-password",
    component: ForgetPwd 
  },
  {
    path: "/register",
    component: Register 
  },
  {
    path: "*",
    exact: true,
    component: Page404 
  },
  
];

export { userRoutes, authRoutes };
