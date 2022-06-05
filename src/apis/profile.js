import * as axiosHelper from "./api_helper";

export async function getProfile(){
  const result = await axiosHelper.get("/auth/profile");
  return result;
}