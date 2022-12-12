import * as axiosHelper from "./api_helper";
import qs from "qs";

export async function fetchLob( params){
  try {
    console.log(qs.stringify(params));
    const res = await axiosHelper.get(`/products?${qs.stringify(params)}`);
    return res;
  } catch (error) {
    throw new Error("Error happened while fetching data");        
  }
}

export async function updateLob({ body, id }){
  try {
    const res = await axiosHelper.patch(`/products/${id}`, body);
    return res;
  } catch (error) {
    throw new Error("Error happened while update data");        
  }
}

export async function addLob(body){
  try {
    console.log(body);
    const res = await axiosHelper.post("/products", body);
    return res;
  } catch (error) {
    throw new Error("Error happened while update data");        
  }
}