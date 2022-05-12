import * as axiosHelper from "./api_helper";
export const getGatewayOfDeposit = async ()=>{
  const gateways = await axiosHelper.get("/transactions/deposit/gateways");
  console.log(gateways);
  return gateways;
};
export const getGetWaysOfWithdraw = async ()=>{
  const gateways = await axiosHelper.get("/transactions/withdraw/gateways");
  return gateways;
};