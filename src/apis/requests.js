import * as axiosHelper from "./api_helper";
import qs from "qs";

export const getIbsRequsts = async ({ payload }) => {
  const data = await axiosHelper.get(`/requests/ib?${qs.stringify(payload)}`);
  if (data.isError){
    throw new Error(data.isError);
  }

  return data;
};

export const approveIbRequest = async (data) =>{
  const requestId = data;
  const result = await axiosHelper.post("/requests/ib/approve", requestId);
  return result;
};

export const rejectIbRequest = async (data) =>{
  const requestId = data;
  const result = await axiosHelper.post("/requests/ib/reject", requestId);
  return result;
};