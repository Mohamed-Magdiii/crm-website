

import qs from "qs";
import * as axiosHelper from "./api_helper";

export const getCustomerCountries = async({ payload }) => {
  const data = await axiosHelper.get(`/dashboard/stats/customers-countries?${qs.stringify(payload)}`);
  return data.result;
};

export const getCustomerStats = async({ payload }) => {
  const data = await axiosHelper.get(`/dashboard/stats/customers?${qs.stringify(payload)}`);
  return data.result;
};
