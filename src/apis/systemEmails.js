import qs from "qs";
import * as axiosHelper from "./api_helper";

export const getSystemEmails = async ({ payload }) => {
  const data = await axiosHelper.get(`/system-email?${qs.stringify(payload)}`);
  if (data.isError){
    throw new Error(data.mesage);
  }
    
  return data.result;
};

export const addSystemEmail = async ({ payload }) => {
  const data = await axiosHelper.post("/system-email", payload);
  if (data.isError){
    throw new Error(data.message);
  }

  return data;
};

export const editSystemEmail = async ({ payload }) => {
  const { id, values } = payload;
  const data = await axiosHelper.patch(`/system-email/${id}`, values);
  if (data.isError){
    throw new Error(data.message);
  }

  return data;
};

export const deleteSystemEmail = async ({ payload }) => {
  // here the payload is just the id for system email to be deleted 
  const data = await axiosHelper.del(`/system-email/${payload}`);
  if (data.isError){
    throw new Error(data.message);
  }

  return data;
};