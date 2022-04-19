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


function UsersAddModal(props) {
  const [addModal, setAddUserModal] = useState(false);
  const dispatch = useDispatch();
  const { usersRoles } = props;

  const toggleAddModal = () => {
    setAddUserModal(!addModal);
  };
  const handleAddUser = (e, values) => {
    dispatch(addUser(values));
  };

  useEffect(() => {
    if (props.clearingCounter > 0 && addModal) {
      setAddUserModal(false);
    }
  }, [props.clearingCounter]);

  return (
    <React.Fragment >
      <Link to="#" className="btn btn-light" onClick={toggleAddModal}><i className="bx bx-plus me-1"></i> Add New</Link>
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
                placeholder="Frist Name"
                type="text"
                errorMessage="Enter Frist Name"
                validate={{ required: { value: true } }}
              />
            </div>
            <div className="mb-3">
              <AvField
                name="lastName"
                label="Last Name  "
                placeholder="Last Name"
                type="text"
                errorMessage="Enter Last Name"
                validate={{ required: { value: true } }}
              />
            </div>
            <div className="mb-3">
              <AvField
                name="email"
                label="Email"
                placeholder="Enter Valid Email"
                type="email"
                errorMessage="Invalid Email"
                validate={{
                  required: { value: true },
                  email: { value: true },
                }}
              />
            </div>
            <div className="mb-3">
              <Label>Password</Label>
              <AvField
                name="password"
                type="password"
                placeholder="Password"
                errorMessage="Enter password"
                validate={{ required: { value: true } }}
              />
            </div>
            <div className="mb-3">
              <label >Role</label>
              <AvField
                type="select"
                name="roleId"
              >
                <option>select</option> 
                {usersRoles?.map((row) => {
                  return (<option key={row._id} value={row._id}>{row.title}</option>);
                })} 
              </AvField> 
            </div>
            <div className='text-center p-5'>
              <Button type="submit" color="primary" className="">
                Add New User
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
});
export default connect(mapStateToProps, null)(UsersAddModal);
