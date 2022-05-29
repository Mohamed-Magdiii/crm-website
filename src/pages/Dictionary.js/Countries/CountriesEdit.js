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
import { addNewItem } from "store/dictionary/actions";
function CountriesEdit(props){
  const {open, onClose, country = {}} = props;
  const dispatch = useDispatch();
  const {alpha2, alpha3, ar, en, callingCode} = country;
  return (
    <React.Fragment >
      
      <Modal isOpen={open} toggle={onClose} centered={true}>
        <ModalHeader toggle={onClose} tag="h4">
          Edit Country
        </ModalHeader>
        <ModalBody >
          <AvForm
            className='p-4'
            onValidSubmit={(e, v) => {
              e.preventDefault();
            }}
          >
            
            
            <div className="mb-3">
              <AvField
                name="alpha2"
                label="Alpha2"
                placeholder="Alpha2"
                type="text"
                errorMessage="Enter valid alpha2"
                value={alpha2}
                validate={{ required: { value: true } }}
              />
            </div>
            <div className="mb-3">
              <AvField
                name="alpha3"
                label="Alpha3"
                placeholder="Alpha3"
                type="text"
                value = {alpha3}
                errorMessage="Enter valid alpha3"
                validate={{ required: { value: true } }}
              />
            </div>
            <div className="mb-3">
              <AvField
                name="callingCode"
                label="Calling Code"
                placeholder="Calling Code"
                type="text"
                value = {callingCode}
                errorMessage="Enter valid calling code"
                validate={{ required: { value: true } }}
              />
            </div>
            <div className="mb-3">
              <AvField
                name="ar"
                label="Ar"
                placeholder="AR"
                type="text"
                value = {ar}
                errorMessage="Enter valid ar"
                validate={{ required: { value: true } }}
              />
            </div>
            <div className="mb-3">
              <AvField
                name="en"
                label="EN"
                placeholder="en"
                type="text"
                value = {en}
                errorMessage="Enter valid en"
                validate={{ required: { value: true } }}
              />
            </div>
            
            <div className='text-center pt-3 p-2'>
              <Button  type="submit" color="primary" className="">
                     Edit Country
              </Button>
            </div>
          </AvForm>
          {props.error && <UncontrolledAlert color="danger">
            <i className="mdi mdi-block-helper me-2"></i>
            {props.error}
          </UncontrolledAlert>}
          {props.editSuccess && <UncontrolledAlert color="success">
            <i className="mdi mdi-check-all me-2"></i>
              Country has been updated successfully!
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
  id :state.dictionaryReducer.id,
  editSuccess:state.dictionaryReducer.editSuccess
});
export default connect(mapStateToProps, null)(CountriesEdit);