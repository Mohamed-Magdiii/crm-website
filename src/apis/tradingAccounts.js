
import qs from "qs";
import * as axiosHelper from "./api_helper";

// fetch a trading account by login number
export const getTradingAccountByLogin = async ({ payload })=>{
  const result = await axiosHelper.get(`/accounts/login/${payload.login}`);
  if (!result.status) {
    throw new Error(result.message);
  }

  return result;
};

export const getAccountTypes = async({ payload }) => {
  const data = await axiosHelper.get("/accounts/account-types");
  return data.result;
};

export const createTradingAccount = async({ payload }) => {
  delete payload.type;
  delete payload.platform;
  const data = await axiosHelper.post("/accounts", payload);
  return data.result;
};

export const getTradingAccounts = async({ payload }) => {
  const data = await axiosHelper.get("/accounts?" + qs.stringify(payload));
  return data.result;
};
