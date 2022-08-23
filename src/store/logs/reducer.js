import {
  GET_LOGS_START,
  GET_LOGS_END,
} from "./actionTypes";

const INIT_STATE = {
  loading: false,
  logs: {},
  clearingCounter: 0,
};

const Calendar = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_LOGS_START:
      return {
        ...state,
        loading: true,
        logs: {},
      };
    case GET_LOGS_END:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        logs: action.payload.data
      };
    default:
      return state;
  }
};

export default Calendar;
