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
    case "ADD_ITEM_TO_ACTIONS":
      state = {
        ...state,
        actions:[...state.actions, ...action.payload]
      };
      break;
    case "ADD_ITEM_TO_EXCHANGES":
      state = {
        ...state,
        exchanges:[...state.exchanges, ...action.payload]
      };
      break;
    case "ADD_ITEM_TO_EMAIL_PROVIDERS":
      state = {
        ...state,
        emailProviders:[...state.emailProviders, ...action.payload]
      };
      break;
    case "ADD_ITEM_TO_COUNTRIES":
      state = {
        ...state,
        countries:[...state.countries, ...action.payload]
      };
      break;
    case "REMOVE_ITEM":
      state = {
        ...state,
        deleteLoading :true
      };
      break;
    case "REMOVE_ITEM_FROM_EMAIL_PROVIDERS":
      
      state = {
        ...state,
        emailProviders:state.emailProviders.filter(emailProviders=> emailProviders !== action.payload[0])
      };
      break;
    case "REMOVE_ITEM_FROM_ACTIONS":
      console.log("inside reducer");
      state = {
        ...state,
        actions:state.actions.filter(actions=>actions !== action.payload[0])
      };
      break;
    case "REMOVE_ITEM_FROM_EXCHANGES":
      state = {
        ...state,
        exchanges: state.exchanges.filter(exchange=> exchange !== action.payload[0])
      };
      break;
    case "REMOVE_ITEM_FROM_COUNTRIES":
      state = {
        ...state,
        countries : state.countries.filter(country=>country._id !== action.payload[0]._id)
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