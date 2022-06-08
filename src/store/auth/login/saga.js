import {
  call, put, takeEvery, takeLatest 
} from "redux-saga/effects";
// Login Redux States
import {
  LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN 
} from "./actionTypes";
import {
  apiError, loginSuccess, logoutUserSuccess 
} from "./actions";

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import * as authApi from "../../../apis/auth";
import { getUserProfile, clearProfile } from "../profile/actions";
import {
  // postFakeLogin,
  // postJwtLogin,
  postSocialLogin,
} from "../../../helpers/fakebackend_helper";

const fireBaseBackend = getFirebaseBackend();

// function* loginUser({ payload: { user, history } }) {
//   try {
//     if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
//       const response = yield call(
//         fireBaseBackend.loginUser,
//         user.email,
//         user.password
//       );
//       yield put(loginSuccess(response));
//     } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
//       const response = yield call(postJwtLogin, {
//         email: user.email,
//         password: user.password,
//       });
//       localStorage.setItem("authUser", JSON.stringify(response));
//       yield put(loginSuccess(response));
//     } else if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
//       const response = yield call(postFakeLogin, {
//         email: user.email,
//         password: user.password,
//       });
//       localStorage.setItem("authUser", JSON.stringify(response));
//       yield put(loginSuccess(response));
//     }
//     history.push("/dashboard");
//   } catch (error) {
//     yield put(apiError(error));
//   }
// }

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("authUser");

    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(fireBaseBackend.logout);
      yield put(logoutUserSuccess(response));
      yield put(clearProfile());
    }
    history.push("/login");
  } catch (error) {
    yield put(apiError(error));
  }
}

function* socialLogin({ payload: { data, history, type } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const fireBaseBackend = getFirebaseBackend();
      const response = yield call(
        fireBaseBackend.socialLoginUser,
        data,
        type,
      );
      localStorage.setItem("authUser", JSON.stringify(response));
      yield put(loginSuccess(response));
    } else {
      const response = yield call(postSocialLogin, data);
      localStorage.setItem("authUser", JSON.stringify(response));
      yield put(loginSuccess(response));
    }
    history.push("/dashboard");
  } catch (error) {
    yield put(apiError(error));
  }
}

function * loginWithAPI({ payload: { values, history } }){
 
  try {
    const data = yield call(authApi.loginUser, values);
    
    
    const { message, result } = data;
    if (message === "Login successfull"){
      localStorage.setItem("authUser", JSON.stringify(result));
      yield put(getUserProfile());
      history.push("/dashboard");
    }
    else {
      yield put(apiError("Invalid Credentials"));
    }
  }
  catch (error){
    yield put(apiError(error));
  } 
}
function* authSaga() {
  yield takeEvery(LOGIN_USER, loginWithAPI);
  yield takeLatest(SOCIAL_LOGIN, socialLogin);
  yield takeEvery(LOGOUT_USER, logoutUser);
}

export default authSaga;
