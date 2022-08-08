import {
  GET_TODOS_START,
  GET_TODOS_END,
  ADD_TODO_START,
  ADD_TODO_END,
  ADD_TODO_CLEAR
} from "./actionTypes";

export const fetchTodosStart = (params = {})=>{
  return {
    type:GET_TODOS_START,
    payload: params
  };
};
export const fetchTodosEnd = (data)=>{
  return {
    type:GET_TODOS_END,
    payload: data
  };
};

export const addTodosStart = (params = {})=>{
  return {
    type:ADD_TODO_START,
    payload: params
  };
};
export const addTodosEnd = (data)=>{
  return {
    type:ADD_TODO_END,
    payload: data
  };
};

export const addTodoClear = (data)=>{
  return {
    type:ADD_TODO_CLEAR,
    payload: data
  };
};