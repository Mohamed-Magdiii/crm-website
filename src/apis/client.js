import * as axiosHelper from "./api_helper";
import qs from "qs";
export const  getClients = async ({ payload })=>{
  const data = await axiosHelper.get(`/clients?${qs.stringify(payload)}`);
  return data;

};
export const addClient = async (values )=>{
  
  const data = await axiosHelper.post("/clients", { ...values });
  if (data.code === 500){
    throw new Error("");
  }
  return data;
};