import {
  FETCH_EMAIL_TEMPLATES, FETCH_EMAIL_TEMPLATES_SUCCESS, API_ERROR 
} from "./actionTypes";

export const fetchEmailTemplates = (emailTemplates) => {
  return {
    type: FETCH_EMAIL_TEMPLATES,
    payload: { emailTemplates }
  };
};

export const fetchEmailTemplatesSuccess = (loading) => {
  return {
    type: FETCH_EMAIL_TEMPLATES_SUCCESS,
    payload: { loading }
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: { error }
  };
};


export const fetchEmailTemplateFromApi = (dispatch, setTotalDocs, sizePerPage, currentPage) => {
// this needs to be handled because it's not easy to be sure what it dose it client/actions.js
// but here goes nothing
  fetch(`http://localhost:3001/api/v1/crm/emailTemplates?limit=${sizePerPage}&page=${currentPage}`)
    .then(result => result.json())
    .then(data => {
      dispatch(fetchEmailTemplates(data.result.docs)); // emailTemplates = data.result.docs
      // this is a state that needs to be handled it's not gonna work out most likely  
      // no it's handled in the email.record file initialized and handled 
      setTotalDocs(data.result.totalDocs); 
    }).catch(error => {
      dispatch(error);
    });
};