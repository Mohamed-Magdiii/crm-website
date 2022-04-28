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
import RolesList from "../pages/Roles/RolesList";
import Page404 from "../pages/Authentication/Page404";
import AssetsList from "../pages/Assests/AssetsList";
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
  {
    path: "/roles",
    component: RolesList 
  },
  {
    path:"/assests",
    component:AssetsList
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
