const initialState = {
  error:"",
  loading:false,
  emailTemplates:[]
};
  
// the state represents all email templates 
// so if the action is FETCH_EMAIL_TEMPLATES 
// then this is to get all templates for display
// if it's UPDATE_EMAIL_TEMPLATE then it's to update one of them
// and so on
const emailTemplateReducer = (state = initialState, action) => {
  // switch case over types of action 
  // that's not yet defined
  switch (action.type){
    case "FETCH_EMAIL_TEMPLATES":
      state = {
        loading: true,
        error: "",
        emailTemplates: action.payload.emailTemplates
      };
  
      break;
    default:
      // using spread operator to make a copy so I won't break the immutability rule 
      state = { ...state };
  }
  
  return state;
};
  
export default emailTemplateReducer;