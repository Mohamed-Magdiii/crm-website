import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  useDispatch, connect
} from "react-redux";
import {
  Modal, Button,
  ModalHeader,
  Label,
  ModalBody,
  UncontrolledAlert,
} from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { addUser } from "store/users/actions";
// import { sassFalse } from "sass";

function UsersAddModal(props) {
  const [addModal, setAddUserModal] = useState(false);
  const [submitState, setSubmitState] = useState(false);
  const [duplicatedEmail, setDuplicatedEmail] = useState(false);
  const dispatch = useDispatch();
  const { usersRoles } = props;
  const { create } = props.userPermissions;
  const toggleAddModal = () => {
    setAddUserModal(!addModal);
    setDuplicatedEmail(false);
  };
  const handleAddUser = (e, values) => {
    setSubmitState(true);
    dispatch(addUser(values));
    setTimeout(() => {
      setSubmitState(false);
    }, 2500);

  };

  const emailErrorStyle = duplicatedEmail ? "1px solid red" : "1px solid rgb(200, 200, 200)";

  const repeatedEmailCheck = (e) => {
    e.target?.value?.length > 0 &&
    setDuplicatedEmail(props.allUsersEmails?.includes(e.target.value?.trim()));
  };

  useEffect(() => {
    if (props.clearingCounter > 0 && addModal) {
      setTimeout(() => {
        setAddUserModal(false);
        setDuplicatedEmail(false);
      }, 1000);
    }
  }, [props.addSuccess]);

  return (
    <React.Fragment >
      <Link to="#" className={`btn btn-primary ${!create ? "d-none" : ""}`} onClick={toggleAddModal}><i className="bx bx-plus me-1"></i> Add New User</Link>
      <Modal isOpen={addModal} toggle={toggleAddModal} centered={true}>
        <ModalHeader toggle={toggleAddModal} tag="h4">
          Add New User
        </ModalHeader>
        <ModalBody >
          <AvForm
            className='p-4'
            onValidSubmit={(e, v) => {
              handleAddUser(e, v);
            }}
          >
            <div className="mb-3">
              <AvField
                name="firstName"
                label="Frist Name  "
                placeholder="Enter First Name"
                type="text"
                errorMessage="Enter Frist Name"
                validate={{ required: { value: true } }}
              />
            </div>
            <div className="mb-3">
              <AvField
                name="lastName"
                label="Last Name  "
                placeholder="Enter Last Name "
                type="text"
                errorMessage="Enter Last Name"
                validate={{ required: { value: true } }}
              />
            </div>
            <div className="mb-3">
              <AvField
                name="email"
                label="Email"
                placeholder="Enter Email"
                type="email"
                errorMessage="Enter Valid Email"
                onChange={repeatedEmailCheck}
                validate={{
                  required: { value: true },
                  email: { value: true },
                }}
                style={{
                  border: `${emailErrorStyle}`
                }}
              />
              {duplicatedEmail && <span className="text-danger">This email is already in use</span>}
            </div>
            <div className="mb-3">
              <Label>Password</Label>
              <AvField
                name="password"
                type="password"
                placeholder="Password"
                errorMessage="Enter password"
                validate= {{
                  required: { value : true },
                  minLength: {
                    value: 6,
                    errorMessage: "Your Password must be more than 6 characters"
                  },
                  pattern :{  
                    value:"^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])",
                    errorMessage :"Password Must contain at least one number and Capital and special characters"
                  }
                  
                }}
              />
            </div>
            <div className="mb-3">
              <label >Select Role </label>
              <AvField
                type="select"
                name="roleId"
                errorMessage="please select role"
                validate={{ required: { value: true } }}
              >
                <option value="">select Role</option>
                {usersRoles?.map((row) => {
                  return (<option key={row._id} value={row._id}>{row.title}</option>);
                })}
              </AvField>
            </div>
            <div className='text-center'>
              <Button type="submit" color="primary" className="" disabled={submitState}>
                Add 
              </Button>
            </div>
          </AvForm>
          {props.addError && <UncontrolledAlert color="danger">
            <i className="mdi mdi-block-helper me-2"></i>
            {props.addErrorDetails}
          </UncontrolledAlert>}
          {props.addSuccess && <UncontrolledAlert color="success">
            <i className="mdi mdi-check-all me-2"></i>
            Role Added successfully !!!
          </UncontrolledAlert>}
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}


const mapStateToProps = (state) => ({
  addLoading: state.usersReducer.addLoading,
  addErrorDetails: state.usersReducer.addErrorDetails,
  addSuccess: state.usersReducer.addSuccess,
  addError: state.usersReducer.addError,
  clearingCounter: state.usersReducer.clearingCounter,
  userPermissions: state.Profile.userPermissions
});
export default connect(mapStateToProps, null)(UsersAddModal);
