import qs from "qs";
import * as axiosHelper from "./api_helper";

export const getEmailTemplates = async ({ payload }) => {
  const data = await axiosHelper.get(`/email-templates?${qs.stringify(payload)}`);
  if (data.isError){
    throw new Error(data.mesage);
  }
    
  return data.result;
};

export const addEmailTemplate = async ({ payload }) => {
  const data = await axiosHelper.post("/email-templates", payload);
  if (data.isError){
    throw new Error(data.message);
  }

  return data;
};

export const editEmailTemplate = async ({ payload }) => {
  const { id, values } = payload;
  const data = await axiosHelper.patch(`/email-templates/${id}`, values);
  if (data.isError){
    throw new Error(data.message);
  }

  return data;
};

export const deleteEmailTemplate = async ({ payload }) => {
  // here the payload is just the id for email templates to be deleted 
  const data = await axiosHelper.del(`/email-templates/${payload}`);
  if (data.isError){
    throw new Error(data.message);
  }

  return data;
};