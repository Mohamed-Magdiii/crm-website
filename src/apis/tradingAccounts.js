import * as axiosHelper from "./api_helper";
import qs from "qs";

// fetch forex deposits
export const getTradingAccounts = async ({ payload })=>{
  const result = await axiosHelper.get(`/accounts?${qs.stringify(payload)}`);
  console.log(result);
  if (!result.status) {
    throw new Error(result.message);
  }

  return result;
};