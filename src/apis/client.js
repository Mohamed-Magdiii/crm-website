import * as axiosHelper from "./api_helper";
import qs from "qs";

export const getClients = async ({ payload }) => {
  const data = await axiosHelper.get(`/clients?${qs.stringify(payload)}`);
  if (data.isError){
    throw new Error(data.isError);
  }

  return data;
};

export const addClient = async (values) => {  
  const data = await axiosHelper.post("/clients", { ...values });
  if (data.isSuccess === false){
    throw new Error("Invalid data");
  }
  return data;
};

export const getClientById = async ({ payload }) => {
  const id = payload;
  const data = await axiosHelper.get(`/clients/${id}?data=stages`);
  if (data.isError){
    throw new Error(data.isError);
  }

  return data;
};

export const updateClientDetails = async ({ payload }) => {
  const { id, values } = payload;
  const data = await axiosHelper.patch(`/clients/${id}`, values);
  if (data.isError){
    throw new Error(data.isError);
  }

  return data;
};

export const updateClientEmploymentStatus = async (payload )=>{
  const { id, values } = payload;
  const data = await axiosHelper.patch(`/clients/${id}/experience`, { experience:{ ...values } });
  const {  isError } = data;
  if (isError){
    throw new Error("An Error Happened while updating employment Info");
  }
  return data;
};

export const updateClientFinancialInfo = async (payload)=>{
  const { id, values } = payload;
  const data = await axiosHelper.patch(`/clients/${id}/financial-info`, { financialInfo : { ...values } });
  const { isError } = data;
  if (isError){
    throw new Error("Error Happened while updating financial Info");
  }
  return data;
};

export const resetPassowrd = async (payload)=>{
  const { id, values } = payload;
  const data = await axiosHelper.post(`/clients/${id}/reset-password`, values);
  const { isError } = data;
  if (isError){
    throw new Error("Error happened while reseting password");
  }
  return data;
};

export const forgotPassword = async(payload)=>{
  const { id, email } = payload;
  const data = await axiosHelper.post(`/clients/${id}/forgot-password`, { email });
  if (data.message == "Error Sending email"){
    throw new Error("Error Sending Email");
  }
  return data;
};

export const disable2FA = async (payload)=>{
  const { id  } = payload;
  const res = await axiosHelper.post("/clients/disable-2fa", { customerId: id });
  if (res.status)
    return res.status;
  else throw new Error(res.message);
};

export const checkClientEmailApi = async (payload) => {
  // eslint-disable-next-line no-debugger
  debugger;
  const result = await axiosHelper.get(`/clients/check-email?${qs.stringify(payload, { encode: false })}`);
  return result;
};