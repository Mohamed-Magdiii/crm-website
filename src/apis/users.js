

import qs from "qs";
import * as axiosHelper from "./api_helper";

export const getUsers = async ({ payload }) => {
  const data = await axiosHelper.get(`/users?${qs.stringify(payload)}`);
  return data.result;
};
export const getAssignedUsers = async({ payload })=>{
  const data = await axiosHelper.get(`/users/assignable?${qs.stringify(payload)}`);
  return data;
};
export const getRoles = async ({ payload }) => {
  const data = await axiosHelper.get(`/roles?${qs.stringify(payload)}`);
  return data.result;
};
export const addUser = async ({ payload }) => {
  const data = await axiosHelper.post("/users", payload);
  if (data.isError) {
    throw new Error(data.message);
  }
  return data;
};

export const editUser = async ({ payload }) => {
  const { id, values } = payload;
  const data = await axiosHelper.patch(`/users/${id}`, values);
  if (data.isError) {
    throw new Error(data.message);
  }
  return data;
};
export const editUserPass = async ({ payload }) => {
  const { id, values } = payload;
  const data = await axiosHelper.patch(`/users/${id}/password`, values);
  if (data.isError) {
    throw new Error(data.message);
  }
  return data;
};
export const deleteUser = async ({ payload }) => {
  const data = await axiosHelper.del(`/users/${payload}`);
  if (data.isError) {
    throw new Error(data.message);
  }
  return data;
};
export const assignSalesAgent = async  ({ payload })=>{
  const { agentId, body } = payload;
  const data = await axiosHelper.post(`/users/${agentId}/assign`, body);
  return data;
};