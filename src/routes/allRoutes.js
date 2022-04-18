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
import ClientList from "../components/Client/client.record.list.component";
import UsersList from "../pages/Users/UsersList";
import LeadsList from "../components/Leads/lead.record.list.component";
import Page404 from "../pages/Authentication/Page404";

// email templates related pages
import emailTemplatesList from "../pages/EmailTemplate/EmailTemplatesList";

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
    component:LeadsList 
  },
  //users
  {
    path: "/users",
    component: UsersList 
  },

  // email templates routes, it could be moved to other location but for now let's keep them here 
  {
    path: "email-templates",
    component: emailTemplatesList
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
