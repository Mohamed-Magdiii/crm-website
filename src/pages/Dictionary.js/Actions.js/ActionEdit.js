import { useDispatch, connect } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  UncontrolledAlert,
  Col,
  Row
} from "reactstrap";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { updateActionStart } from "store/dictionary/actions";
function ActionsEdit(props){
  const { onClose, open, selectedAction = {} } = props;
  const dispatch = useDispatch();
  const { actions } = selectedAction;
  return (
    <React.Fragment >
      
      <Modal isOpen={open} toggle={onClose} centered={true}>
        <ModalHeader toggle={onClose} tag="h4">
          Edit Action
        </ModalHeader>
        <ModalBody >
          <AvForm
            className='p-4'
            onValidSubmit={(e, v) => {
              e.preventDefault();
              const { action } = v;
              dispatch(updateActionStart({
                value:action,
                body:{ ...selectedAction }
              }));
            }}
          >
            
            <div className="mb-3">
              <AvField
                name="action"
                label="Action"
                placeholder="Enter action"
                type="text"
                value = {actions}
                errorMessage="Enter valid action"
                validate={{ required: { value: true } }}
              />
            </div>
          
            <div className='text-center pt-3 p-2'>
              <Button  type="submit" color="primary" className="">
                     Edit Action
              </Button>
            </div>
          </AvForm>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}
const mapStateToProps = (state)=>({
  loading: state.dictionaryReducer.loading || false,
  dictionary: state.dictionaryReducer.dictionary || [],
  error : state.dictionaryReducer.error,
  actions :state.dictionaryReducer.actions || [],
  id :state.dictionaryReducer.id
});
export default connect(mapStateToProps, null)(ActionsEdit);