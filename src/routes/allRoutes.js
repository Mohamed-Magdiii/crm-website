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
import ResetPassword from "pages/Authentication/ResetPassword";

// import LeadsList from "../components/Leads/lead.record.list.component";
import Page404 from "../pages/Authentication/Page404";


function userRoutes() {


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
   
    // {
    //   path: "/dictionaries",
    //   component: DictionaryList,
    //   get: dictionariesPermissions.get
    // },
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
    path: "/reset-password",
    component: ResetPassword,
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
