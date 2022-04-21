import {
  call, put, takeEvery, delay
} from "redux-saga/effects";
// Login Redux States
import {
  FETCH_USERS_START,
  FETCH_USERS_ROLES_START,
  ADD_USERS_START,
  EDIT_USERS_START,
  DELETE_USERS_START
} from "./actionTypes";
import {
  fetchUsersSuccess, fetchUsersRolesSuccess, fetchUsersRolesError, fetchUsersError, addUserSuccess, addUserError, addUserClear, editUserDone, editUserClear, deleteUserDone
} from "./actions";

//Include Both Helper File with needed methods
import * as usersApi from "../../apis/users";


function * fetchUsers(params){
 
  try {
    const data = yield call(usersApi.getUsers, params);    
    yield put(fetchUsersSuccess(data));
  }
  catch (error){
    yield put(fetchUsersError(error));
  } 

}
function * fetchRoles(params){
 
  try {
    const data = yield call(usersApi.getRoles, params);  
    // console.log("data");  
    // console.log(data);  
    yield put(fetchUsersRolesSuccess(data));
  }
  catch (error){
    yield put(fetchUsersRolesError(error));
  } 

}
function * addUser(params){
  try {
    const data = yield call(usersApi.addUser, params);
    
    const { result } = data;
    yield put(addUserSuccess(result));
    yield delay(2000);
    yield put(addUserClear());
  }
  catch (error){
    yield put(addUserError(error));
    yield delay(2000);
    yield put(addUserClear());
  } 

  
}

function * editUser(params){
  try {
    const data = yield call(usersApi.editUser, params);
    
    
    const { result } = data;
    yield put(editUserDone({
      result,
      id: params.payload.id  
    }));
    yield delay(2000);
    yield put(editUserClear());
  }
  catch (error){
    yield put(editUserDone({ error: error.message }));
    yield delay(2000);
    yield put(editUserClear());
  } 

  
}

function * deleteUser(params) {
  try {
    const data = yield call(usersApi.deleteUser, params);
    const { result } = data;
    yield put(deleteUserDone({
      result,
      id: params.payload 
    }));
  }
  catch (error){
    yield put(deleteUserDone({ error: error.message }));
  } 

  
}

function* usersSaga() {
  yield takeEvery(FETCH_USERS_START, fetchUsers);
  yield takeEvery(FETCH_USERS_ROLES_START, fetchRoles);
  yield takeEvery(ADD_USERS_START, addUser);
  yield takeEvery(EDIT_USERS_START, editUser);
  yield takeEvery(DELETE_USERS_START, deleteUser);
}

export default usersSaga;
