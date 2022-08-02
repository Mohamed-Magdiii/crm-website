import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import {
  Modal,
  Button,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { emailToResetPasswordStart } from "store/client/actions";

function resetPassword(props){
  const [addModal, setAddModal] = useState(false);
  const toggleAddModal = ()=>{
    setAddModal(!addModal);
  };
  const dispatch = useDispatch();
  const handleChangePassword = (e, values)=>{
    dispatch(emailToResetPasswordStart(values));
  };
  useEffect(()=>{
    if (props.clearResetPasswordModal && addModal){
      setAddModal(false);
    }
  }, [props.clearResetPasswordModal]);
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
            
            <AvField 
              type="email" 
              label="Client Email"
              name="email"
              validate= {{
                required: { value : true }, 
              }
              }
            />
            <div className="text-center p-2">
              <Button type="submit" disabled= {props.disableResetPasswordButton} color="primary">Send Email</Button>
            </div>
           
          </AvForm>
        </ModalBody>
      </Modal>
    </React.Fragment>
    
  );
}
const mapStateToProps = (state)=>(
  {
    clearResetPasswordModal: state.clientReducer.clearResetPasswordModal,
    disableResetPasswordButton : state.clientReducer.disableResetPasswordButton
  }
)
  
;
export default connect(mapStateToProps, null)(resetPassword);