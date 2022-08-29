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
import { AvForm, AvField } from "availity-reactstrap-validation";
import { editRole } from "store/roles/actions";

function RolesAdd (props) {
  const { open, role = {}, onClose } = props;
  const dispatch = useDispatch();
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);

  // initially setting pre checked roles to true
  useEffect(() => {
    const checkedRoles = [];
    role.permissions && Object.keys(role.permissions).map((permKey) => {
      role.permissions[permKey] && Object.keys(role.permissions[permKey]).map((permission) => {
        if (role.permissions[permKey][permission]){
          checkedRoles.push(`permissions.${permKey}.${permission}`);
        }
      });
    });

    setIsCheck([...checkedRoles]);
  }, [role.permissions]);

  // setting the list (contains all permissions for the selected role) 
  const allRoles = [];
  role.permissions && Object.keys(role.permissions).map((permKey) => {
    role.permissions[permKey] && Object.keys(role.permissions[permKey]).map((permission) => {
      allRoles.push({ name: `permissions.${permKey}.${permission}` });
    });
  });
  
  useEffect(() => {
    setIsCheck(allRoles.map((item) => item.name));
    !isCheckAll && setIsCheck([]);

  }, [isCheckAll]);

  // select any item handler
  const handleClick = e => {
    const { name, checked } = e.target;
    setIsCheck([...isCheck, name]);
    if (!checked) {
      setIsCheck(isCheck.filter(item => item !== name));
    }
  };

  const toggleEditModal = () => {
    onClose();
    setIsCheckAll(false);
  };
  
  const handleAddRole = (e, values) => {
    // assigning checked and unchecked check boxes before submitting
    role.permissions && Object.keys(role.permissions).map((permKey) => {
      role.permissions[permKey] && Object.keys(role.permissions[permKey]).map((permission) => {
        if (isCheck.includes(`permissions.${permKey}.${permission}`)) {
          role.permissions[permKey][permission] = true;
        } else {
          role.permissions[permKey][permission] = false;
        }
      });
    });
    values.permissions = role.permissions;

    dispatch(editRole({
      id: role._id,
      values
    }));
  };

  useEffect(()=>{
    if (props.editClearingCounter > 0 && open) {
      onClose();
      setIsCheckAll(false);
    }
  }, [props.editClearingCounter]);

  return (
    <React.Fragment >
      {/* <Link to="#" className="btn btn-light" onClick={onClose}><i className="bx bx-plus me-1"></i> Add New</Link> */}
      <Modal isOpen={open} toggle={toggleEditModal} centered={true} size={"lg"}>
        <ModalHeader toggle={toggleEditModal} tag="h4">
            Edit Role
        </ModalHeader>
        <ModalBody >
          <AvForm
            className='p-4'
            onValidSubmit={(e, v) => {
              delete v.selectAllRoles;
              handleAddRole(e, v);
            }}
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
            <input 
              type="checkbox"
              name="selectAll"
              id="selectAll"
              onChange={() => {setIsCheckAll(!isCheckAll)}}
              checked={isCheckAll}
            />
            <span className="p-2">
              Select all roles
            </span>
            {role.permissions && Object.keys(role.permissions).map((permKey, permInd) =>
              <div className="mb-3" key={permInd}>
                <h6 className="text-capitalize">{permKey}</h6>
                {role.permissions[permKey] && Object.keys(role.permissions[permKey]).map((permission, permissionInd) =>
                  <React.Fragment key={permissionInd}>
                    <input 
                      type="checkbox" 
                      name={`permissions.${permKey}.${permission}`} 
                      checked={isCheck.includes(`permissions.${permKey}.${permission}`)}
                      onChange={handleClick}
                    />
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
