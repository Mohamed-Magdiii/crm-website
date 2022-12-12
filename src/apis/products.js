import * as axiosHelper from "./api_helper";
import qs from "qs";

export async function fetchProudcts( params){
  try {
    console.log(qs.stringify(params));
    const res = await axiosHelper.get(`/sub-products?${qs.stringify(params)}`);
    return res;
  } catch (error) {
    throw new Error("Error happened while fetching data");        
  }
}

export async function addNewProudct( params){
  try {
    const res = await axiosHelper.post("/sub-products", params);
    return res.result;
  } catch (error) {
    throw new Error("Error happened while add data");        
  }
}


export async function editProudct({ body, id }){
  try {
    const res = await axiosHelper.patch(`/sub-products/${id}`, body);
    return res;
  } catch (error) {
    throw new Error("Error happened while edit data");        
  }
}