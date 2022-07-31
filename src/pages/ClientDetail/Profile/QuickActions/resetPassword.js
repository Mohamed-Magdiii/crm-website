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
              type="password" 
              label="New Password"
              name="password"
              validate= {{
                required: { value : true },
                pattern :{ 
                  // eslint-disable-next-line no-useless-escape
                  value:"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
                  errorMessage :"Must contain at least eight characters, at least one number and both lower and uppercase letters and special characters"
                }
                
              }
              }
            />
            <div className="text-center p-2">
              <Button type="submit" disabled= {props.disableResetPasswordButton} color="primary">Reset Password</Button>
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