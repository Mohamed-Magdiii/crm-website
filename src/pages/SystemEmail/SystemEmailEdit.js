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

import { editSystemEmailContent } from "store/systemEmail/actions";

function SystemEmailEdit(props){
  // TODO check if it's OK to do this step manual with a dic if not figure it out
  const readableLanguages = {
    "ar-ae": "Arabic",
    "en-gb": "English"
  };
  const role = props.role;
  
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

  // an effect to switch components from list to edit only if the data was submitted successfully
  // useEffect(() => {
  //   props.switchComponents();
  // }, [props.editContentClearingCounter]);
  // console.log(props.editContentClearingCounter);
  // console.log(props.editContentResult);

  return (
    <React.Fragment >
      <div className="page-content">
        <div className="container-fluid">
          <h2>Advanced system email edit</h2>
          <AvForm
            className='p-4'
            onValidSubmit={(e, v) => {
              handleSystemEmailEdit(e, v);
              // TODO this method of switching components makes it impossible to 
              // show success or error messages as in switches components from edit to 
              // listing almost immediately so this needs to be handled again 
              // switch components from edit to list
              props.systemEmailUpdatedHandler();
              props.switchComponents();
            }}
          >
            <div className="mb-3">
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

            {/* encapsulated in another form tag to make title and action read only
                they won't be sent with the API like the rest of the fields */}
            {/* <AvForm> */}
            {/* disabled title read only not gonna send title */}
            {/* <div className="mb-3">
                <AvField
                  name="title"
                  label="System email title"
                  placeholder="system email title"
                  type="text"
                  disabled
                  value={role.title}
                  errorMessage="System email subject is required"
                  validate={{ required: { value: true } }}
                />
              </div> */}

            {/* disabled action read only not gonna send action */}
            {/* <div className="mb-3">
                <AvField
                  name="action"
                  label="System email action"
                  placeholder="system email action"
                  type="text"
                  disabled
                  value={role.action}
                  errorMessage="System email subject is required"
                  validate={{ required: { value: true } }}
                />
              </div> */}
            {/* </AvForm> */}

            <div className="mb-3">
              <AvField
                name="subject"
                label="System email subject"
                placeholder="system email subject"
                type="text"
                value={role.content[selectedLanguage].subject}
                errorMessage="System email subject is required"
                validate={{ required: { value: true } }}
              />
            </div>

            <div className="mb-3">
              <AvField
                name="body"
                label="System email content"
                placeholder="system email content"
                type="textarea"
                value={role.content[selectedLanguage].body}
                errorMessage="System email content is required"
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
            {/* submit button */}
            <div className='text-center pt-3 p-2'>
              <Button disabled={props.editLoading} type="submit" color="primary">
                  Update system email
              </Button>
            </div>

            {/* back button */}
            <div className='text-center pt-3 p-2'>
              <Button disabled={props.editLoading} 
                type="button" 
                color="primary" 
                onClick={() => {props.switchComponents()}}
              >
                  Back
              </Button>
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
  activeComponentProp: state.systemEmailsReducer.activeComponentProp
});

export default connect(mapStateToProps, null)(SystemEmailEdit);