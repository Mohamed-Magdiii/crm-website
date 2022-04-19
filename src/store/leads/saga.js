
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
    console.log("leads", data);
    yield put(fetchLeadsSuccess(data));
  } catch (error){
    yield put(apiError("Oppos there is a problem in the server"));
  }
  

}
function *addNewLeadSaga({ payload:{ newLead } }){
  try {
    const data = yield call(addNewLead, newLead);
    const { status } = data;
    const { code } = data;
      
    if (status === true){
      yield put (addNewLeadSuccess("Lead is added successfully"));
      
    }
    if ( code === 500){
      yield put(apiError("Please Enter Valid Data"));
    }
         
  }
  catch (error){
          
          
    yield put(apiError("Oppos,Error in the server"));
  } 
      
}
function * leadSaga(){
  yield takeEvery(FETCH_LEADS_START, fetchLeads);
  yield takeEvery(ADD_NEW_LEAD, addNewLeadSaga);
}
export default leadSaga;