import * as axiosHelper from "./api_helper";
import qs from "qs";

// fetch forex withdrawals
export const getForexWithdrawals = async ({ payload }) => {
  const result = await axiosHelper.get(`/fxtransactions/withdrawals?${qs.stringify(payload)}`);
  if (!result.status){
    throw new Error(result.message);
  }

  return result;
};

// add forex withdrawal
export const postForexWithdrawal = async ({ payload }) => {
  const result = await axiosHelper.post("/fxtransactions/withdrawals", payload);
  if (!result.status){
    throw new Error(result.message);
  }

  return result;
};