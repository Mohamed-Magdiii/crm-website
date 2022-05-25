import * as axiosHelper from "./api_helper";
export const getDictionary = async()=>{
  try {
    const dictionary = await axiosHelper.get("/dictionaries");
    return dictionary;
  } catch (error){
    throw new Error("Error happened while fetching dictionary");
  }
 
};
export const updateEmailProvider = async ({ value, body })=>{
  try {
    const result = await axiosHelper.patch(`/dictionaries/emailProviders/${value}`, body);
    return result;
  } catch (error){
    throw new Error("Error happened during updating this email provider");
  }
};
export const updateActions = async ({ value, body }) =>{
  try {
    const result = await axiosHelper.patch(`/dictionaries/actions/${value}`, body);
    return result;
  } catch (error){
    throw new Error("Error happened during updating this action");
  }
};
export const updateCountries = async ({ value, body })=>{
  try {
    const result = await axiosHelper.patch(`/dictionaries/countries/${value}`, body);
    return result;
  } catch (error){
    throw new Error("Error happened during updating this action");
  }
};
export  const addNewItem = async({ id, data }) =>{
  try {
    console.log(data);
    const result = await axiosHelper.patch(`/dictionaries/addItem/${id}`, data );
    return result;
  } catch (error){
    throw new Error("Error happened during adding this item");
  }
};
export const removeItem = async ({ id, body })=>{
  try {
    const result = await axiosHelper(`/dictionaries/removeItem/${id}`, body);
    return result;
  } catch (error){
    throw new Error("Error happened while removing this item ");
  }
};