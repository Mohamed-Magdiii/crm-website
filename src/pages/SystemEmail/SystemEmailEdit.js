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
import Select from "react-select";
import { useHistory } from "react-router-dom";


// i18n
import { withTranslation } from "react-i18next"; 
import BackConfirmationModal from "components/Common/BackConfirmationModal";
import { editSystemEmailContent, fetchSystemEmailById } from "store/systemEmail/actions";

function SystemEmailEdit(props){
  // two states used to check if subject or content were changed
  const [isSubjectChanged, setIsSubjectChanged] = useState(false);
  const [isContentChanged, setIsContentChanged] = useState(false);
  const [backConfirmationModalState, setBackConfirmationModalState] = useState(false);
  const readableLanguages = {
    "en-gb": "English",
    "ar-ae": "Arabic"
  };
  // props.systemEmail if it's coming from add modal (systemEmail = newly added system email)
  // props.role if it's coming from an edit call (pre existing system email)
  let role = props.systemEmail || props.role;
  
  const availableLanguages = Object.keys(role.content);
  const availableLanguageSelect = availableLanguages.map((availableLanguage) => {
    return (
      {
        value: availableLanguage,
        label: readableLanguages[availableLanguage]
      }
    );
  });
  const languageInitialValue = availableLanguageSelect.find((item) => (
    item.value === "en-gb"
  ));
  const [selectedLanguage, setSelectedLanguage] = useState(languageInitialValue);
  const languageChangeHanlder = (selectedLanguageVar) => {
    setSelectedLanguage(selectedLanguageVar);
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
  const blocksFromHTML = htmlToDraft(role.content[selectedLanguage.value].body);
  const { contentBlocks, entityMap } = blocksFromHTML;
  const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
  const [editorState, setEditorState] = useState(EditorState.createWithContent(contentState)); 
  
  // an effect to change the value of content with every new update or after changing language
  // to avoid late updates
  useEffect (() => {
    setEditorState(EditorState.createWithContent(contentState));
    
  }, [role, selectedLanguage]);

  // subject temp value handler
  const subjectTempInitialValues = availableLanguages.map((item) => (
    {
      language: item,
      tempSubject: ""
    }
  ));
  const [subjectTempValue, setSubjectTempValue] = useState(subjectTempInitialValues);
  const subjectTempValueHandler = (e) => {
    const updatedTempSubject = [];
    for (let item of subjectTempValue){
      if (item.language === selectedLanguage.value){
        item.tempSubject = e.target.value;
        updatedTempSubject.push(item);
      } else {
        updatedTempSubject.push(item);
      }
    }
    setIsSubjectChanged(true);
    setSubjectTempValue(updatedTempSubject);
  };

  // content temp value handler
  const contentTempInitialValues = availableLanguages.map((item) => (
    {
      language: item,
      tempContent: ""
    }
  ));
  const [contentTempValue, setContentempValue] = useState(contentTempInitialValues);
  const contentTempValueHandler = (e) => {
    const blocksFromHTML = htmlToDraft(`<p>${e.blocks[0].text}</p>`);
    const { contentBlocks, entityMap } = blocksFromHTML;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    const editorState = EditorState.createWithContent(contentState); 
    
    const updatedTempContent = [];
    for (let item of contentTempValue){
      if (item.language === selectedLanguage.value){
        item.tempContent = editorState;
        updatedTempContent.push(item);
      } else {
        updatedTempContent.push(item);
      }
    }
    setIsContentChanged(true);
    setContentempValue(updatedTempContent);
  };

  // back button handler
  const history = useHistory();
  const backButtonConfirmationHandler = () => {
    props.editContentClearingCounter === 0 && (isSubjectChanged || isContentChanged)
      ?
      // subject, content or both were updated and 
      // system email wasn't updated successfully yet
      setBackConfirmationModalState(true)
      :
      // no updates were made to subject or content
      history.push("/system-emails");
  };

  // modal back button handler
  const modalBackConfirmationButton = () => {
    history.push("/system-emails");
  };
  
  return (
    <React.Fragment >
      <div className="page-content">
        <div className="container-fluid">
          <h2>{props.t("Advanced edit")}</h2>
          <AvForm
            onValidSubmit={(e, v) => {
              handleSystemEmailEdit(e, v);
              // with every update it fetches the updated values of the system email 
              // to keep fields up to date with database
              handleSystemEmailFetchById(e, role._id);
            }}
          >
            <div className="col-sm-8">
              <label>{props.t("Available languages")}</label>
              <Select
                defaultValue={selectedLanguage}
                options={availableLanguageSelect} 
                onChange={languageChangeHanlder}
              />
              <AvField
                name="language"
                id="Available languages"
                type="text"
                errorMessage={props.t("Enter Language")}
                validate={{ required: { value: true } }}
                value={selectedLanguage.value}
                style={{
                  opacity: 0,
                  height: 0,
                  margin: -8 
                }}
              />
            </div>

            <div className="col-sm-8">
              <AvField
                name="subject"
                label={props.t("Subject")}
                placeholder={props.t("Enter Email Subject")}
                type="text"
                value={
                  role.content[selectedLanguage.value].subject || 
                  subjectTempValue.find((item) => (item.language === selectedLanguage.value)).tempSubject
                }
                errorMessage={props.t("Enter Email Subject")}
                validate={{ required: { value: true } }}
                onChange={subjectTempValueHandler}
              />
            </div>

            <div className="col-sm-8">
              <label>{props.t("Content")}</label>
              {/* draft.js editor component */}  
              <Editor
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                editorState={
                  editorState || 
                  contentTempValue.find((item) => (item.language === selectedLanguage.value)).tempContent
                }
                onEditorStateChange={setEditorState}
                placeholder={props.t("Enter Email Content")}
                onChange={contentTempValueHandler}
              />
              <AvField
                name="body"
                id="body"
                type="text"
                errorMessage={props.t("Enter Email Content")}
                validate={{ required: { value: true } }}
                value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                style={{
                  opacity: 0,
                  height: 0,
                  margin: -8 
                }}
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
                  type="submit" 
                  color="primary"
                >
                  {props.t("Update")}
                </Button>
              </div>

              {/* back button */}
              <div className="p-2">
                <Button 
                  disabled={props.editLoading || !props.isBackButtonActive} 
                  type="button" 
                  color="primary"
                  onClick={backButtonConfirmationHandler} 
                >
                  {props.t("Back")}
                </Button>
              </div>
            </div>
            {<BackConfirmationModal 
              loading={props.editLoading} 
              onBackClick={modalBackConfirmationButton} 
              show={backConfirmationModalState} 
              onCloseClick={()=>{setBackConfirmationModalState(false)}} 
            />}
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