import * as axiosHelper from "./api_helper";

export async function getProfile(){
  
  const result = await axiosHelper.get("/auth/profile");
  if (result.code === 401){
    throw new Error ("You are not authorized");
  }
  return result;


}