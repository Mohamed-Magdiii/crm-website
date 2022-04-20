import React, { useEffect } from "react";
import {
  useDispatch, connect
} from "react-redux";
import {
  Modal, Button,
  ModalHeader,
  ModalBody,
  UncontrolledAlert, 
} from "reactstrap";
import {
  AvForm, AvField
} from "availity-reactstrap-validation";
import { editUser } from "store/users/actions";


function UsersEditModal(props) {
  const { open, user = {}, onClose, usersRoles } = props;
  const { _id, title } = user.roleId || "";

  const dispatch = useDispatch();
  // console.log(usersRoles);
  const handleEditUser = (e, values) => { 
    dispatch(editUser({
      id: user._id,
      values
    }));
  };
  useEffect(() => {
    if (props.editClearingCounter > 0 && open) {
      onClose();
    }
  }, [props.editClearingCounter]);

  return (
    <React.Fragment >
      {/* <Link to="#" className="btn btn-light" onClick={onClose}><i className="bx bx-plus me-1"></i> Add New</Link> */}
      <Modal isOpen={open} toggle={onClose} centered={true}>
        <ModalHeader toggle={onClose} tag="h4">
          Edit User
        </ModalHeader>
        <ModalBody >
          <AvForm
            className='p-4'
            onValidSubmit={(e, v) => {
              handleEditUser(e, v);
            }}
          >
            <div className="mb-3">
              <AvField
                name="firstName"
                label="Frist Name  "
                placeholder="Frist Name"
                type="text"
                errorMessage="Enter Frist Name"
                value={user.firstName}
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
                value={user.lastName}
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
                value={user.email}
              />
            </div>
            <div className="mb-3">
              <label >Role</label>
              <AvField
                type="select"
                name="roleId"
                value={_id}
              > 
                <option value={_id}>{title}</option>
                {usersRoles?.map((row) => {
                  // console.log("edit modal"); 
                  return (<option key={row._id} value={row._id}>{row.title}</option>);
                })}
                {/* <option value="hkkhj">select</option>
                <option>624ec3f8a32d3c13fcedcdb8</option>
                <option>3</option> */}
              </AvField> 
            </div>
            <div className='text-center p-5'>
              <Button type="submit" color="primary" className="">
                Edit User
              </Button>
            </div>
          </AvForm>
          {props.editError && <UncontrolledAlert color="danger">
            <i className="mdi mdi-block-helper me-2"></i>
            {props.editError}
          </UncontrolledAlert>}
          {props.editResult && <UncontrolledAlert color="success">
            <i className="mdi mdi-check-all me-2"></i>
            Role Updated successfully !!!
          </UncontrolledAlert>}
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}


const mapStateToProps = (state) => ({
  addLoading: state.usersReducer.addLoading,
  editResult: state.usersReducer.editResult,
  editError: state.usersReducer.editError,
  editClearingCounter: state.usersReducer.editClearingCounter,
});
export default connect(mapStateToProps, null)(UsersEditModal);
