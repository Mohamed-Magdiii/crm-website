
import qs from "qs";
import * as axiosHelper from "./api_helper";

export const getLogs = async({ payload }) => {
  const data = await axiosHelper.get(`/logs?${qs.stringify(payload)}`);
  return data.result;
};