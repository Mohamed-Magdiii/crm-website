import React from "react"
import { Redirect } from "react-router-dom"

//Dashboard
import Dashboard from "../pages/Dashboard/index";

// Authentication related pages
import userProfile from "../pages/Authentication/user-profile"
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"
import ClientList from "../components/Client/client.record.list.component";
import UsersList from "../pages/Users/UsersList"
import AddUser from "../pages/Users/AddUser"
import LeadsList from "../components/Leads/lead.record.list.component";
const userRoutes = [

  //dashboard
  { path: "/dashboard", component: Dashboard },

  //profile
  { path: "/profile", component: userProfile },
   {path:"/clients",  component:ClientList},
   {path:'/leads',component:LeadsList},
    //users
    { path: "/users", component: UsersList },

    // users/create
    { path: "/users/create", component: AddUser },

  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

const authRoutes = [
  //authencation page
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register }
   
]

export { userRoutes, authRoutes }
