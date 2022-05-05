import React, { useState } from "react";
import { useDispatch, connect } from "react-redux";
import {
  Button,
  UncontrolledAlert,
} from "reactstrap";
import {
  AvForm, AvField, AvInput
} from "availity-reactstrap-validation";

import { editSystemEmail } from "store/systemEmail/actions";

function SystemEmailEdit(props){
  const [isEditValid, setIsEditValid] = useState(false);
  const role = props.role;
  const dispatch = useDispatch();
  const handleSystemEmailEdit = (values) => {
    dispatch(editSystemEmail({
      id: role._id,
      values
    }));
  };

  return (
    <React.Fragment >
      <div className="page-content">
        <div className="container-fluid">
          <h2>Edit system email</h2>
          <AvForm
            className='p-4'
            onValidSubmit={(e, v) => {
              handleSystemEmailEdit(e, v);
              props.switchComponents();
            }}
          >
            <div className="mb-3">
              <AvField
                name="title"
                id="System email Title"
                label="System email Title"
                placeholder="System email title"
                type="text"
                value={role.title}
                errorMessage="System email title is required"
                validate={{ required: { value: true } }}
              />
            </div>

            <div className="mb-3">
              <AvField
                name="action"
                label="System email action"
                placeholder="System email action"
                type="text"
                value={role.title}
                errorMessage="System email title is required"
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
              <Button disabled={props.addLoading} type="submit" color="primary">
                  Update system email
              </Button>
            </div>
          </AvForm>
        </div>
      </div>
      {props.editError && <UncontrolledAlert color="danger">
        <i className="mdi mdi-block-helper me-2"></i>
        {props.editError}
      </UncontrolledAlert>}
      {props.editResult && <UncontrolledAlert color="success">
        <i className="mdi mdi-check-all me-2"></i>
          System Email Updated successfully !!!
      </UncontrolledAlert>}
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  addLoading: state.systemEmailsReducer.addLoading,
  editResult: state.systemEmailsReducer.editResult,
  editError: state.systemEmailsReducer.editError
});

export default connect(mapStateToProps, null)(SystemEmailEdit);