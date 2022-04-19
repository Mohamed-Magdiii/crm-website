
import {
  call, put, takeEvery
} from "redux-saga/effects";
import { addNewLead, fetchLeadsFromAPI} from "../../apis/lead-api";
import { 
  apiError, addNewLeadSuccess, fetchLeadsSuccess 
} from "./actions";
import { ADD_NEW_LEAD, FETCH_LEADS_START } from "./actionsType";
function * fetchLeads({ payload }){
  try {
    
    const data = yield call(fetchLeadsFromAPI, payload);
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
      
      yield put (addNewLeadSuccess("Lead is added successfully", newLead));
      
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