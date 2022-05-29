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
import { updateExchangeStart } from "store/dictionary/actions";
function ExchangeEdit(props){
  
  const { selectedExchange = {}, onClose, open } = props;
  const dispatch = useDispatch();
  const { exchanges } = selectedExchange;
  return (
    <React.Fragment >

      <Modal isOpen={open} toggle={onClose} centered={true}>
        <ModalHeader toggle={onClose} tag="h4">
          Edit Exchange
        </ModalHeader>
        <ModalBody >
          <AvForm
            className='p-4'
            onValidSubmit={(e, v) => {
              e.preventDefault();
              const { newExchangeValue } = v;
              dispatch(updateExchangeStart({
                body:selectedExchange,
                value:newExchangeValue
              }));
            }}
          >
            
            <div className="mb-3">
              <AvField
                name="newExchangeValue"
                label="Exchange"
                placeholder="Enter Exchange"
                type="text"
                value = {exchanges}
                errorMessage="Enter Valid Exchange "
                validate={{ required: { value: true } }}
              />
            </div>
          
            <div className='text-center pt-3 p-2'>
              <Button  type="submit" color="primary" className="">
                     Edit Exchange
              </Button>
            </div>
          </AvForm>
          {props.error && <UncontrolledAlert color="danger">
            <i className="mdi mdi-block-helper me-2"></i>
            {props.error}
          </UncontrolledAlert>}
          {props.editSuccess && <UncontrolledAlert color="success">
            <i className="mdi mdi-check-all me-2"></i>
             Exchange has been updated successfully!
          </UncontrolledAlert>}
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
  id :state.dictionaryReducer.id,
  editSuccess :state.dictionaryReducer.editSuccess
});
export default connect(mapStateToProps, null)(ExchangeEdit);