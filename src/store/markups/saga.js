import {
  DELETE_MARKUP_START, FETCH_MARKUPS_START, MARKUP_EDIT_START, ADD_MARKUP_START
} from "./actionTypes";
import {
  call, put, takeEvery, delay
} from "redux-saga/effects";
import {
  getMarkups
} from "apis/markups";
import {
  fetchMarkupsSuccess,
  editMarkupSuccess,
  markupEditModalClear,
  deleteMarkupDone,
  addNewMarkupSuccess,
  apiError,
  addMarkupModalClear
} from "./actions";
import {
  updateMarkup, deleteMarkupAPI, addMarkupAPI
} from "apis/markup";

function* fetchMarket(params) {
  try {
    const data = yield call(getMarkups, params);
    yield put(fetchMarkupsSuccess(data));
  } catch (error) {
    yield put(apiError(error));
    yield delay(2000);
    yield put(apiError(""));
  }
}
function* editMarket(params) {
  const { payload } = params;
  const { id, values } = payload;
  try {
    yield call(updateMarkup, params);
    yield put(editMarkupSuccess({
      id,
      values
    }));
    yield delay(2000);
    yield put(markupEditModalClear());
  } catch (error) {
    yield put(apiError(error));
    yield delay(2000);
    yield put(apiError(""));
  }

}
function* deleteMarkup(params) {
  try {
    const data = yield call(deleteMarkupAPI, params.payload);

    const { result } = data;
    if (result){  
      yield put(deleteMarkupDone({
        result,
        id: params.payload,
      }));}
  } catch (error) {
    // yield put(apiError("An error happned during deleting this record"));
  }
}
function * addMarkup({ payload: newMarkup }){
  try {
    const data = yield call(addMarkupAPI, newMarkup);
    if (data.status){
      yield put(addNewMarkupSuccess(data.result));
      yield delay(2000);
      yield put(addMarkupModalClear());
    }
  } catch (error){   
    yield put(apiError(error));
    yield delay(2000);
    yield put(apiError(""));
  }
 
}
function* markupSaga() {
  yield takeEvery(FETCH_MARKUPS_START, fetchMarket);
  yield takeEvery(MARKUP_EDIT_START, editMarket);
  yield takeEvery(DELETE_MARKUP_START, deleteMarkup);
  yield takeEvery(ADD_MARKUP_START, addMarkup);
}
export default markupSaga;