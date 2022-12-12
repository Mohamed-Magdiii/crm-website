import {
  FETCH_TEAMS_START, FETCH_TEAMS_SUCCESSFUL, ADD_TEAMS_START, ADD_TEAMS_SUCCESSFUL, MODAL_CLEAR, API_ERROR 
} from "./actionsTypes";
const initalState = {
  loading: false,
  error: "",
  docs: [],
  successMessage: "",
  modalClear:false,
};
const teamsReducer = (state = initalState, action) => {
  switch (action.type) {
    case FETCH_TEAMS_START:
      state = {
        ...state,
        loading: true,
        error: ""
      };
      break;
    case FETCH_TEAMS_SUCCESSFUL:
      state = {
        ...state,
        docs: [...action.payload.result.docs],
        totalDocs: action.payload.result.totalDocs,
        hasNextPage: action.payload.result.hasNextPage,
        hasPrevPage: action.payload.result.hasPrevPage,
        limit: action.payload.result.limit,
        nextPage: action.payload.result.nextPage,
        page: action.payload.result.page,
        prevPage: action.payload.result.prevPage,
        totalPages: action.payload.result.totalPages,
        loading: false
      };
    
      break;

    case ADD_TEAMS_START: 
      state = {
        ...state,
        modalClear:false,
        disableAddButton:true,
        successMessage:""
      };
      break;
    case ADD_TEAMS_SUCCESSFUL:
      state = {
        docs: action.payload ? [...state.docs, action.payload] : [...state.docs],
        disableAddButton:true,
        successMessage:true,
        totalDocs:state.totalDocs + 1,
        loading:false,
      };
      break;
    case MODAL_CLEAR:
      state = {
        ...state,
        successMessage:false,
        disableAddButton:false,
        modalClear:true,
      };
      break;
    case API_ERROR:
      state = {
        ...state,
        disableAddButton:false,
        error: action.payload.error
      };
      break;
    default:
      state = { ...state };
  }
  return state;
};
export default teamsReducer;