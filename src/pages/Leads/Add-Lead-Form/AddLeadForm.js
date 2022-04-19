
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

import { Link } from "react-router-dom";
import React, { useState, useEffect} from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";

import { addNewLead} from "../../../store/leads/actions";
import CountryDropDown from "./country-dropdown.component";
function LeadForm(props){
  const dispatch = useDispatch();
  
  const handleAddLead = (event, values)=>{
     
    event.preventDefault();
    dispatch(addNewLead(values));
   
  }; 
  const [addModal, setAddUserModal] = useState(false);
  const toggleAddModal = () => {
    setAddUserModal(!addModal);
  };
  useEffect(()=>{
    if (props.successMessage && addModal) {
      setAddUserModal(false);
    }
  }, [props.successMessage]);
  return (
      
    <React.Fragment >
      <Link to="#" className="btn btn-light" onClick={toggleAddModal}><i className="bx bx-plus me-1"></i> Add New</Link>
      <Modal isOpen={addModal} toggle={toggleAddModal} centered={true}>
        <ModalHeader toggle={toggleAddModal} tag="h4">
          Add New Lead
        </ModalHeader>
        <ModalBody >
          <AvForm
            className='p-4'
            onValidSubmit={(e, v) => {
              handleAddLead(e, v);
            }}
          >
            <Row>
              <Col md="6">
                <div className="mb-3">
                  <AvField
                    name="firstName"
                    label="First Name"
                    placeholder="First Name"
                    type="text"
                    errorMessage="Enter First Name"
                    validate={{ required: { value: true } }}
                  />
                </div>
              </Col>
              <Col md="6"> 
                <div className="mb-3">
                  <AvField
                    name="lastName"
                    label="Last Name"
                    placeholder="Last Name"
                    type="text"
                    errorMessage="Enter Last Name"
                    validate={{ required: { value: true } }}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <div className="mb-3">
                  <AvField
                    name="email"
                    label="Email"
                    placeholder="Email"
                    type="email"
                    errorMessage="Enter Email"
                    validate={{ required: { value: true } }}
                  />
                </div>
              </Col>
              <Col md="6">
                <div className="mb-3">
                  <AvField
                    name="phone"
                    label="Phone"
                    placeholder="Phone"
                    type="text"
                    errorMessage="Enter valid phone"
                    validate={{ required: { value: true } }}
                  />
                </div>
              </Col>
            </Row> 
            <div className="mb-3">
              <AvField
                name="password"
                label="Password"
                placeholder="Password"
                type="text"
                errorMessage="Enter valid password"
                validate={{ required: { value: true } }}
              />
            </div>
            <div className="mb-3">
              <CountryDropDown/>
            </div>

            <div className='text-center pt-3 p-2'>
              <Button  type="submit" color="primary" className="">
                    Add New Lead
              </Button>
            </div>
          </AvForm>
          {props.error && <UncontrolledAlert color="danger">
            <i className="mdi mdi-block-helper me-2"></i>
            {props.error}
          </UncontrolledAlert>}
          {props.successMessage && <UncontrolledAlert color="success">
            <i className="mdi mdi-check-all me-2"></i>
              Lead Added successfully !!!
          </UncontrolledAlert>}
        </ModalBody>
      </Modal>
    </React.Fragment>
  );

}
const mapStateToProps = (state) => ({
  error: state.leadReducer.error,
  successMessage: state.leadReducer.successMessage,
    
});
export default connect(mapStateToProps, null)(LeadForm);