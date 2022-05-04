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
  // to make sure it won't take a new step unless the form submission was valid
  const [isEditValid, setIsEditValid] = useState(false);
  const { role = {} } = props.role;
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
            onValidSubmit={(v) => {
              handleSystemEmailEdit(v);
              // switch isEditValid to true so the system could move on to the next step
              setIsEditValid(true);
            }}
          >
            {/* TODO check the logic so it loads the correct title and action */}
            <div className="mb-3">
              {/* TODO check the placeholder and the value */}
              <AvField
                name="System email Title"
                id="System email Title"
                label="System email Title"
                placeholder="System email title"
                type="text"
                // TODO the value should be something like result.
                value={props.title}
                errorMessage="System email title is required"
                validate={{ required: { value: true } }}
              />
            </div>

            {/* TODO check the logic so it loads the correct title and action */}
            <div className="mb-3">
              {/* TODO check the placeholder and the value */}
              <AvField
                name="action"
                label="System email action"
                placeholder="System email action"
                type="text"
                value={props.action}
                errorMessage="System email title is required"
                validate={{ required: { value: true } }}
              />
            </div>

            {/* available language dropdown */}
            <div className="mb-3">
              {/* TODO check the default placeholder */}
              <AvField
                name="available langauges"
                label="available languages"
                placeholder="available languages"
                type="select"
                errorMessage="Language is required"
                validate={{ required: { value: true } }}
              >
                {/* TODO these options should be availabe languages returned from the backend */}
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </AvField>
            </div>

            {/* content */}
            <div className="mb-3">
              {/* TODO check if this field can be an editor if not it's OK */}
              <AvField
                name="content"
                label="System email content"
                placeholder="System email content"
                type="editor"
                errorMessage="Content is required"
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
              <Button disabled={props.addLoading} type="submit" color="primary" onClick={() => {isEditValid && props.switchActiveComponent()}}>
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