import * as axiosHelper from "./api_helper";
import qs from "qs";
export const getDictionary = async()=>{
  try {
    const dictionary = await axiosHelper.get("/dictionaries");
    return dictionary;
  } catch (error){
    throw new Error("Error happened while fetching dictionary");
  }
 
};
export const updateExchange = async ({ value, body }) =>{
  try {
    const result = await axiosHelper.patch(`/dictionaries/exchanges?newValue=${value}`, body);
    return result;
  } catch (error){
    throw new Error("Error happened during updating this exchange");
  }
  

};
export const updateEmailProvider = async ({ value, body })=>{
  try {
    const result = await axiosHelper.patch(`/dictionaries/emailProviders?newValue=${value}`, body);
    return result;
  } catch (error){
    throw new Error("Error happened during updating this email provider");
  }
};
export const updateActions = async ({ value, body }) =>{
  try {
    const result = await axiosHelper.patch(`/dictionaries/actions?newValue=${value}`, body);
    return result;
  } catch (error){
    throw new Error("Error happened during updating this action");
  }
};
export const updateCountries = async ({ value, body })=>{
  
  try {
    const result = await axiosHelper.patch(`/dictionaries/countries?${qs.stringify(value)}`, body);
    return result;
  } catch (error){
    throw new Error("Error happened during updating this action");
  }
};
export  const addNewItem = async({ id, data }) =>{
  try {
    const result = await axiosHelper.patch(`/dictionaries/addItem/${id}`, data );
    return result;
  } catch (error){
    throw new Error("Error happened during adding this item");
  }
};
export const removeItem = async ({ id, data })=>{
  try {
    const result = await axiosHelper.patch(`/dictionaries/removeItem/${id}`, data);
    return result;
  } catch (error){
    throw new Error("Error happened while removing this item ");
  }
};