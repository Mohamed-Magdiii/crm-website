import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Modal,
  Button,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { resetPasswordStart } from "store/client/actions";

function resetPassword(props){
  const [addModal, setAddModal] = useState(false);
  const { clientId } = props;
  const toggleAddModal = ()=>{
    setAddModal(!addModal);
  };
  const dispatch = useDispatch();
  const handleChangePassword = (e, values)=>{
    dispatch(resetPasswordStart({
      id:clientId,
      values
    }));
  };
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
              handleChangePassword(e, v);
            }}
          >
            
            <AvField type="password" label="New Password" name="password"/>
            <Button className="btn btn-primary">Reset Password</Button>
          </AvForm>
        </ModalBody>
      </Modal>
    </React.Fragment>
    
  );
}

export default resetPassword;