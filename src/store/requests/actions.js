import {
  FETCH_IB_REQUESTS_START, FETCH_IB_REQUESTS_SUCCESS, FETCH_IB_REQUESTS_ERROR, IB_REQUEST_APPROVE_START,
  IB_REQUEST_REJECT_START, IB_REQUEST_STATUS_CHANGE_TO_APPROVE_SUCCESS, IB_REQUEST_STATUS_CHANGE_TO_REJECT_SUCCESS
} from "./actionTypes";


export const fetchIbs = (params = {}) => {
  return {
    type: FETCH_IB_REQUESTS_START,
    payload: params
  };
};

export const fetchIbStartsSuccess = (data) => {
  return {
    type: FETCH_IB_REQUESTS_SUCCESS,
    payload: data
  };
};

export const fetchIbStartsError = (error) => {
  return {
    type: FETCH_IB_REQUESTS_ERROR,
    payload: { error }
  };
};


export const ibRequestApprove = (data) => {
  console.log(data);
  return {
    type: IB_REQUEST_APPROVE_START,
    payload: data
  };
};


export const ibRequestToApproveStateChange = (data)=>{
  return {
    type:IB_REQUEST_STATUS_CHANGE_TO_APPROVE_SUCCESS,
    payload: data
  };
};

export const ibRequestReject = (data) => {
  return {
    type: IB_REQUEST_REJECT_START,
    payload: data
  };
};


export const ibRequestToRejectStateChange = (data)=>{
  return {
    type:IB_REQUEST_STATUS_CHANGE_TO_REJECT_SUCCESS,
    payload: data
  };
};