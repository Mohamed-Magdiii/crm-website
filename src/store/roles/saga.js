import {
  call, put, takeEvery 
} from "redux-saga/effects";
// Login Redux States
import {
  FETCH_ROLES_START, FETCH_ROLES_SUCCESS, FETCH_ROLES_ERROR 
} from "./actionTypes";
import { fetchRolesSuccess, fetchRolesError } from "./actions";

//Include Both Helper File with needed methods
import * as rolesApi from "../../apis/roles";


function * fetchRoles(params){
 
  try {
    const data = yield call(rolesApi.getRoles, params);
    
    
    const { message, result } = data;
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
