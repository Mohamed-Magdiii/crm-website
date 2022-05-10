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
      <Link to="#" className="btn btn-light" onClick={toggleAddModal}><i className="bx bx-plus me-1"></i> Add New </Link>
      <Modal isOpen={addModal} toggle={toggleAddModal} centered={true}>
        <ModalHeader toggle={toggleAddModal} tag="h4">
            Add New System Email 
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
                label="System email title"
                placeholder="System email title"
                type="text"
                errorMessage="System email title is required"
                validate={{ required: { value: true } }}
              />
            </div>
            <div className="mb-3">
              <AvField
                name="action"
                label="System email action"
                placeholder="System email action"
                type="text"
                errorMessage="System email action is required"
                validate={{ required: { value: true } }}
              />
            </div>
            <div className='text-center pt-3 p-2'>
              {/* on clicking this button it switches from the list component to the edit component if 
                  submission is valid but it adds the new system email to the db onValidSubmit above */}
              <Button disabled={props.addLoading} type="submit" color="primary">
                  Add content to this system email
              </Button>
            </div>
          </AvForm>
          {props.addError && <UncontrolledAlert color="danger">
            <i className="mdi mdi-block-helper me-2"></i>
            {JSON.stringify(props.addErrorDetails)}
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
  addError: state.systemEmailsReducer.addError,  
  clearingCounter: state.systemEmailsReducer.clearingCounter,
  newSystemEmail: state.systemEmailsReducer.newSystemEmail,
  activeComponentProp: state.systemEmailsReducer.activeComponentProp
});

export default connect(mapStateToProps, null)(SystemEmailAdd);