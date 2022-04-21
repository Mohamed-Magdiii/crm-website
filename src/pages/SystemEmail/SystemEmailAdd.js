import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import {
  Modal, Button, ModalHeader, ModalBody, UncontrolledAlert 
} from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";

import {  addSystemEmail } from "store/systemEmail/actions";

function SystemEmailAdd(props){
  const [addModal, setAddModal] = useState(false);
  const dispatch = useDispatch();
  const toggleAddModal = () => {
    setAddModal(!addModal);
  };
  const handleAddSystemEmail = (values) => {
    dispatch(addSystemEmail(values));
  };
  
  return (
    <React.Fragment >
      <Link to="#" className="btn btn-light" onClick={toggleAddModal}><i className="bx bx-plus me-1"></i> Add New</Link>
      <Modal isOpen={addModal} toggle={toggleAddModal} centered={true}>
        <ModalHeader toggle={toggleAddModal} tag="h4">
            Add New System Email
        </ModalHeader>
        <ModalBody >
          <AvForm
            className='p-4'
            onValidSubmit={(v) => {
              handleAddSystemEmail(v);
            }}
          >
            <div className="mb-3">
              <AvField
                name="Content"
                label="System Email content"
                placeholder="System Email content"
                type="text"
                errorMessage="Enter the system email content"
                validate={{ required: { value: true } }}
              />
            </div>
            <div className='text-center pt-3 p-2'>
              <Button disabled={props.addLoading} type="submit" color="primary" className="">
                Add New System Email
              </Button>
            </div>
          </AvForm>
          {props.addError && <UncontrolledAlert color="danger">
            <i className="mdi mdi-block-helper me-2"></i>
            {props.addErrorDetails}
          </UncontrolledAlert>}
          {props.addSuccess && <UncontrolledAlert color="success">
            <i className="mdi mdi-check-all me-2"></i>
            System Email Added successfully !!!
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
  addError: state.systemEmailsReducer.addError
});

export default connect(mapStateToProps, null)(SystemEmailAdd);