
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
import React, { useState, useEffect } from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { apiError, addNewLeadSuccess } from "store/leads/actions";
import { addNewLead } from "../../store/leads/actions";
import CountryDropDown from "../../components/Common/CountryDropDown";
import { withTranslation } from "react-i18next";
function LeadForm(props) {

  const [addModal, setAddUserModal] = useState(false);

  const dispatch = useDispatch();
  
  const handleAddLead = (event, values)=>{
    event.preventDefault();
    dispatch(addNewLead(values));
    setTimeout(()=>{
      dispatch(addNewLeadSuccess(""));
      dispatch(apiError(""));
    }, 2000);
  }; 

  const toggleAddModal = () => {
    setAddUserModal(!addModal);
  };

  useEffect(()=>{
    if (props.successMessage  && addModal) {
      setTimeout(()=>{
        setAddUserModal(false);
      }, 2000);
      
    }
  }, [props.successMessage]);

  return (
    <React.Fragment >
      <Link to="#" className="btn btn-primary" onClick={toggleAddModal}>
        <i className="bx bx-plus me-1"/> 
        {props.t("Add New Lead")}
      </Link>
      <Modal isOpen={addModal} toggle={toggleAddModal} centered={true}>
        <ModalHeader toggle={toggleAddModal} tag="h4">
          {props.t("Add New Lead")}
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
                    label={props.t("First Name")}
                    placeholder={props.t("First Name")}
                    type="text"
                    errorMessage={props.t("Enter First Name")}
                    validate={{ required: { value: true } }}
                  />
                </div>
              </Col>
              <Col md="6"> 
                <div className="mb-3">
                  <AvField
                    name="lastName"
                    label={props.t("Last Name")}
                    placeholder={props.t("Last Name")}
                    type="text"
                    errorMessage={props.t("Enter Last Name")}
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
                    label={props.t("Email")}
                    placeholder={props.t("Email")}
                    type="email"
                    errorMessage={props.t("Enter Email")}
                    validate={{ required: { value: true } }}
                  />
                </div>
              </Col>
              <Col md="6">
                <div className="mb-3">
                  <AvField
                    name="phone"
                    label={props.t("Phone")}
                    placeholder={props.t("Phone")}
                    type="text"
                    errorMessage={props.t("Enter valid phone")}
                    validate={{ required: { value: true } }}
                  />
                </div>
              </Col>
            </Row> 
            <div className="mb-3">
              <AvField
                name="password"
                label={props.t("Password")}
                placeholder={props.t("Password")}
                type="password"
                errorMessage={props.t("Enter valid password")}
                validate={{ required: { value: true } }}
              />
            </div>
            <div className="mb-3">
              <CountryDropDown/>
            </div>
            <div className='text-center pt-3 p-2'>
              <Button  type="submit" color="primary" className="">
                {props.t("Add")}
              </Button>
            </div>
          </AvForm>
          {
            props.error && (
              <UncontrolledAlert color="danger">
                <i className="mdi mdi-block-helper me-2"/>
                {props.t(props.error)}
              </UncontrolledAlert>
            )
          }
          {
            props.successMessage && (
              <UncontrolledAlert color="success">
                <i className="mdi mdi-check-all me-2"/>
                {props.t("Lead Added successfully !!!")}
              </UncontrolledAlert>
            )
          }
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  error: state.leadReducer.error,
  successMessage: state.leadReducer.successMessage,
});

export default connect(mapStateToProps, null)(withTranslation()(LeadForm));