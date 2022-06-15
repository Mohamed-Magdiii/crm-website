import * as axiosHelper from "./api_helper";
import qs from "qs";
export const addNewLead = async(values) => {

  const data = await axiosHelper.post("/leads", { ...values });
  if (data.isSuccess === false){
    throw new Error(data.message);
  }
  
  return data;
};
export const fetchLeadsFromAPI = async ( { payload })=>{
  const result = await  axiosHelper.get(`/leads?${qs.stringify(payload)}`);
  
  return result;
};