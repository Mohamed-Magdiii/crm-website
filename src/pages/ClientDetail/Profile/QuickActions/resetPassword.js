import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import {
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  UncontrolledAlert,  
} from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";


function resetPassword(){
  const [addModal, setAddModal] = useState(false);
  const toggleAddModal = ()=>{
    setAddModal(!addModal);
  };
  const dispatch = useDispatch();
  return (
    <React.Fragment>
      <Link to="#" className="btn btn-primary" onClick={toggleAddModal}>
        <i className="bx me-1"> Reset Password</i>
      </Link>
      <Modal isOpen={addModal} toggle={toggleAddModal} centered={true}>
        <ModalHeader toggle={toggleAddModal} tag="h4">
           Reset Password
        </ModalHeader>
        <ModalBody>
          <AvForm
            className="p-4"
            onValidSubmit={ (e, v) => {
              
            }}
          >
            <AvField type="text" label = "Old Password" name="oldPassword"/>
            <AvField type="text" label="New Password" name="newPassword"/>
            <Button className="btn btn-primary">Reset Password</Button>
          </AvForm>
        </ModalBody>
      </Modal>
    </React.Fragment>
    
  );
}

export default resetPassword;