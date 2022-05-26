import * as axiosHelper from "./api_helper";
import qs from "qs";
export const getWithdrawals = async ({ payload })=>{
  const withdrawals = await axiosHelper.get(`/transactions/withdraw?${qs.stringify(payload)}`);
  return withdrawals;
};
export const addWithdrawal = async (values)=>{
  const result = await axiosHelper.post("/transactions/withdraw", values);
  if (result.code == 422){
    throw new Error("Withdrawal has failed");
  }
  return result;
};
export const approveWithdrawal = async (id)=>{
  const result = await axiosHelper.patch(`/transactions/withdraw/${id}/approve`);
  return result;
};
export const rejectWithdrawal = async (id)=>{
  const result = await axiosHelper.patch(`/transactions/withdraw/${id}/reject`);
  return result;
};