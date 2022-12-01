import { all, fork } from "redux-saga/effects";
import AccountSaga from "./auth/register/saga";
import AuthSaga from "./auth/login/saga";
import ForgetSaga from "./auth/forgetpwd/saga";
import ResetPasswordSaga from "./auth/resetpwd/saga";
import ProfileSaga from "./auth/profile/saga";
import LayoutSaga from "./layout/saga";
import chatSaga from "./chat/saga";


export default function* rootSaga() {
  yield all([
    //public
    fork(AccountSaga),
    fork(AuthSaga),
    fork(ForgetSaga),
    fork(ResetPasswordSaga),
    fork(ProfileSaga),
    fork(LayoutSaga),
    fork(chatSaga),
    
  ]);
}