import qs from "qs";
import * as axiosHelper from "./api_helper";

export const getTeams = async ({ payload }) => {
  const data = await axiosHelper.get(`/teams?${qs.stringify(payload)}`);
  return data;
};


export const addTeam = async ({ payload }) => {

  const data = await axiosHelper.postFormData("/teams", payload);
  if (data.isError) {
    throw new Error(data.message);
  }
  return data;
};

export const editTeamMembers = async ({ payload }) => {
  const { id, values } = payload;
  const data = await axiosHelper.post(`/teams/${id}/add-member`, values);
  if (data.isError) {
    throw new Error(data.message);
  }
  return data;
};

export const addTeamMembers = async (id, member) => {
  // const { id, values } = payload;
  const data = await axiosHelper.post(`/teams/${id}/add-member`, member);
  if (data.isError) {
    throw new Error(data.message);
  }
  return data;
};
export const deleteTeamMembers = async (id, member) => {
  // const { id, values } = payload;
  const data = await axiosHelper.post(`/teams/${id}/remove-member`, member);
  if (data.isError) {
    throw new Error(data.message);
  }
  return data;
};
