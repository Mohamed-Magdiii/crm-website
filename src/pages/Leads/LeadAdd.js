
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
import { addNewLead } from "../../store/leads/actions";
import CountryDropDown from "../../components/Common/CountryDropDown";
import { withTranslation } from "react-i18next";
function LeadForm(props) {

  const [addModal, setAddUserModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const dispatch = useDispatch();
  const { create } = props.leadsPermissions;
  const handleAddLead = (event, values)=>{
    event.preventDefault();
    dispatch(addNewLead({
      ...values,
      country: selectedCountry.value
    }));

  }; 

  const countryChangeHandler = (selectedCountryVar) => {
    setSelectedCountry(selectedCountryVar);
  };

  const toggleAddModal = () => {
    setAddUserModal(!addModal);
  };
  
  useEffect(()=>{
    if (!props.showAddSuccessMessage  && addModal) {
    
      setAddUserModal(false);
    }
  }, [props.showAddSuccessMessage]);

  return (
    <React.Fragment >
      <Link to="#" className={`btn btn-primary ${!create ? "d-none" : ""}`} onClick={toggleAddModal}>
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
                    placeholder={props.t("Enter First Name")}
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
                    placeholder={props.t("Enter Last Name")}
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
                    placeholder={props.t("Enter Email")}
                    type="email"
                    errorMessage={props.t("Enter Valid Email")}
                    validate={{ required: { value: true } }}
                  />
                </div>
              </Col>
              <Col md="6">
                <div className="mb-3">
                  <AvField
                    name="phone"
                    label={props.t("Phone")}
                    placeholder={props.t("Enter Phone")}
                    type="text"
                    errorMessage={props.t("Enter valid phone")}
                    validate={
                      { 
                        required: { value: true },
                        pattern:{
                          // eslint-disable-next-line no-useless-escape
                          value :"/^[\+][(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im",
                          errorMessage :"Phone must consist of digits only with coutry key"
                        }
                      }}
                  />
                </div>
              </Col>
            </Row> 
            <div className="mb-3">
              <AvField
                name="password"
                label={props.t("Password")}
                placeholder={props.t("Enter Password")}
                type="password"
                errorMessage={props.t("Enter valid password")}
                validate= {{
                  required: { value : true },
                  pattern :{ 
                    // eslint-disable-next-line no-useless-escape
                    value:"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
                    errorMessage :"Must contain at least eight characters, at least one number and both lower and uppercase letters and special characters"
                  }
                  
                }
                }
              />
            </div>
            <div className="mb-3">
              <CountryDropDown 
                selectCountry={setSelectedCountry}
                countryChangeHandler={countryChangeHandler}
              />
            </div>
            <div className='text-center pt-3 p-2'>
              <Button disabled= {props.disableAddButton} type="submit" color="primary" className="">
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
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  error: state.leadReducer.error,
  showAddSuccessMessage :state.leadReducer.showAddSuccessMessage,
  disableAddButton : state.leadReducer.disableAddButton,
  leadsPermissions : state.Profile.leadsPermissions || {}
});

export default connect(mapStateToProps, null)(withTranslation()(LeadForm));