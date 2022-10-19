import { all, fork } from "redux-saga/effects";
import AccountSaga from "./auth/register/saga";
import AuthSaga from "./auth/login/saga";
import ForgetSaga from "./auth/forgetpwd/saga";
import ResetPasswordSaga from "./auth/resetpwd/saga";
import ProfileSaga from "./auth/profile/saga";
import LayoutSaga from "./layout/saga";
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
import ordersSaga from "./orders/saga"; 
import bankAccountSaga from "./bankAccount/saga"; 
import dictionarySaga from "./dictionary/saga";
import marketSaga from "./markets/saga";
import feeGroupSaga from "./feeGroups/saga";
import markupSaga from "./markups/saga";
import marketPricingSaga from "./marketPricing/saga";
import transactionFeeGroupSaga from "./transactionFeeGroups/saga";
import documentsSaga from "./documents/saga";
import ordersProfitsSaga from "./ordersProfit/saga";
import transactionsProfitsSaga from "./transactionsProfit/saga";
import todosSaga from "./todos/saga";
import logsSaga from "./logs/saga";
import dashboardSaga from "./dashboard/saga";
import forexDepositSaga from "./forexTransactions/deposits/saga";
import forexGatewaySaga from "./forexGateway/saga";
import forexWithdrawalSaga from "./forexTransactions/withdrawals/saga";
import internalTransferSaga from "./forexTransactions/internalTransfers/saga";
import creditSaga from "./forexTransactions/credit/saga";
import tradingAccountsSaga from "./tradingAccounts/saga";
import clientTransactionsSaga from "./transactions/saga";

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
    fork(ordersSaga), 
    fork(bankAccountSaga),
    fork(marketSaga),
    fork(markupSaga),
    fork(dictionarySaga),
    fork(marketPricingSaga),
    fork(feeGroupSaga),
    fork(transactionFeeGroupSaga),
    fork(documentsSaga),
    fork(ordersProfitsSaga),
    fork(transactionsProfitsSaga),
    fork(todosSaga),
    fork(logsSaga),
    fork(dashboardSaga),
    fork(forexDepositSaga),
    fork(forexGatewaySaga),
    fork(forexWithdrawalSaga),
    fork(internalTransferSaga),
    fork(creditSaga),
    fork(tradingAccountsSaga),
    fork(clientTransactionsSaga),
  ]);
}