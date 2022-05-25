import * as axiosHelper from "./api_helper";
import qs from "qs";

export const getClients = async ({ payload }) => {
  const data = await axiosHelper.get(`/clients?${qs.stringify(payload)}`);
  return data;
};

export const addClient = async (values) => {
  const data = await axiosHelper.post("/clients", { ...values });
  if (data.code === 500) {
    throw new Error("");
  }
  return data;
};

export const getClientById = async ({ payload }) => {
  const id = payload;
  const data = await axiosHelper.get(`/clients/${id}/details`);
  if (data.isError){
    throw new Error(data.isError);
  }

  return data;
};

export const getClientBankDetails = async ({ payload }) => {
  const { id } = payload;
  const data = await axiosHelper.get(`/clients/${id}/bank`);
  if (data.isError){
    throw new Error(data.isError);
  }

  return data;
};

export const getClientWalletDetails = async ({ payload }) => {
  const { id } = payload;
  const data = await axiosHelper.get(`/clients/${id}/wallets`);
  if (data.isError){
    throw new Error(data.isError);
  }

  return data;
};

export const getClientTransactions = async ({ payload }) => {
  const { id } = payload;
  const data = await axiosHelper.get(`/clients/${id}/transactions`);
  if (data.isError){
    throw new Error(data.isError);
  }

  return data;
};