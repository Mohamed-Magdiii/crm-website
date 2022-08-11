import {
  GET_TODOS_START,
  GET_TODOS_END,
  ADD_TODO_START,
  ADD_TODO_END,
  ADD_TODO_CLEAR,
  DELETE_TODO_START,
  DELETE_TODO_END
} from "./actionTypes";

const INIT_STATE = {
  loading: false,
  list: {},
  clearingCounter: 0,
  deletingClearCounter: 0,
};

const Calendar = (state = INIT_STATE, action) => {
  let docs = state.list && state.list.docs || [];
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
      // eslint-disable-next-line no-debugger
      debugger;
      if (action.payload.id) {
        docs = docs.map(obj => {
          if (obj._id === action.payload.id) {
            return {
              ...obj,
              ...action.payload.data,
            };
          }
          return obj;
        });
      }
      if (action.payload.data && !action.payload.id) {
        docs = [action.payload.data, ...docs];
      }
      return {
        ...state,
        adding: false,
        addError: action.payload.error,
        list: {
          ...state.list,
          docs:  docs
        },

      };
    case ADD_TODO_CLEAR:
      return {
        ...state,
        clearingCounter: state.clearingCounter + 1
      };
    case DELETE_TODO_START:
      return {
        ...state,
        deleting: true,
      };
    case DELETE_TODO_END:
      docs = docs.filter(obj => obj._id !== action.payload.id);
      return {
        ...state,
        deleting: false,
        deletingClearCounter: state.deletingClearCounter + 1,
        list: {
          ...state.list,
          docs: docs
        }
      };
    default:
      return state;
  }
};

export default Calendar;
