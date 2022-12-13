import {
  FETCH_TEAMS_START, ADD_TEAMS_START, MODAL_CLEAR 
} from "./actionsTypes";
import {
  fetchTeamsSuccess, apiError, modalClear, addTeamsSuccess
} from "./actions";
import { getTeams, addTeam } from "apis/teams";
import { showSuccessNotification } from "store/notifications/actions";
import { 
  takeEvery, 
  call, 
  put,
  delay
} from "redux-saga/effects";


function * fetchTeams({ payload :{ params } }){
  try {
    const result = yield call(getTeams, params);
    yield put(fetchTeamsSuccess(result));
  } catch (error){
    yield put(apiError(error));
  }
}
 
function * addTeams({ payload :{ params } }){
  try {
    const result = yield call(addTeam, params);
    yield put(addTeamsSuccess(result));
    yield put(showSuccessNotification("New member is added successfully"));
    yield delay(1000);
    yield put(modalClear());
  } catch (error){
    yield put(apiError(error));
    yield delay(2000);
    yield put(apiError(""));
  }
}

function * Teams(){
  yield takeEvery(FETCH_TEAMS_START, fetchTeams);
  yield takeEvery(ADD_TEAMS_START, addTeams);
    
  
}
export default Teams;