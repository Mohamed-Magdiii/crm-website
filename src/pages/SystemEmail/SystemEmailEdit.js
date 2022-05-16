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

function SystemEmailEdit(props){
  const readableLanguages = {
    "en-gb": "English",
    "ar-ae": "Arabic"
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
          <h2>Advanced system email edit</h2>
          <AvForm
            onValidSubmit={(e, v) => {
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
                label="Available languages"
                placeholder="Available languages"
                type="select"
                errorMessage="System email langauge is required"
                validate={{ required: { value: true } }}
                onChange={changeLanguageHandler}
                value={selectedLanguage}
              >
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
              <label>Content</label>
              {/* draft.js editor component */}  
              <Editor
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                editorState={editorState}
                onEditorStateChange={setEditorState}
                placeholder="Content"
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
                  // the editorState check is added to make sure that the user has entered a content
                  // disabled={props.editLoading || !editorState.getCurrentContent().getPlainText()} 
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
            {props.editContentError && <UncontrolledAlert color="danger" className="col-sm-8">
              <i className="mdi mdi-block-helper me-2"></i>
              {props.editContentError}
            </UncontrolledAlert>}
            {props.editContentResult && <UncontrolledAlert color="success" className="col-sm-8">
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