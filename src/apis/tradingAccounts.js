
import qs from "qs";
import * as axiosHelper from "./api_helper";

export const getAccountTypes = async({ payload }) => {
  const data = await axiosHelper.get("/trading-account/account-types");
  return data.result;
};

export const createTradingAccount = async({ payload }) => {
  const data = await axiosHelper.post("/trading-account", payload);
  return data.result;
};

export const getTradingAccounts = async({ payload }) => {
  const data = await axiosHelper.get("/trading-account?" + qs.stringify(payload));
  return data.result;
};