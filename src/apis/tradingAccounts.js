import * as axiosHelper from "./api_helper";

// fetch forex deposits
export const getTradingAccounts = async ({ payload })=>{
  const result = await axiosHelper.get(`/accounts/login/${payload.login}`);
  if (!result.status) {
    throw new Error(result.message);
  }

  return result;
};