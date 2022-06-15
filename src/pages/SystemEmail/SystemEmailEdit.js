// a page to edit system email content (language + subject + body)
import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import {
  Button,
  UncontrolledAlert,
} from "reactstrap";
import {
  AvForm, AvField, AvInput
} from "availity-reactstrap-validation";
import { Editor } from "react-draft-wysiwyg";
import {
  EditorState, convertToRaw, ContentState
} from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

import { editSystemEmailContent, fetchSystemEmailById } from "store/systemEmail/actions";
// i18n
import { withTranslation } from "react-i18next"; 

function SystemEmailEdit(props){
  const readableLanguages = {
    "en-gb": "English",
    "ar-ae": "Arabic"
  };
  // props.systemEmail if it's coming from add modal (systemEmail = new system email)
  // props.role if it's coming from an edit call (pre existing system email)
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

  // fetch system email by id handler to show new updates with every new successful update call 
  const handleSystemEmailFetchById = (e, systemEmailId) => {
    dispatch(fetchSystemEmailById(systemEmailId));
  };

  // rich editor handler 
  const blocksFromHTML = htmlToDraft(role.content[selectedLanguage].body);
  const { contentBlocks, entityMap } = blocksFromHTML;
  const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
  const [editorState, setEditorState] = useState(EditorState.createWithContent(contentState)); 
  
  // an effect to change the value of content with every new update or after changing language
  // to avoid late updates
  useEffect (() => {
    setEditorState(EditorState.createWithContent(contentState));
    
  }, [role, selectedLanguage]);
  
  return (
    <React.Fragment >
      <div className="page-content">
        <div className="container-fluid">
          <h2>{props.t("Advanced edit")}</h2>
          <AvForm
            onValidSubmit={(e, v) => {
              // storing rich text editor content as HTML to it could be sent as an email
              v.body = draftToHtml(convertToRaw(editorState.getCurrentContent()));
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
                label={props.t("Available languages")}
                placeholder={props.t("Available languages")}
                type="select"
                errorMessage={props.t("Language is required")}
                validate={{ required: { value: true } }}
                onChange={changeLanguageHandler}
                value={props.t(selectedLanguage)}
              >
                {availableLanguages.map(availableLanguage => (
                  <option key={availableLanguages.indexOf(availableLanguage)} value={availableLanguage}>
                    {props.t(readableLanguages[availableLanguage])}
                  </option>
                ))}
              </AvField>
            </div>

            <div className="col-sm-8">
              <AvField
                name="subject"
                label={props.t("Subject")}
                placeholder={props.t("Subject")}
                type="text"
                value={role.content[selectedLanguage].subject}
                errorMessage={props.t("Subject is required")}
                validate={{ required: { value: true } }}
              />
            </div>

            <div className="col-sm-8">
              <label>{props.t("Content")}</label>
              {/* draft.js editor component */}  
              <Editor
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                editorState={editorState}
                onEditorStateChange={setEditorState}
                placeholder={props.t("Content")}
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

            <div className="d-flex justify-content-end col-sm-8 mt-3">
              {/* submit button */}
              <div className="p-2">
                <Button 
                  // the editorState check is added to make sure that the user has entered a content
                  disabled={props.editLoading || !editorState.getCurrentContent().getPlainText()}  
                  type="submit" 
                  color="primary"
                >
                  {props.t("Update")}
                </Button>
              </div>

              {/* back button */}
              <div className="p-2">
                <Button disabled={props.editLoading || !props.isBackButtonActive} 
                  type="button" 
                  color="primary" 
                  onClick={() => {props.switchComponents(); props.systemEmailUpdatedHandler()}}
                >
                  {props.t("Back")}
                </Button>
              </div>
            </div>
            {props.editContentError && <UncontrolledAlert color="danger" className="col-sm-8">
              <i className="mdi mdi-block-helper me-2"></i>
              {/* TODO this need to be handled in translation */}
              {props.t(props.editContentError)}
            </UncontrolledAlert>}
            {props.editContentResult && <UncontrolledAlert color="success" className="col-sm-8">
              <i className="mdi mdi-check-all me-2"></i>
              {props.t("System email updated successfully")} !!!
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
  systemEmail: state.systemEmailsReducer.systemEmail,
  isBackButtonActive: state.systemEmailsReducer.isBackButtonActive
});

export default connect(mapStateToProps, null)(withTranslation()(SystemEmailEdit));