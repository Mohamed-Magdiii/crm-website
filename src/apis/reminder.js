import * as axiosHelper from "./api_helper";
import * as url from "../helpers/url_helper";
import qs from "qs";

// get Events 
export const getEvents = async ({ payload }) => {
  const data = await axiosHelper.get(`/todos?${qs.stringify(payload)}`);
  if (data.isError){
    throw new Error(data.isError);
  }
  return data;

};
// add Events 
export const addNewEvent = async (event) => {
  // const { id, values } = payload;
  const data = await axiosHelper.post("/todos", event);
  if (data.isError) {
    throw new Error(data.message);
  }
  return data;
};
// update Event
export const updateEvent = async (id, values) => {
  // const { id, values } = payload;
  const data = await axiosHelper.patch(`/todos/${id}`, values);
  if (data.isError) {
    throw new Error(data.message);
  }
  return data;
};
// delete Event
export const deleteEvent = async (id) => {
  // const { id, values } = payload;
  const data = await axiosHelper.del(`/todos/${id}`);
  if (data.isError) {
    throw new Error(data.message);
  }
  return data;
};
// get Categories
export const getCategories = () => axiosHelper.get(url.GET_CATEGORIES);


export const getTodos = async ({ payload }) => {
  const data = await axiosHelper.get(`/todos?${qs.stringify(payload)}`);
  if (data.isError){
    throw new Error(data.isError);
  }
  return data.result;
};

export const addTodo = async (params) => {
  const { id, ...obj } = params;
  let data;
  if (id) {
    data = data = await axiosHelper.patch(`/todos/${id}`, obj);
  } else {
    data = await axiosHelper.post("/todos", obj);
  }
  if (data.isError) {
    throw new Error(data.message);
  }
  return data.result;
};

export const updateTodo = async (id, params) => {
  // const { id, values } = payload;
  const data = await axiosHelper.post("/todos", params);
  if (data.isError) {
    throw new Error(data.message);
  }
  return data.result;
};

export const deleteTodo = async (id) => {
  // const { id, values } = payload;
  const data = await axiosHelper.del("/todos/" + id);
  if (data.isError) {
    throw new Error(data.message);
  }
  return data.result;
};