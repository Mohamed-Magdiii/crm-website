import { 
  takeEvery, 
  call, 
  put,
  delay
} from "redux-saga/effects";
import 
{
  fetchLob,
  updateLob,
  addLob
} from "apis/lob";
import { 
  LOB_START,
  UPDATE_LOB_START,
  ADD_LOB_START
} from "./actionsTypes";
import { showSuccessNotification } from "../notifications/actions";
import { 
  fetchLOBSuccess,
  editLOBSuccess,
  addLOBSuccess,
  apiError,
  addModalClear
} from "./actions";
function * getLOB({ payload :{ params } }){
  try {
    const result = yield call(fetchLob, params);
    yield put(fetchLOBSuccess(result));
  } catch (error){
    yield put(apiError(error));
  }
}

function * editLOB({ payload }){
  try {
    const result = yield call(updateLob, payload);
    const { body, id } = payload;
    yield put(editLOBSuccess({
      _id:id, 
      ...body
    }));
    yield put(showSuccessNotification("LOB has been updated successfully!"));
    yield delay(2000);
  } catch (error){
    yield put(apiError(error));
  }
}

function * addLOB({ payload }){
  try {
    const data = yield call(addLob, payload);
    const { status } = data;
    const { result:lob } = data;
    if (status){
      yield put(addLOBSuccess(lob));
      yield put(showSuccessNotification("LOB is added successfully"));
      yield delay(1000);
      yield put(addModalClear());
    }
  } catch (error){
    yield put(apiError(error));
    yield delay(2000);
    yield put(apiError(""));
  }
}
function * LOB(){
  yield takeEvery(LOB_START, getLOB);
  yield takeEvery(UPDATE_LOB_START, editLOB);
  yield takeEvery(ADD_LOB_START, addLOB);
   
}
export default LOB;