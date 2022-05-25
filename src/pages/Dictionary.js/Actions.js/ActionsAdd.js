import { useDispatch, connect } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  UncontrolledAlert,
  Col,
  Row
} from "reactstrap";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
function ActionsAdd(){
  const [addModal, setAddModal] = useState(false);
  const dispatch = useDispatch();
  const toggleAddModal = ()=>{
    setAddModal(preValue => !preValue);
  };
  return (
    <React.Fragment >
      <Link to="#" className="btn btn-light" onClick={toggleAddModal}><i className="bx bx-plus me-1"></i>Add New Action</Link>
      <Modal isOpen={addModal} toggle={toggleAddModal} centered={true}>
        <ModalHeader toggle={toggleAddModal} tag="h4">
          Add New Action
        </ModalHeader>
        <ModalBody >
          <AvForm
            className='p-4'
            onValidSubmit={(e, v) => {
              e.preventDefault();
            }}
          >
            
            
            <div className="mb-3">
              <AvField
                name="actions"
                label="Actions"
                placeholder="Actions"
                type="text"
                errorMessage="Enter valid action"
                validate={{ required: { value: true } }}
              />
            </div>
              
            
            <div className='text-center pt-3 p-2'>
              <Button  type="submit" color="primary" className="">
                     Add new Action
              </Button>
            </div>
          </AvForm>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}
export default ActionsAdd;