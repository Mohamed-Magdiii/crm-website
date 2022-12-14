import * as axiosHelper from "./api_helper";
import qs from "qs";
export const getWithdrawals = async ({ payload })=>{
  const withdrawals = await axiosHelper.get(`/transactions/withdraw?${qs.stringify(payload)}`);
  return withdrawals;
};
export const addWithdrawal = async (values)=>{
  const result = await axiosHelper.post("/transactions/withdraw", values);
  if (result.code == 500){
    throw new Error("Withdrawal has failed");
  }
  return result;
};
export const approveWithdrawal = async (id, customerId)=>{
  const result = await axiosHelper.patch(`/transactions/withdraw/${id}/approve`, { customerId });
  return result;
};
export const rejectWithdrawal = async (id, customerId)=>{
  const result = await axiosHelper.patch(`/transactions/withdraw/${id}/reject`, { customerId });
  return result;
};

export const getClientWithdrawals = async ({ payload }) => {
  const id = payload;
  const withdrawals = await axiosHelper.get(`/transactions/withdraw/?customerId=${id}`);
  const data = {
    withdrawals: withdrawals
  };
  if (withdrawals.isError){
    throw new Error(data.isError);
  }

  return data;
};