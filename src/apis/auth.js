
 
import * as axiosHelper from "./api_helper";

export const loginUser = async(values) => {
  const data = await axiosHelper.loginApi("/auth/login", values);
  if (data.isError) {
    return data;
  } 
  return data;
};
export const getProfileData = async () => { 
  const data = await axiosHelper.get("/auth/profile");
  if (data.isError) {
    throw new Error(data.message);
  }
  return data;
};