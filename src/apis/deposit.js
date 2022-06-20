import * as axiosHelper from "./api_helper";
import qs from "qs";
export const getDeposits = async ({ payload })=>{
  
  const deposits = await axiosHelper.get(`/transactions/deposit?${qs.stringify(payload)}`);
  return deposits;
};
export const makeDeposit = async (values)=>{
  const result = await axiosHelper.post("/transactions/deposit", values);
  
  if (result.code === 422){
    throw new Error("Deposit has failed");
  }
  return result ;
};
export const aprroveDeposit = async (id)=>{
  const result = await axiosHelper.patch(`/transactions/deposit/${id}/approve`);
  return result;
};
export const rejectDeposit = async (id)=>{
  const result = await axiosHelper.patch(`/transactions/deposit/${id}/reject`);
  return result;
};

export const getClientDeposits = async ({ payload }) => {
  const id = payload;
  const deposits = await axiosHelper.get(`/transactions/deposit/?customerId=${id}`);
  const data = { 
    deposits: deposits
  };
  if (deposits.isError){
    throw new Error(data.isError);
  }

  return data;
};
