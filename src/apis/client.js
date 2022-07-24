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