import * as axiosHelper from "./api_helper";

// fetch trading accounts
export const getTradingAccounts = async ({ payload })=>{
  const result = await axiosHelper.get(`/accounts/login/${payload.login}`);
  if (!result.status) {
    throw new Error(result.message);
  }

  return result;
};