import { all, fork } from "redux-saga/effects";
import AccountSaga from "./auth/register/saga";
import AuthSaga from "./auth/login/saga";
import ForgetSaga from "./auth/forgetpwd/saga";
import ProfileSaga from "./auth/profile/saga";
import LayoutSaga from "./layout/saga";
import calendarSaga from "./calendar/saga";
import chatSaga from "./chat/saga";
import invoiceSaga from "./invoices/saga";
import contactsSaga from "./contacts/saga";
import leadSaga from "./leads/saga";
import rolesSaga from "./roles/saga";
import usersSaga from "./users/saga";
import systemEmailsSaga from "./systemEmail/saga";
import clientSaga from "./client/saga";
import teamsSaga from "./teams/saga";
import assetSaga from "./assests/saga";
import walletSaga from "./wallet/saga";
import gatewaySaga from "./gateway/saga";
import depositSaga from "./transactions/deposit/saga";
import withdrawalSaga from "./transactions/withdrawal/saga";
import dictionarySaga from "./dictionary/saga";
import marketSaga from "./markets/saga";
import feeGroupSaga from "./feeGroups/saga";
import markupSaga from "./markups/saga";
import marketPricingSaga from "./marketPricing/saga";

export default function* rootSaga() {
  yield all([
    //public
    fork(AccountSaga),
    fork(AuthSaga),
    fork(ForgetSaga),
    fork(ProfileSaga),
    fork(LayoutSaga),
    fork(calendarSaga),
    fork(chatSaga),
    fork(invoiceSaga),
    fork(contactsSaga),
    fork(leadSaga),
    fork(rolesSaga),
    fork(usersSaga),
    fork(systemEmailsSaga),
    fork(clientSaga),
    fork(teamsSaga),
    fork(assetSaga),
    fork(walletSaga),
    fork(gatewaySaga),
    fork(depositSaga),
    fork(withdrawalSaga),
    fork(marketSaga),
    fork(markupSaga),
    fork(dictionarySaga),
    fork(marketPricingSaga),
    fork(marketSaga),
    fork(feeGroupSaga)
  ]);
}