import {
  LOB_START, LOB_SUCCESSFUL, UPDATE_LOB_START, ADD_MODAL_CLEAR, UPDATE_LOB_SUCCESS, ADD_LOB_START, ADD_LOB_SUCCESS, API_ERROR 
} from "./actionsTypes";
const initalState = {
  loading: false,
  error: "",
  docs: [],
  successMessage: false,
  modalClear:false,
  disableAddButton:false
};
const LOBReducer = (state = initalState, action) => {
  switch (action.type) {
    case LOB_START:
      state = {
        ...state,
        loading: true,
        error: ""
      };
      break;
    case LOB_SUCCESSFUL:
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


    case UPDATE_LOB_SUCCESS:
      state = {
        ...state,
        docs: state.docs.map(doc => {
          if (doc._id === action.payload._id) {
            return { ...action.payload };
          }
          else {
            return doc;
          }
        }),
        showEditSuccessMessage: true,
        editButtonDisabled: true
      };
      break;
    case ADD_LOB_START:
      state = {
        ...state,
        error:"",
        successMessage:""
      };
      break;

    case ADD_LOB_SUCCESS:
      state = {
        ...state,
        totalDocs:state.totalDocs + 1,
        loading:false,
        docs:action.payload ? [...state.docs, action.payload] : [...state.docs],
        disableAddButton:true,
        successMessage:true
      };
      break;
      
    case ADD_MODAL_CLEAR:
      state = {
        ...state,
        successMessage:false,
        disableAddButton:false,
        modalClear:true,
      };
      break;
    case "API_ERROR":
      state = {
        ...state,
        error: action.payload.error
      };
      break;
    default:
      state = { ...state };
  }
  return state;
};
export default LOBReducer;