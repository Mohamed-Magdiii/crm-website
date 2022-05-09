// a modal to only edit title and action
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

import { editSystemEmail } from "store/systemEmail/actions";

function SystemEmailEditModal(props){
  const { open, role = {}, onClose } = props;
  const dispatch = useDispatch();
  const handleEditSystemEmail = (e, values) => {
    dispatch(editSystemEmail({
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
      <Modal isOpen={open} toggle={onClose} centered={true}>
        <ModalHeader toggle={onClose} tag="h4">
            Edit System Email
        </ModalHeader>
        <ModalBody >
          <AvForm
            className='p-4'
            onValidSubmit={(e, v) => {
              handleEditSystemEmail(e, v);
              props.systemEmailUpdatedHandler();
            }}
          >
            <div className="mb-3">
              <AvField
                name="title"
                label="System Email Title"
                placeholder="System Email Title"
                type="text"
                value={role.title}
                errorMessage="Enter System Email Title"
                validate={{ required: { value: true } }}
              />
            </div>

            <div className="mb-3">
              <AvField
                name="action"
                label="System Email action"
                placeholder="System Email action"
                type="text"
                value={role.action}
                errorMessage="Enter System Email action"
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
            {/* submit button */}
            <div className='text-center pt-3 p-2'>
              <Button disabled={props.addLoading} type="submit" color="primary">
                Update system email
              </Button>
            </div>
            {/* more details button leads to the edit page */}
            <div className='text-center pt-3 p-2'>
              <Button disabled={props.addLoading} type="button" color="primary" onClick={() => {props.switchComponents(); onClose()}}>
                More details
              </Button>
            </div>
          </AvForm>
          {props.editError && <UncontrolledAlert color="danger">
            <i className="mdi mdi-block-helper me-2"></i>
            {props.editError}
          </UncontrolledAlert>}
          {props.editResult && <UncontrolledAlert color="success">
            <i className="mdi mdi-check-all me-2"></i>
            {/* TODO check the error and success messages not showing */}
            System Email Updated successfully !!!
          </UncontrolledAlert>}
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}


const mapStateToProps = (state) => ({
  addLoading: state.systemEmailsReducer.addLoading,
  editResult: state.systemEmailsReducer.editResult,
  editError: state.systemEmailsReducer.editError,
  editClearingCounter: state.systemEmailsReducer.editClearingCounter  
});

export default connect(mapStateToProps, null)(SystemEmailEditModal);
