import React, { useState } from "react";
import {
  Link
} from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import {
  Modal, Button, ModalHeader, ModalBody, UncontrolledAlert 
} from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";

import {  addSystemEmail } from "store/systemEmail/actions";

function SystemEmailAdd(props){
  // to make sure it won't take a new step unless the from submission was valid
  const [isAdditionValid, setIsAdditionValid] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const dispatch = useDispatch();
  const handleAddSystemEmail = (values) => {
    dispatch(addSystemEmail(values));
  };
  const toggleAddModal = () => {
    setAddModal(!addModal);
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
              // switch isAdditionValid to true so the system could move on to the next step
              setIsAdditionValid(true);
            }}
          >
            <div className="mb-3">
              <AvField
                name="Title"
                label="System email title"
                placeholder="System email title"
                type="text"
                errorMessage="System email title is required"
                validate={{ required: { value: true } }}
              />
            </div>
            <div className="mb-3">
              <AvField
                name="Action"
                label="System email action"
                placeholder="System email action"
                type="text"
                errorMessage="System email action is required"
                validate={{ required: { value: true } }}
              />
            </div>
            <div className='text-center pt-3 p-2'>
              <Button disabled={props.addLoading} type="submit" color="primary" className="" onClick={isAdditionValid && props.switchComponents()}>
                  Next
              </Button>
            </div>
          </AvForm>

          {props.addError && <UncontrolledAlert color="danger">
            <i className="mdi mdi-block-helper me-2"></i>
            {props.addErrorDetails}
          </UncontrolledAlert>}
          {props.addSuccess && <UncontrolledAlert color="success">
            <i className="mdi mdi-check-all me-2"></i>
            First step completed successfully !!!
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