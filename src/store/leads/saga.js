
import {
  call, put, takeEvery, delay
} from "redux-saga/effects";
import { addNewLead, fetchLeadsFromAPI } from "../../apis/lead-api";
import { 
  apiError, 
  addNewLeadSuccess,
  fetchLeadsSuccess,
  addModalClear
} from "./actions";
import { ADD_NEW_LEAD, FETCH_LEADS_START } from "./actionsType";

function * fetchLeads(params){
  try {
    const data = yield call(fetchLeadsFromAPI, params);
    yield put(fetchLeadsSuccess(data));
  } catch (error){
    yield put(apiError("Oppos there is a problem in the server"));
  }
}

function *addNewLeadSaga({ payload:{ newLead } }){
  try {
    const data = yield call(addNewLead, newLead);
    const { status } = data;
    if (status){
      yield put (addNewLeadSuccess(newLead));
      yield delay(2000);
      yield put(addModalClear());
    }        
  }
  catch (error){
    yield put(apiError("Please Enter Valid data"));
  } 
      
}

function * leadSaga(){
  yield takeEvery(FETCH_LEADS_START, fetchLeads);
  yield takeEvery(ADD_NEW_LEAD, addNewLeadSaga);
}

export default leadSaga;