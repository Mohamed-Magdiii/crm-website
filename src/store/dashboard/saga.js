import {
  call, put, takeEvery
} from "redux-saga/effects";
// Login Redux States
import {
  FETCH_CUSTOMERS_COUNTRIES_START,
  FETCH_CUSTOMERS_STATS_START
} from "./actionTypes";
import {
  fetchCustomerCountriesEnd,
  fetchCustomerStatsEnd
} from "./actions";

import * as dashboardApi from "../../apis/dashboard";


function * fetchCustomerCountries(params){
 
  try {
    const data = yield call(dashboardApi.getCustomerCountries, params);
    const leads = data.filter(obj => obj._id.category === "DEMO").map(obj => {
      return {
        country: obj._id.country,
        total: obj.total,
      };
    });
    const clients = data.filter(obj => obj._id.category !== "DEMO").map(obj => {
      return {
        country: obj._id.country,
        total: obj.total,
      };
    });
    yield put(fetchCustomerCountriesEnd({
      leads,
      clients
    }));
  }
  catch (error){
    yield put(fetchCustomerCountriesEnd({ error }));
  } 

  
}

function * fetchCustomerStats(params){
 
  try {
    const data = yield call(dashboardApi.getCustomerStats, params);
    const leadsStats = data.filter(obj => obj._id.category === "DEMO").map(obj => {
      return {
        assigned: obj._id.assigned,
        total: obj.total,
      };
    });
    const clientsStats = data.filter(obj => obj._id.category !== "DEMO").map(obj => {
      return {
        assigned: obj._id.assigned,
        category: obj._id.category,
        total: obj.total,
      };
    });
    yield put(fetchCustomerStatsEnd({
      leadsStats: {
        assigned: leadsStats.filter(obj => obj.assigned).reduce(function(sum, current) {
          return sum + current.total;
        }, 0),
        unAssigned: leadsStats.filter(obj => !obj.assigned).reduce(function(sum, current) {
          return sum + current.total;
        }, 0),
      },
      clientsStats: {
        assigned: clientsStats.filter(obj => obj.assigned).reduce(function(sum, current) {
          return sum + current.total;
        }, 0),
        unAssigned: clientsStats.filter(obj => !obj.assigned).reduce(function(sum, current) {
          return sum + current.total;
        }, 0),
      },
    }));
  }
  catch (error){
    yield put(fetchCustomerStatsEnd({ error }));
  } 

  
}


function* authSaga() {
  yield takeEvery(FETCH_CUSTOMERS_COUNTRIES_START, fetchCustomerCountries);
  yield takeEvery(FETCH_CUSTOMERS_STATS_START, fetchCustomerStats);
}

export default authSaga;
