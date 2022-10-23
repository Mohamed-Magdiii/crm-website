import {
  takeEvery, fork, put, all, call, delay 
} from "redux-saga/effects";

// Login Redux States
import { FORGET_PASSWORD } from "./actionTypes";
import { 
  userForgetPasswordSuccess, 
  userForgetPasswordError,
  userForgetPasswordClear 
} from "./actions";

//Include Both Helper File with needed methods
// import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import * as forgotPasswordApis from "../../../apis/forgotPassword";
// import {
//   postFakeForgetPwd,
//   postJwtForgetPwd,
// } from "../../../helpers/fakebackend_helper";

// const fireBaseBackend = getFirebaseBackend();

//If user is send successfully send mail link then dispatch redux action's are directly from here.
// function* forgetUser({ payload: { user } }) {
//   try {
//     if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
//       const response = yield call(fireBaseBackend.forgetPassword, user.email);
//       if (response) {
//         yield put(
//           userForgetPasswordSuccess(
//             "Reset link is sent to your mailbox, check there first"
//           )
//         );
//       }
//     } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
//       const response = yield call(postJwtForgetPwd, "/jwt-forget-pwd", {
//         email: user.email,
//       });
//       if (response) {
//         yield put(
//           userForgetPasswordSuccess(
//             "Reset link is sent to your mailbox, check there first"
//           )
//         );
//       }
//     } else {
//       const response = yield call(postFakeForgetPwd, "/fake-forget-pwd", {
//         email: user.email,
//       });
//       if (response) {
//         yield put(
//           userForgetPasswordSuccess(
//             "Reset link is sent to your mailbox, check there first"
//           )
//         );
//       }
//     }
//   } catch (error) {
//     yield put(userForgetPasswordError(error));
//   }
// }

function* forgetUser({ payload }) {
  try {
    const response = yield call(forgotPasswordApis.forgotPassword, payload);
    if (response) {
      yield put(
        userForgetPasswordSuccess(
          "Reset link are sent to your mailbox, check there first"
        )
      );
      yield delay(3000);
      yield put(userForgetPasswordClear());
    }
  } catch (error) {
    yield put(userForgetPasswordError(error.message));
    yield delay(3000);
    yield put(userForgetPasswordClear());
  }
}

export function* watchUserPasswordForget() {
  yield takeEvery(FORGET_PASSWORD, forgetUser);
}

function* forgetPasswordSaga() {
  yield all([fork(watchUserPasswordForget)]);
}

export default forgetPasswordSaga;
