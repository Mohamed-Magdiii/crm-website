import qs from "qs";
import * as axiosHelper from "./api_helper";

export const getWallets = async  ({ payload })=>{
  const wallets = await axiosHelper.get(`/wallets?${qs.stringify(payload)}`, { crypto:true });
  return wallets;
};

export const getClientWalletDetails = async ({ payload }) => {
  const id = payload;
  const data = await axiosHelper.get(`/wallets/?belongsTo=${id}`);
  if (data.isError){
    throw new Error(data.isError);
  }

  return data;
};

export const addNewWallet = async ({ payload }) => {
  const data = await axiosHelper.post("/wallets", payload);
  if (data.isError){
    throw new Error(data.isError);
  }

  return data;
};
