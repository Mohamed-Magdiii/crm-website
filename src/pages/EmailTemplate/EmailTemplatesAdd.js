import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import {
  Modal, Button, ModalHeader, ModalBody, UncontrolledAlert 
} from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";

import {  addEmailTemplate } from "store/emailTemplate/actions";

function EmailTemplateAdd(props){
  const [addModal, setAddModal] = useState(false);
  const dispatch = useDispatch();
  const toggleAddModal = () => {
    setAddModal(!addModal);
  };
  const handleAddEmailTemplate = (values) => {
    dispatch(addEmailTemplate(values));
  };
  
  return (
    <React.Fragment >
      <Link to="#" className="btn btn-light" onClick={toggleAddModal}><i className="bx bx-plus me-1"></i> Add New</Link>
      <Modal isOpen={addModal} toggle={toggleAddModal} centered={true}>
        <ModalHeader toggle={toggleAddModal} tag="h4">
            Add New Email Template
        </ModalHeader>
        <ModalBody >
          <AvForm
            className='p-4'
            onValidSubmit={(v) => {
              handleAddEmailTemplate(v);
            }}
          >
            <div className="mb-3">
              <AvField
                name="Content"
                label="Email template content"
                placeholder="Email template content"
                type="text"
                errorMessage="Enter the email template content"
                validate={{ required: { value: true } }}
              />
            </div>
            <div className='text-center pt-3 p-2'>
              <Button disabled={props.addLoading} type="submit" color="primary" className="">
                Add New Email template
              </Button>
            </div>
          </AvForm>
          {props.addError && <UncontrolledAlert color="danger">
            <i className="mdi mdi-block-helper me-2"></i>
            {props.addErrorDetails}
          </UncontrolledAlert>}
          {props.addSuccess && <UncontrolledAlert color="success">
            <i className="mdi mdi-check-all me-2"></i>
            Email template Added successfully !!!
          </UncontrolledAlert>}
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  addLoading: state.emailTemplatesReducer.addLoading,
  addErrorDetails: state.emailTemplatesReducer.addErrorDetails,
  addSuccess: state.emailTemplatesReducer.addSuccess,
  addError: state.emailTemplatesReducer.addError
});

export default connect(mapStateToProps, null)(EmailTemplateAdd);