import {
  call, put, takeEvery 
} from "redux-saga/effects";
// Login Redux States
import {
  FETCH_ROLES_START
} from "./actionTypes";
import { fetchRolesSuccess } from "./actions";

//Include Both Helper File with needed methods
import * as rolesApi from "../../apis/roles";


function * fetchRoles(params){
 
  try {
    const data = yield call(rolesApi.getRoles, params);
    
    
    const { result } = data;
    yield put(fetchRolesSuccess(result));
  }
  catch (error){
    yield put(  (error));
  } 

  
}
function* authSaga() {
  yield takeEvery(FETCH_ROLES_START, fetchRoles);
}

export default authSaga;
