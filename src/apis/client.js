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
  const data = await axiosHelper.get(`/clients/${id}`);
  if (data.isError){
    throw new Error(data.isError);
  }

  return data;
};

export const getClientBankDetails = async ({ payload }) => {
  const id  = payload;
  const data = await axiosHelper.get(`/bank-accounts/${id}`);
  if (data.isError){
    throw new Error(data.isError);
  }

  return data;
};

export const getClientWalletDetails = async ({ payload }) => {
  const id = payload;
  const data = await axiosHelper.get(`/wallets/${id}/client`, { crypto: true });
  if (data.isError){
    throw new Error(data.isError);
  }

  return data;
};

export const getClientTransactions = async ({ payload }) => {
  const id = payload;
  const withdrawals = await axiosHelper.get(`/transactions/withdraw/${id}/client`);
  const deposits = await axiosHelper.get(`/transactions/deposit/${id}/client`);
  const data = {
    withdrawals: withdrawals, 
    deposits: deposits
  };
  if (withdrawals.isError || deposits.isError){
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