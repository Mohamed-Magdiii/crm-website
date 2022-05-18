import qs from "qs";
import * as axiosHelper from "./api_helper";

export const getWallets = async  ({ payload })=>{
  const wallets = await axiosHelper.get(`/wallets?${qs.stringify(payload)}`, { crypto:true });
  return wallets;
};
