import {
  PRODUCTS_START, PRODUCTS_SUCCESSFUL, ADD_PRODUCT_START, ADD_PRODUCT_SUCCESS, EDIT_PRODUCT_SUCCESS, MODAL_CLEAR, API_ERROR 
} from "./actionsTypes";
const initalState = {
  loading: false,
  error: "",
  docs: [],
  successMessage: "",
  modalClear:false,
  disableAddButton:false
};
const LOBReducer = (state = initalState, action) => {
  switch (action.type) {
    case PRODUCTS_START:
      state = {
        ...state,
        loading: true,
        error: ""
      };
      break;
    case PRODUCTS_SUCCESSFUL:
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
    case ADD_PRODUCT_START:
      state = {
        ...state,
        error:"",
        successMessage:false
      };
      break;
  
    case ADD_PRODUCT_SUCCESS:
      state = {
        ...state,
        totalDocs:state.totalDocs + 1,
        loading:false,
        docs:action.payload ? [...state.docs, action.payload] : [...state.docs],
        disableAddButton:true,
        successMessage:true
      };
      
      break;
      
    case EDIT_PRODUCT_SUCCESS:
      console.log(action.payload);
      state = {
        ...state,
        docs: state.docs.map(doc => {
          if (doc._id === action.payload._id) {
            return {
              ...doc,
              ...action.payload, 
            };
          }
          else {
            return doc;
          }
        }),
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
        error: action.payload.error
      };
      break;
    default:
      state = { ...state };
  }
  return state;
};
export default LOBReducer;