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
function CountriesAdd(){
  const [addModal, setAddModal] = useState(false);
  const dispatch = useDispatch();
  const toggleAddModal = ()=>{
    setAddModal(preValue => !preValue);
  };
  return (
    <React.Fragment >
      <Link to="#" className="btn btn-light" onClick={toggleAddModal}><i className="bx bx-plus me-1"></i>Add New Country</Link>
      <Modal isOpen={addModal} toggle={toggleAddModal} centered={true}>
        <ModalHeader toggle={toggleAddModal} tag="h4">
          Add New Country
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
                validate={{ required: { value: true } }}
              />
            </div>
            <div className="mb-3">
              <AvField
                name="alpha3"
                label="Alpha3"
                placeholder="Alpha3"
                type="text"
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
                errorMessage="Enter valid en"
                validate={{ required: { value: true } }}
              />
            </div>
            
            <div className='text-center pt-3 p-2'>
              <Button  type="submit" color="primary" className="">
                     Add New Country
              </Button>
            </div>
          </AvForm>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}
export default CountriesAdd;