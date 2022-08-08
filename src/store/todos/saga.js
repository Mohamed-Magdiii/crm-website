import {
  takeEvery, put, call
} from "redux-saga/effects";

// Calender Redux States
import {
  GET_TODOS_START,
  ADD_TODO_START
} from "./actionTypes";

import {
  fetchTodosEnd,
  addTodosEnd,
  addTodoClear
} from "./actions";
import * as todosApi from "../../apis/reminder";
import { showErrorNotification, showSuccessNotification } from "store/notifications/actions";

function * fetchRoles(params){
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
    yield put(addTodosEnd({ data }));
    yield put(showSuccessNotification("Role added successfully"));
    yield put(addTodoClear());

  }
  catch (error){
    yield put(addTodosEnd({ error }));
    yield put(showErrorNotification(error.message));
  } 
}

function* calendarSaga() {
  yield takeEvery(GET_TODOS_START, fetchRoles);
  yield takeEvery(ADD_TODO_START, addTodo);

}

export default calendarSaga;
