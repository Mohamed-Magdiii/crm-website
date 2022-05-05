import * as axiosHelper from "./api_helper";
import qs from "qs";
export const addNewLead = async(values) => {

  const data = await axiosHelper.post("/leads", { ...values });
  if (data.code === 500){
    throw new Error(data.message);
  }
  
  return data;
};
export const fetchLeadsFromAPI = async ( { payload })=>{
  console.log(payload);
  const result = await  axiosHelper.get(`/leads?${qs.stringify(payload)}`);
  
  return result;
};