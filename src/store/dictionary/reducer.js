const initialState = {
  dictionary:[],
  loading:false,
  actions:[],
  exchanges:[],
  emailProviders:[],
  countries:[],
  error:"",
  id:""
};
const dictionaryReducer = (state = initialState, action)=>{
  switch (action.type){
    case "FETCH_DICTIONARY_START":
      state = {
        ...state,
        loading:true,
        error:""
      };
      break; 
    case "FETCH_DICTIONARY_SUCCESS":
      state = {
        ...state,
        dictionary:[...action.payload],
        actions:[...action.payload[0].actions],
        emailProviders : [...action.payload[0].emailProviders],
        countries: [...action.payload[0].countries],
        exchanges: [...action.payload[0].exchanges],
        id:action.payload[0]._id,
        loading:false,
        
      };
      break;
    case "API_ERROR":
      state = {
        ...state,
        error:action.payload.error

      };
      break;
    default :
      state = { ...state };
  }
  return state;
};
export default dictionaryReducer;