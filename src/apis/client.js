import * as axiosHelper from "./api_helper";
import qs from "qs";

export const getClients = async ({ payload }) => {
  const data = await axiosHelper.get(`/clients?${qs.stringify(payload)}`);
  return data;
};

export const addClient = async (values) => {
  
    
  const data = await axiosHelper.post("/clients", { ...values });
  console.log(data);
  if (data.isSuccess === false){
    throw new Error("Invalid data");
  }
  return data;
};

export const getClientById = async (id) => {
  // const { id, values } = payload;
  if (id) {
    const data = await axiosHelper.get(`/clients/${id}`);

    if (data.isError) {
      throw new Error(data.message);
    }
    return data;
  }
};