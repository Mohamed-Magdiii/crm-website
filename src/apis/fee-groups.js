import * as axioHelper from "./api_helper";
import qs from "qs";

export async function fetchFeeGroups ({ params }){
  try {
    const result = await axioHelper.get(`/fee-groups?${qs.stringify(params)}`);
    return result;
  } catch (error){
    throw new Error("Error happened while fetching data");
  }
   

}
export async function updateFeeGroup ({ body, id }){
  try {
    const result = await axioHelper.patch(`/fee-groups/${id}`, body);
    return result;
  } catch (error){
    throw new Error("Error happened while updating data");
  }
}
export async function addFeeGroup ({ body }){
  try {
    const result = await axioHelper.post("/fee-groups", body);
    return result;
  } catch (error){
    throw new Error("Error happened while adding data");
  }
}
export async function deleteFeeGroup ({ id }){
  try {
    const result = await axioHelper.del(`/fee-groups/${id}`);
    return result;
  } catch (error){
    throw new Error("Error happened while deleting data");
  }
}