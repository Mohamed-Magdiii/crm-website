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
import { updateEmailProviderStart } from "store/dictionary/actions";
function EmailProviderEdit(props){
  const { open, onClose, selectedEmailProvider = {} } = props;
  const dispatch = useDispatch();
  const { emailProviders } = selectedEmailProvider;

  return (
    <React.Fragment >
      
      <Modal isOpen={open} toggle={onClose} centered={true}>
        <ModalHeader toggle={onClose} tag="h4">
          Edit Email Provider
        </ModalHeader>
        <ModalBody >
          <AvForm
            className='p-4'
            onValidSubmit={(e, v) => {
              e.preventDefault();
              const { newEmailProvider } = v;
              dispatch(updateEmailProviderStart({
                body:selectedEmailProvider,
                value:newEmailProvider
              }));
            }}
          >
            
            <div className="mb-3">
              <AvField
                name="newEmailProvider"
                label="Email Provider"
                placeholder="Enter Email Provider"
                type="text"
                value = {emailProviders}
                errorMessage="Enter valid Email Provider"
                validate={{ required: { value: true } }}
              />
            </div>
          
            <div className='text-center pt-3 p-2'>
              <Button  type="submit" color="primary" className="">
                     Edit Email Provider
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
export default connect(mapStateToProps, null)(EmailProviderEdit);