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
  AvForm, AvField, AvInput
} from "availity-reactstrap-validation";
import { editRole } from "store/roles/actions";


function RolesAdd (props) {
  const { open, role = {}, onClose } = props;
  const { update } = props.rolesPermissions;
  const dispatch = useDispatch();

  const handleAddRole = (e, values) => {
    dispatch(editRole({
      id: role._id,
      values
    }));
  };
  useEffect(()=>{
    if (props.editClearingCounter > 0 && open) {
      onClose();
    }
  }, [props.editClearingCounter]);

  return (
    <React.Fragment >
      {/* <Link to="#" className="btn btn-light" onClick={onClose}><i className="bx bx-plus me-1"></i> Add New</Link> */}
      <Modal isOpen={open && update} toggle={onClose} centered={true}>
        <ModalHeader toggle={onClose} tag="h4">
            Edit Role
        </ModalHeader>
        <ModalBody >
          <AvForm
            className='p-4'
            onValidSubmit={(e, v) => {
              handleAddRole(e, v);
            }}
          >
            <div className="mb-3">
              <AvField
                name="title"
                label="Role Title"
                placeholder="Role Title"
                type="text"
                value={role.title}
                errorMessage="Enter Role Title"
                validate={{ required: { value: true } }}
              />
            </div>
            {role.permissions && Object.keys(role.permissions).map((permKey, permInd) =>
              <div className="mb-3" key={permInd}>
                <h6 className="text-capitalize">{permKey}</h6>
                {role.permissions[permKey] && Object.keys(role.permissions[permKey]).map((permission, permissionInd) =>
                  <React.Fragment key={permissionInd}>
                    <AvInput type="checkbox" name={`permissions.${permKey}.${permission}`} value={role.permissions[permKey][permission]} />
                    <span className="p-2" >{permission}</span>
                  </React.Fragment>
                )}                     
              </div>
            )}
            <div className='text-center pt-3 p-2'>
              <Button disabled={props.addLoading} type="submit" color="primary" className="">
                Update New Role
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
  addLoading: state.rolesReducer.addLoading,
  editResult: state.rolesReducer.editResult,
  editError: state.rolesReducer.editError,
  editClearingCounter: state.rolesReducer.editClearingCounter,  
  rolesPermissions : state.Profile.rolesPermissions
});
export default connect(mapStateToProps, null)(RolesAdd);
