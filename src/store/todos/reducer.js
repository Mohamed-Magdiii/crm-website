import {
  GET_TODOS_START,
  GET_TODOS_END,
  ADD_TODO_START,
  ADD_TODO_END,
  ADD_TODO_CLEAR
} from "./actionTypes";

const INIT_STATE = {
  loading: false,
  list: {},
  clearingCounter: 0,
};

const Calendar = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_TODOS_START:
      return {
        ...state,
        loading: true,
        tods: [],
      };
    case GET_TODOS_END:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        list: {
          ...action.payload.list,
          ...action.payload.data,
        }
      };
    
    case ADD_TODO_START:
      return {
        ...state,
        adding: true,
      };
  
    case ADD_TODO_END:
      return {
        ...state,
        adding: false,
        addError: action.payload.error,
        list: {
          ...state.list,
          docs: state.list.docs ? [ action.payload.data, ...state.list.docs ] : [action.payload.data],
        },

      };
    case ADD_TODO_CLEAR:
      return {
        ...state,
        clearingCounter: state.clearingCounter + 1
      };

    default:
      return state;
  }
};

export default Calendar;
