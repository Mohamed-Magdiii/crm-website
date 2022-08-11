/* eslint-disable object-property-newline */
import {
  takeEvery, put, call
} from "redux-saga/effects";

// Calender Redux States
import {
  GET_TODOS_START,
  ADD_TODO_START,
  DELETE_TODO_START
} from "./actionTypes";

import {
  fetchTodosEnd,
  addTodosEnd,
  addTodoClear,
  deleteTodosEnd
} from "./actions";
import * as todosApi from "../../apis/reminder";
import { showErrorNotification, showSuccessNotification } from "store/notifications/actions";

function * fetchTodos(params){
  try {
    const data = yield call(todosApi.getTodos, params);  
    yield put(fetchTodosEnd({ data }));
  }
  catch (error){
    yield put(fetchTodosEnd({ error }));
  } 
}

function * addTodo(params){
  try {
    const data = yield call(todosApi.addTodo, params.payload);  
    yield put(addTodosEnd({ data : params.payload.id ? params.payload : data, id: params.payload.id }));
    if (params.payload.id) {
      yield put(showSuccessNotification("Todo updated successfully"));
    } else {
      yield put(showSuccessNotification("Todo added successfully"));
    }
    yield put(addTodoClear());

  }
  catch (error){
    yield put(addTodosEnd({ error }));
    yield put(showErrorNotification(error.message));
  } 
}

function * deleteTodo(params){
  try {
    yield call(todosApi.deleteTodo, params.payload);  
    yield put(deleteTodosEnd({ id: params.payload }));
    yield put(showSuccessNotification("Todo deletd successfully"));
  }
  catch (error){
    yield put(deleteTodosEnd({ error }));
    yield put(showErrorNotification(error.message));
  } 
}

function* calendarSaga() {
  yield takeEvery(GET_TODOS_START, fetchTodos);
  yield takeEvery(ADD_TODO_START, addTodo);
  yield takeEvery(DELETE_TODO_START, deleteTodo);

}

export default calendarSaga;
