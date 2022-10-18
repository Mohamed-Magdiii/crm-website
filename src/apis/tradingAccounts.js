import * as axiosHelper from "./api_helper";

// fetch a trading account by login number
export const getTradingAccountByLogin = async ({ payload })=>{
  console.log(typeof payload.login);
  const result = await axiosHelper.get(`/accounts/login/${payload.login}`);
  if (!result.status) {
    throw new Error(result.message);
  }

  return result;
};

// fetch all trading accounts related to a user 
export const getTradingAccountsByCustomerId = async ({ payload })=>{
  const result = await axiosHelper.get(`/accounts?customerId=${payload.customerId}`);
  if (!result.status) {
    throw new Error(result.message);
  }

  return result;
};
