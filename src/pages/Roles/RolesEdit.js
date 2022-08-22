import React, { useEffect, useState } from "react";
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
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);

  const checkboxModel = {};
  role.permissions && Object.keys(role.permissions).map((permKey) => {
    role.permissions[permKey] && Object.keys(role.permissions[permKey]).map((permission) => {
      if (role.permissions && !role.permissions[permKey][permission]) {
        const objKey = `permissions.${permKey}.${permission}`;
        const objValue = isChecked;
        checkboxModel[objKey] = objValue;
      }
    });
  });

  const selectAllRolesHandler = () => {
    if (isChecked) {
      Object.keys(checkboxModel).map((permKey) => {
        Object.keys(checkboxModel[permKey]).map((permission) => {
          const objKey = `permissions.${permKey}.${permission}`;
          const objValue = false;
          checkboxModel[objKey] = objValue;
        });
      });
      setIsChecked(false);
    } else { 
      Object.keys(checkboxModel).map((permKey) => {
        Object.keys(checkboxModel[permKey]).map((permission) => {
          const objKey = `permissions.${permKey}.${permission}`;
          const objValue = true;
          checkboxModel[objKey] = objValue;
        });
      });
      setIsChecked(true);
    }
  };


  const handleAddRole = (e, values) => {
    // if select all is checked then all roles are true when updating
    if (isChecked) {
      Object.keys(values.permissions).forEach((permission) => {
        Object.keys(values.permissions[permission]).forEach((item) => {
          values.permissions[permission][item] = true;
        });
      });
    }

    dispatch(editRole({
      id: role._id,
      values
    }));
  };
  useEffect(()=>{
    if (props.editClearingCounter > 0 && open) {
      onClose();
      setIsChecked(false);
    }
  }, [props.editClearingCounter]);

  return (
    <React.Fragment >
      {/* <Link to="#" className="btn btn-light" onClick={onClose}><i className="bx bx-plus me-1"></i> Add New</Link> */}
      <Modal isOpen={open} toggle={onClose} centered={true} size={"lg"}>
        <ModalHeader toggle={onClose} tag="h4">
            Edit Role
        </ModalHeader>
        <ModalBody >
          <AvForm
            className='p-4'
            onValidSubmit={(e, v) => {
              delete v.selectAllRoles;
              handleAddRole(e, v);
            }}
            model={checkboxModel}
          >
            <div className="mb-3">
              <AvField
                name="title"
                label="Role Title"
                placeholder="Enter Role Title"
                type="text"
                value={role.title}
                errorMessage="Enter Role Title"
                validate={{ required: { value: true } }}
              />
            </div>
            <AvInput 
              type="checkbox" 
              name="selectAllRoles" 
              className="mb-3"
              onClick={selectAllRolesHandler}
            />
            <span className="p-2">
              {
                isChecked &&
                "Unselect all roles"
              }
              {
                !isChecked && 
                "Select all roles"
              }
            </span>
            {role.permissions && Object.keys(role.permissions).map((permKey, permInd) =>
              <div className="mb-3" key={permInd}>
                <h6 className="text-capitalize">{permKey}</h6>
                {role.permissions[permKey] && Object.keys(role.permissions[permKey]).map((permission, permissionInd) =>
                  <React.Fragment key={permissionInd}>
                    <AvInput type="checkbox" trueValue={!isChecked} name={`permissions.${permKey}.${permission}`} value={role.permissions[permKey][permission]} />
                    <span className="p-2">{permission}</span>
                  </React.Fragment>
                )}                     
              </div>
            )}
            <div className='text-center pt-3 p-2'>
              <Button disabled={props.addLoading} type="submit" color="primary" className="">
                Update
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
