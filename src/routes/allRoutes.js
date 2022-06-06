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
import ClientList from "../pages/Client/ClientList";
import ClientMainPage from "../pages/Client/ClientMainPage";
import ClientDetails from "../pages/Client/ClientDetails";
import ClientBank from "../pages/Client/ClientBank";
import ClientTransactions from "../pages/Client/ClientTransactions";
import ClientWallets from "../pages/Client/ClientWallets";
import UsersList from "../pages/Users/UsersList";
import LeadsList from "../pages/Leads/LeadList"; 
import Teams from "../pages/Teams/Teams"; 
import RolesList from "../pages/Roles/RolesList";
import SystemEmailsList from "../pages/SystemEmail/SystemEmailList";
// import LeadsList from "../components/Leads/lead.record.list.component";
import Page404 from "../pages/Authentication/Page404";
import AssetsList from "../pages/Assests/AssetsList";
import Deposit from "pages/Transactions/Deposit";
import Withdrawal from "pages/Transactions/Withdrawal";
import Reminder from "../pages/Reminder/Reminder";
import OrderList from "pages/Client/orders/OrdersList";

const userRoutes = [

  //dashboard
  {
    path: "/dashboard",
    component: Dashboard 
  },

  //profile
  {
    path: "/profile",
    component: UserProfile 
  },
  {
    path:"/clients",
    component:ClientList
  },
  {
    path: "/clients/main-page",
    component: ClientMainPage,
    innerPages: [
      {
        path: "/clients/:id/details",
        component: ClientDetails
      }
    ]
  },
  {
    path: "/clients/:id/details",
    component: ClientDetails
  },
  {
    path: "/clients/:id/bank",
    component: ClientBank
  },
  {
    path: "/clients/:id/transactions",
    component: ClientTransactions
  },
  {
    path: "/clients/:id/wallets",
    component: ClientWallets
  },
  {
    path: "/clients/:id/orders",
    component: OrderList
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
  //calender
  {
    path: "/calendar/reminders",
    component: Reminder 
  },
  {
    path: "/roles",
    component: RolesList 
  },
  // system emails
  {
    path: "/system-emails",
    component: SystemEmailsList
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
