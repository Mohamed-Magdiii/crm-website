import * as axiosHelper from "./api_helper";
import qs from "qs";

// fetch internal transfers
export const getInternalTransfers = async ({ payload }) => {
  const result = await axiosHelper.get(`/fxtransactions/internalTransfers?${qs.stringify(payload)}`);
  if (!result.status){
    throw new Error(result.message);
  }

  return result;
};

// add internal transfer
export const postInternalTransfer = async ({ payload }) => {
  const result = await axiosHelper.post("/fxtransactions/internalTransfers", payload);
  if (!result.status){
    throw new Error(result.message);
  }

  return result;
};