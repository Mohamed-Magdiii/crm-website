import React, { useState, useEffect } from "react";
import {
  Link
} from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import {
  Modal, Button, ModalHeader, ModalBody, UncontrolledAlert 
} from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";

import {  addSystemEmail } from "store/systemEmail/actions";
// i18n
import { withTranslation } from "react-i18next";

function SystemEmailAdd(props){
  const [addModal, setAddModal] = useState(false);
  const dispatch = useDispatch();
  const handleAddSystemEmail = (e, values) => {
    dispatch(addSystemEmail(values));
  };
  const toggleAddModal = () => {
    setAddModal(!addModal);
  };
  useEffect(()=>{
    if (props.clearingCounter > 0 && addModal) {
      props.switchComponents();
      setAddModal(false);
    }
  }, [props.clearingCounter]);
  
  return (
    <React.Fragment >
      <Link to="#" className="btn btn-light" onClick={toggleAddModal}>
        <i className="bx bx-plus me-1"></i> {props.t("Add new")} 
      </Link>
      <Modal isOpen={addModal} toggle={toggleAddModal} centered={true}>
        <ModalHeader toggle={toggleAddModal} tag="h4">
          {props.t("Add new system email")} 
        </ModalHeader>
        <ModalBody >
          <AvForm
            className='p-4'
            onValidSubmit={(e, v) => {
              handleAddSystemEmail(e, v);
            }}
          >
            <div className="mb-3">
              <AvField
                name="title"
                label={props.t("Title")}
                placeholder={props.t("Title")}
                type="text"
                errorMessage={props.t("Title is required")}
                validate={{ required: { value: true } }}
              />
            </div>
            <div className="mb-3">
              <AvField
                name="action"
                label={props.t("Action")}
                placeholder={props.t("Action")}
                type="text"
                errorMessage={props.t("Action is required")}
                validate={{ required: { value: true } }}
              />
            </div>
            <div className='text-center pt-3 p-2'>
              {/* on clicking this button it switches from the list component to the edit component if 
                  submission is valid but it adds the new system email to the db onValidSubmit above */}
              <Button disabled={props.addLoading} type="submit" color="primary">
                {props.t("Next")}
              </Button>
            </div>
          </AvForm>
          {props.addError && <UncontrolledAlert color="danger">
            <i className="mdi mdi-block-helper me-2"></i>
            {/* TODO this needs to be handled in translation */}
            {props.t(JSON.stringify(props.addErrorDetails))}
          </UncontrolledAlert>}
          {props.addSuccess && <UncontrolledAlert color="success">
            <i className="mdi mdi-check-all me-2"></i>
            {props.t("First step completed successfully")} !!!
          </UncontrolledAlert>}
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  addLoading: state.systemEmailsReducer.addLoading,
  addErrorDetails: state.systemEmailsReducer.addErrorDetails,
  addSuccess: state.systemEmailsReducer.addSuccess,
  addError: state.systemEmailsReducer.addError,  
  clearingCounter: state.systemEmailsReducer.clearingCounter,
  activeComponentProp: state.systemEmailsReducer.activeComponentProp
});

export default connect(mapStateToProps, null)(withTranslation()(SystemEmailAdd));