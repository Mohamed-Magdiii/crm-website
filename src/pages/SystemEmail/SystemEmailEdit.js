// a page to edit system email content (language + subject + body)
import React, { useState } from "react";
import { useDispatch, connect } from "react-redux";
import {
  Button,
  UncontrolledAlert,
} from "reactstrap";
import {
  AvForm, AvField, AvInput
} from "availity-reactstrap-validation";

import { editSystemEmailContent, fetchSystemEmailById } from "store/systemEmail/actions";

function SystemEmailEdit(props){
  // TODO check if it's OK to do this step manual with a dic if not figure it out
  const readableLanguages = {
    "ar-ae": "Arabic",
    "en-gb": "English"
  };
  let role = props.systemEmail || props.role;
  
  const availableLanguages = Object.keys(role.content);
  const [selectedLanguage, setSelectedLanguage] = useState("en-gb");
  const changeLanguageHandler = (e) => {
    setSelectedLanguage(e.target.value);
  };
  const dispatch = useDispatch();
  const handleSystemEmailEdit = (e, values) => {
    dispatch(editSystemEmailContent({
      id: role._id,
      values
    }));
  };

  // fetch system email by id handler
  const handleSystemEmailFetchById = (e, systemEmailId) => {
    dispatch(fetchSystemEmailById(systemEmailId));
  };
  
  return (
    <React.Fragment >
      <div className="page-content">
        <div className="container-fluid">
          <h2>Advanced system email edit</h2>
          <AvForm
            className='p-4'
            onValidSubmit={(e, v) => {
              handleSystemEmailEdit(e, v);
              // with every update it fetches the updated values of the system email 
              // to keep fields up to date with database
              handleSystemEmailFetchById(e, role._id);
            }}
          >
            <div className="col-sm-8">
              <AvField
                name="language"
                id="Available languages"
                label="Available languages"
                placeholder="Available languages"
                type="select"
                errorMessage="System email langauge is required"
                validate={{ required: { value: true } }}
                onChange={changeLanguageHandler}
                value={selectedLanguage}
              >
                {/* TODO the key is done the value prop in option should be 
                    the ar-ae or en-bg and so on but what is shown to the admin should 
                    be the full language name like english or arabic and the value is the one
                    to be sent to the API */}
                {availableLanguages.map(availableLanguage => (
                  <option key={availableLanguages.indexOf(availableLanguage)} value={availableLanguage}>
                    {readableLanguages[availableLanguage]}
                  </option>
                ))}
              </AvField>
            </div>

            <div className="col-sm-8">
              <AvField
                name="subject"
                label="Subject"
                placeholder="Subject"
                type="text"
                value={role.content[selectedLanguage].subject}
                errorMessage="Enter system email subject"
                validate={{ required: { value: true } }}
              />
            </div>

            <div className="col-sm-8">
              <AvField
                name="body"
                label="Content"
                placeholder="Content"
                type="textarea"
                value={role.content[selectedLanguage].body}
                errorMessage="Enter system email content"
                validate={{ required: { value: true } }}
              />
            </div>
            {role.permissions && Object.keys(role.permissions).map((permKey, permInd) =>
              <div className="mb-3" key={permInd}>
                <h6 className="text-capitalize">{permKey}</h6>
                {role.permissions[permKey] && Object.keys(role.permissions[permKey]).map((permission, permissionInd) =>
                  <React.Fragment key={permissionInd}>
                    <AvInput type="checkbox" name={`permissions.${permKey}.${permission}`} value={role.permissions[permKey][permission]} />
                    <span className="p-2" >{permission}</span>
                  </React.Fragment>
                )}                     
              </div>
            )}

            <div className='d-flex justify-content-end col-sm-8 mt-3'>
              {/* submit button */}
              <div className="p-2">
                <Button 
                  disabled={props.editLoading} 
                  type="submit" 
                  color="primary"
                >
                    Update
                </Button>
              </div>
              
              {/* back button */}
              <div className="p-2">
                <Button disabled={props.editLoading || !props.isBackButtonActive} 
                  type="button" 
                  color="primary" 
                  onClick={() => {props.switchComponents(); props.systemEmailUpdatedHandler()}}
                >
                    Back
                </Button>
              </div>
            </div>
            {props.editContentError && <UncontrolledAlert color="danger">
              <i className="mdi mdi-block-helper me-2"></i>
              {props.editContentError}
            </UncontrolledAlert>}
            {props.editContentResult && <UncontrolledAlert color="success">
              <i className="mdi mdi-check-all me-2"></i>
                  System email updated successfully !!!
            </UncontrolledAlert>}
          </AvForm>
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  editLoading: state.systemEmailsReducer.editLoading,
  editContentResult: state.systemEmailsReducer.editContentResult,
  editContentError: state.systemEmailsReducer.editContentError,
  editContentClearingCounter: state.systemEmailsReducer.editContentClearingCounter,
  activeComponentProp: state.systemEmailsReducer.activeComponentProp,
  systemEmail: state.systemEmailsReducer.systemEmail,
  isBackButtonActive: state.systemEmailsReducer.isBackButtonActive
});

export default connect(mapStateToProps, null)(SystemEmailEdit);