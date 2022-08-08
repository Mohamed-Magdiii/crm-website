import {
  takeEvery, put, call, all, fork
} from "redux-saga/effects";

// Calender Redux States
import {
  ADD_NEW_EVENT,
  DELETE_EVENT,
  GET_CATEGORIES,
  GET_EVENTS,
  UPDATE_EVENT,
} from "./actionTypes";
import {
  apiSuccess, apiFail,
  updateEventSuccess,
  updateEventFail,
  deleteEventSuccess,
  deleteEventFail,
  getCategoriesSuccess,
  getCategoriesFail,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getEvents,
  addNewEvent,
  updateEvent,
  deleteEvent,
  getCategories,
} from "../../apis/reminder";
function* fetchEvents(params) {
  try {
    const response = yield call(getEvents, params);
    let output = [];

    response.result?.docs?.map(function (item) {
      let classNam = "";
      if (item?.type == "1") {
        classNam = "bg-success text-white";

      } else if (item?.type == "0") {
        classNam = "bg-info text-white";

      }
      // if (item?.status == "open") {
      //   classNam = "bg-info text-white";

      // } else if (item?.status == "completed") {
      //   classNam = "bg-success text-white";

      // } else if (item?.status == "ongoing") {
      //   classNam = "bg-primary text-white";

      // }
      output.push({
        id: item._id,
        title: (item.note && item.note[0].toUpperCase() + item.note.slice(1)) || "",
        start: item.timeEnd,
        timeEnd: item.timeEnd,
        className: classNam,
        customerId: item.customerId,
        createdBy: item.createdBy,
        status: item.status,
        type: item.type,
      });

    });
    yield put(apiSuccess(GET_EVENTS, output));
  } catch (error) {
    yield put(apiFail(GET_EVENTS, error));
  }
}

function* onAddNewEvent({ payload: event }) {
  try {
    const response = yield call(addNewEvent, event);
    yield put(apiSuccess(ADD_NEW_EVENT, response));
  } catch (error) {
    yield put(apiFail(ADD_NEW_EVENT, error));
  }
}

function* onUpdateEvent({ payload: event }) {
  try {
    const response = yield call(updateEvent, event);
    yield put(updateEventSuccess(response));
  } catch (error) {
    yield put(updateEventFail(error));
  }
}

function* onDeleteEvent({ payload: event }) {
  try {
    const response = yield call(deleteEvent, event);
    yield put(deleteEventSuccess(response));
  } catch (error) {
    yield put(deleteEventFail(error));
  }
}

function* onGetCategories() {
  try {
    const response = yield call(getCategories);
    yield put(getCategoriesSuccess(response));
  } catch (error) {
    yield put(getCategoriesFail(error));
  }
}

export function* watchFetchEvents() {
  yield takeEvery(GET_EVENTS, fetchEvents);
}

export function* watchOnAddNewEvent() {
  yield takeEvery(ADD_NEW_EVENT, onAddNewEvent);
}

export function* watchOnUpdateEvent() {
  yield takeEvery(UPDATE_EVENT, onUpdateEvent);
}
export function* watchOnDeleteEvent() {
  yield takeEvery(DELETE_EVENT, onDeleteEvent);
}
export function* watchOnGetCategories() {
  yield takeEvery(GET_CATEGORIES, onGetCategories);
}

function* calendarSaga() {
  yield all([fork(watchFetchEvents)]);
  yield all([fork(watchOnAddNewEvent)]);
  yield all([fork(watchOnUpdateEvent)]);
  yield all([fork(watchOnDeleteEvent)]);
  yield all([fork(watchOnGetCategories)]);
}

export default calendarSaga;
