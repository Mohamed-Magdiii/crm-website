

import * as axiosHelper from "./api_helper";

export const loginUser = async(values) => {
  const data = await axiosHelper.loginApi("/auth/login", values);
  if (data.isError) {
    return data;
  } 
  return data;
};