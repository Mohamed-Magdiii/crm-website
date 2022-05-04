import qs from "qs";
import * as axiosHelper from "./api_helper"; 
export const getTeams = async({ payload }) => {
  const data = await axiosHelper.get(`/teams?${qs.stringify(payload)}`);
  return data.result;
};
export const getManagers = async({ payload }) => {
  const data = await axiosHelper.get(`/users/managers?${qs.stringify(payload)}`);
  return data.result;
};  

export const getMembers = async({ payload }) => {
  const data = await axiosHelper.get(`/users/members?${qs.stringify(payload)}`);
  return data.result;
};
export const addTeam = async({ payload }) => {

  // console.log("hi add team");
  // console.log(payload);
  const data = await axiosHelper.post("/teams", payload);
  if (data.isError) {
    throw new Error(data.message);
  } 
  return data;
};

export const editTeam = async({ payload }) => {
  const { id, values } = payload;
  const data = await axiosHelper.patch(`/teams/${id}`, values);
  if (data.isError) {
    throw new Error(data.message);
  } 
  return data;
};
export const editTeamMembers = async({ payload }) => {
  const { id, values } = payload;
  const data = await axiosHelper.post(`/teams/${id}/add-member`, values);
  if (data.isError) {
    throw new Error(data.message);
  } 
  return data;
};
export const deleteTeam = async({ payload }) => {
  const data = await axiosHelper.del(`/teams/${payload}`);
  if (data.isError) {
    throw new Error(data.message);
  } 
  return data;
};