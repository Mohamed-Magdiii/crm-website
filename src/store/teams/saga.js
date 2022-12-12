import {
  FETCH_TEAMS_START, ADD_TEAMS_START, MODAL_CLEAR 
} from "./actionsTypes";
import {
  fetchTeamsSuccess, apiError, modalClear, addTeamsSuccess
} from "./actions";
import { getTeams, addTeam } from "apis/teams";
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
    console.log(params);
    const result = yield call(addTeam, params);
    yield put(addTeamsSuccess(result));
  } catch (error){
    yield put(apiError(error));
  }
}

function * Teams(){
  yield takeEvery(FETCH_TEAMS_START, fetchTeams);
  yield takeEvery(ADD_TEAMS_START, addTeams);
    
  
}
export default Teams;