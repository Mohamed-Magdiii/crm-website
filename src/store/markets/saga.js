import {
  call, put, takeEvery, delay
} from "redux-saga/effects";
import {
  fetchMarketsStart, fetchMarketsSuccess, addNewMarketSuccess, addMarketModalClear, editMarketSuccess, marketEditModalClear
} from "./actions";
import { 
  getMarkets, addNewMarketAPI, updateMarket
} from "apis/markets";
import { apiError } from "../markets/actions";
import {
  ADD_NEW_MARKET, EDIT_MARKET_START, FETCH_MARKETS_START 
} from "./actionTypes";

function * fetchMarket(params){
  try {
    const data = yield call(getMarkets, params);
    yield put(fetchMarketsSuccess(data));
  } catch (error){
    yield put(apiError(error));
  }
}
function * addNewMarket({ payload :{ newMarket } }) {
  try {
    const data = yield call(addNewMarketAPI, newMarket);
    const { status } = data;
    const { result:{ _id } } = data;
    
    if (status){
      yield put(addNewMarketSuccess({
        id:_id, 
        ...newMarket
      }));
      yield delay(2000);
      yield put(addMarketModalClear());
    }
    
  } catch (error){
    yield put(apiError("Please Enter valid data"));
    yield delay(2000);
    yield put(apiError(""));
  }
}
function * editMarket(params){
  const { payload } = params;
  const { id, values } = payload;
  
  try {
    yield call(updateMarket, params);
    yield put(editMarketSuccess({
      id,
      values
    }));
    yield delay(2000);
    yield put(marketEditModalClear());
  } catch (error){
    yield put(apiError("Please Enter Valid data"));
  }
  
}
function * marketSaga(){
  yield  takeEvery(FETCH_MARKETS_START, fetchMarket);
  yield  takeEvery(ADD_NEW_MARKET, addNewMarket);
  yield  takeEvery(EDIT_MARKET_START, editMarket);
}
export default marketSaga;