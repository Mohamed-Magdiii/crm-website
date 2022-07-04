import React, { useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import {
  Row, Col, Button, UncontrolledAlert, CardBody, CardHeader, CardTitle, Card
} from "reactstrap";
import {
  AvForm, AvField
} from "availity-reactstrap-validation";
import AvFieldSelect from "components/Common/AvFieldSelect";

// i18n 
import { withTranslation } from "react-i18next";
import { fetchClientDetails, editClientDetails } from "store/client/actions";
import { fetchUsers } from "store/users/actions";
import Loader from "components/Common/Loader";
import { CALL_STATUSES } from "common/callstatus";
import { LANGUAGES } from "common/languages";
import TITLES from "common/titles";

function ClientDetails(props) {
  const clientId = props.clientId;
  const dispatch = useDispatch();

  const agentOptions = props.usersDocs && props.usersDocs.map((user) => {
    return ({
      value: user._id,
      label: user.firstName + " " + user.lastName
    });
  });
    
  const loadUpdatedClientDetailsHandler = (e, values) => {
    dispatch(editClientDetails({
      values,
      id: clientId
    }));
  };
  
  useEffect(() => {
    dispatch(fetchClientDetails(clientId)); 
    dispatch(fetchUsers());

  }, [props.updatedClientDetails]);

  // useEffect is used to set initial value for agent, nationality and country 
  // right after loading the page so if the user clicks update without changing 
  // any of them it will load it's previous value and update all updated fields
  useEffect(() => {
  }, [props.clientDetails]);
  return (
    <React.Fragment>
      {(props.clientProfileloading || props.usersLoading) && 
        <div className="d-flex justify-content-center">
          <Loader />
        </div>
      }
      {(!props.clientProfileloading && !props.usersLoading) &&
        <div className="">
          <div className="container-fluid">
            <div className="">
              <Row>
                {/* input fields to the left side */}
                <Col md="9" sm="12" xs="12">
                  <Card>
                    <CardHeader className="d-flex flex-column gap-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <CardTitle>{props.t("General information")}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <AvForm
                        onValidSubmit={(e, v) => {
                          loadUpdatedClientDetailsHandler(e, v);
                        }}
                      >
                        <div className="d-flex flex-column gap-4">
                          {/* first row */}
                          <Row>
                            <Col md="3">
                              <div className="mt-2">
                                <AvFieldSelect
                                  name="title"
                                  type="text"
                                  errorMessage={props.t("Title is required")}
                                  validate={{ required: { value: true } }}
                                  value={props.clientDetails.title}
                                  label={props.t("Title")}
                                  options={TITLES.map((obj)=>{
                                    return ({
                                      label: obj, 
                                      value: obj
                                    });
                                  })}
                                />
                              </div>
                            </Col>
                            <Col md="3">
                              <div className="mt-2">
                                <AvField
                                  name="firstName"
                                  label={props.t("First name")}
                                  placeholder={props.t("First name")}
                                  type="text"
                                  errorMessage={props.t("First name is required")}
                                  validate={{ required: { value: true } }}
                                  value={props.clientDetails.firstName}
                                />
                              </div>
                            </Col>
                            <Col md="3">
                              <div className="mt-2">
                                <AvField
                                  name="lastName"
                                  label={props.t("Last name")}
                                  placeholder={props.t("Last name")}
                                  type="text"
                                  errorMessage={props.t("Last name is required")}
                                  validate={{ required: { value: true } }}
                                  value={props.clientDetails.lastName}
                                />
                              </div>
                            </Col>
                            <Col md="3">
                              <div className="mt-2">
                                <AvField
                                  name="phone"
                                  label={props.t("Phone")}
                                  placeholder={props.t("Phone")}
                                  type="text"
                                  errorMessage={props.t("Phone is required")}
                                  validate={
                                    { 
                                      required: { value: true },
                                      pattern :{
                                        // eslint-disable-next-line no-useless-escape
                                        value:"/^[\+][(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im",
                                        errorMessage:"Phone number must be digits only with country key"
                                      }
                                    }
                                  }
                                  value={props.clientDetails.phone}
                                />
                              </div>
                            </Col>
                          </Row>

                          {/* second row */}
                          <Row>
                            <Col md="3">
                              <div className="mt-2">
                                <AvField
                                  name="mobile"
                                  label={props.t("Mobile")}
                                  placeholder={props.t("Mobile")}
                                  type="text"
                                  validate={
                                    { 
                                      pattern :{
                                        // eslint-disable-next-line no-useless-escape
                                        value:"/^[\+][(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im",
                                        errorMessage:"Phone number must be digits only with country key"
                                      }
                                    }
                                  }
                                  value={props.clientDetails.mobile}
                                />
                              </div>
                            </Col>
                            <Col md="3">
                              <div className="mt-2">
                                <AvField
                                  name="email"
                                  label={props.t("Email")}
                                  placeholder={props.t("Email")}
                                  type="text"
                                  errorMessage={props.t("Email is required")}
                                  validate={{ required: { value: true } }}
                                  value={props.clientDetails.email}
                                />
                              </div>
                            </Col>
                            <Col md="3">
                              <div className="mt-2">
                                <AvField
                                  name="dob"
                                  label={props.t("Date of birth")}
                                  placeholder={props.t("Date of birth")}
                                  type="date"
                                  errorMessage={props.t("Date of birth is required")}
                                  validate={{ required: { value: true } }}
                                  value={props.clientDetails.dob}
                                />
                              </div>
                            </Col>
                            <Col md="3">
                              <AvFieldSelect 
                                name="nationality"
                                label={props.t("Nationality")}
                                errorMessage={props.t("Nationality is required")}
                                validate={{ required: { value: true } }}
                                value={props.clientDetails.nationality}
                                options={props.countries.map((country)=>{
                                  return ({
                                    label: `${country.en} ${country.ar}`, 
                                    value: country.en
                                  });
                                })}
                              />
                            </Col>
                          </Row>

                          {/* third row */}
                          <Row>
                            <Col md="3">
                              <AvFieldSelect 
                                name="country"
                                label={props.t("Country")}
                                errorMessage={props.t("Country is required")}
                                validate={{ required: { value: true } }}
                                value={props.clientDetails.country}
                                options={props.countries.map((country)=>{
                                  return ({
                                    label: `${country.en} ${country.ar}`, 
                                    value: country.en
                                  });
                                })}
                              />
                            </Col>
                            <Col md="3">
                              <div className="mt-2">
                                <AvField
                                  name="city"
                                  label={props.t("City")}
                                  placeholder={props.t("City")}
                                  type="text"
                                  errorMessage={props.t("City is required")}
                                  validate={{ required: { value: true } }}
                                  value={props.clientDetails.city}
                                />
                              </div>
                            </Col>
                            <Col md="3">
                              <div className="mt-2">
                                <AvField
                                  name="address"
                                  label={props.t("Address")}
                                  placeholder={props.t("Address")}
                                  type="text"
                                  errorMessage={props.t("Address is required")}
                                  validate={{ required: { value: true } }}
                                  value={props.clientDetails.address}
                                />
                              </div>
                            </Col>
                            <Col md="3">
                              <div className="mt-2">
                                <AvField
                                  name="address2"
                                  label={props.t("Address Line 2")}
                                  placeholder={props.t("Address Line 2")}
                                  type="text"
                                  errorMessage={props.t("Address is required")}
                                  // validate={{ required: { value: true } }}
                                  value={props.clientDetails.address2}
                                />
                              </div>
                            </Col>
                          </Row>

                          {/* fourth row */}
                          <Row>
                            <Col md="3">
                              <AvFieldSelect
                                name="gender"
                                type="text"
                                errorMessage={props.t("Gender is required")}
                                validate={{ required: { value: true } }}
                                value={props.clientDetails.gender}
                                label={props.t("Gender")}
                                options = {[{
                                  value: "",
                                  label: "Select Gender"
                                }, {
                                  value: "male",
                                  label: "Male"
                                }, {
                                  value: "female",
                                  label: "Female"
                                }]}
                              />
                            </Col>
                            <Col md="3">
                              <div className="mt-2">
                                <AvField
                                  name="zipCode"
                                  label={props.t("Postal Code")}
                                  placeholder={props.t("Postal Code")}
                                  type="text"
                                  value={props.clientDetails.zipCode}
                                />
                              </div>
                            </Col>
                            <Col md="3">
                              <div className="mt-2">
                                <AvFieldSelect
                                  name="language"
                                  label={props.t("Language")}
                                  placeholder={props.t("Language")}
                                  type="text"
                                  errorMessage={props.t("Language is required")}
                                  validate={{ required: { value: true } }}
                                  value={props.clientDetails.language}  
                                  options = {LANGUAGES}
                                />
                              </div>
                            </Col>
                            <Col md="3">
                              <div className="mt-2">
                                <AvField
                                  name="source"
                                  label={props.t("Source")}
                                  placeholder={props.t("Source")}
                                  type="text"
                                  errorMessage={props.t("Source is required")}
                                  validate={{ required: { value: true } }}
                                  value={props.clientDetails.source}
                                />
                              </div>
                            </Col>
                             
                          </Row>
                          {/* fifth row */}
                          <Row>
                            <Col md="3">
                              <div className="mt-2">
                                <AvFieldSelect
                                  name="fatca"
                                  type="text"
                                  label={props.t("US Citizen")}
                                  errorMessage={props.t("US Citizen is required")}
                                  // validate={{ required: { value: true } }}
                                  value={props.clientDetails.fatca}
                                  options = {[{
                                    value: "yes",
                                    label: "Yes"
                                  }, {
                                    value: "no",
                                    label: "No"
                                  }]}
                                />
                              </div>
                            </Col>
                            <Col md="3">
                              <div className="mt-2">
                                <AvFieldSelect
                                  name="workedInCrypto"
                                  label={props.t("Worked in Crypto ?")}
                                  placeholder={props.t("Worked in Crypto ?")}
                                  type="text"
                                  errorMessage={props.t("Worked in Crypto is required")}
                                  // validate={{ required: { value: true } }}
                                  value={props.clientDetails.workedInCrypto}
                                  options = {[{
                                    value: "yes",
                                    label: "Yes"
                                  }, {
                                    value: "no",
                                    label: "No"
                                  }]}
                                />
                              </div>
                            </Col>
                            <Col md="3">
                              <div className="mt-2">
                                <AvField
                                  name="taxIdentificationNumber"
                                  label={props.t("Tax Identification Number")}
                                  placeholder={props.t("Tax Identification Number")}
                                  type="text"
                                  value={props.clientDetails.taxIdentificationNumber}
                                />
                              </div>
                            </Col>
                            <Col md="3">
                              <div className="mt-2">
                                <AvFieldSelect
                                  name="politicallyExposed"
                                  label={props.t("Politically exposed ?")}
                                  placeholder={props.t("Politically exposed ?")}
                                  type="text"
                                  errorMessage={props.t("Politically exposed is required")}
                                  // validate={{ required: { value: true } }}
                                  value={props.clientDetails.politicallyExposed}
                                  options = {[{
                                    value: "yes",
                                    label: "Yes"
                                  }, {
                                    value: "no",
                                    label: "No"
                                  }]}
                                />
                              </div>
                            </Col>
                          </Row>

                          {/* sith row */}
                          <Row>
                            <Col md="3">
                              <div className="mt-2">
                                <AvFieldSelect 
                                  name="agent"
                                  options={agentOptions}
                                  label={props.t("Agent")}
                                  errorMessage={props.t("Agent is required")}
                                  // validate={{ required: { value: true } }}
                                  value={props.clientDetails.agent && props.clientDetails.agent._id || ""}
                                />
                              </div>
                            </Col>
                            <Col md="3">
                              <div className="mt-2">
                                <AvFieldSelect
                                  name="callStatus"
                                  label={props.t("Call status")}
                                  placeholder={props.t("Call status")}
                                  errorMessage={props.t("Call status is required")}
                                  validate={{ required: { value: true } }}
                                  value={props.clientDetails.callStatus}
                                  options={CALL_STATUSES.map(obj => {
                                    return {
                                      value: obj,
                                      label: obj 
                                    };
                                  })}
                                />
                              </div>
                            </Col> 
                          </Row>

                          {/* seventh row */}
                          <Row>
                            <h6 className="mt-3 mb-4">{props.t("ID Details")}</h6>
                            {/* <h1 className="display-6 mb-0">{props.t("ID Details")}</h1> */}
                            <Col md="2">
                              <div className="mt-2">
                                <AvFieldSelect
                                  name="idDetails.type"
                                  label={props.t("ID Type")}
                                  placeholder={props.t("ID Type")}
                                  type="text"
                                  value={props.clientDetails.idDetails && props.clientDetails.idDetails.type}
                                  options = {[{
                                    value: "ID",
                                    label: "ID"
                                  }, {
                                    value: "PASSPORT",
                                    label: "Passport"
                                  }]}
                                />
                              </div>
                            </Col>
                            <Col md="3">
                              <div className="mt-2">
                                <AvFieldSelect
                                  name="idDetails.countryOfIssue"
                                  label={props.t("Country of Issue")}
                                  placeholder={props.t("Country of Issue")}
                                  value={props.clientDetails.idDetails && props.clientDetails.idDetails.countryOfIssue}
                                  options={props.countries.map((country)=>{
                                    return ({
                                      label: `${country.en} ${country.ar}`, 
                                      value: country.en
                                    });
                                  })}
                                />
                              </div>
                            </Col>
                            <Col md="3">
                              <div className="mt-2">
                                <AvField
                                  name="idDetails.documentNo"
                                  label={props.t("ID Number")}
                                  placeholder={props.t("ID Number")}
                                  type="text"
                                  value={props.clientDetails.idDetails && props.clientDetails.idDetails.documentNo}
                                />
                              </div>
                            </Col>
                            <Col md="2">
                              <div className="mt-2">
                                <AvField
                                  name="idDetails.dateOfIssue"
                                  label={props.t("Date of Issue")}
                                  placeholder={props.t("Date of Issue")}
                                  type="date"
                                  value={props.clientDetails.idDetails && props.clientDetails.idDetails.dateOfIssue}
                                />
                              </div>
                            </Col>
                            <Col md="2">
                              <div className="mt-2">
                                <AvField
                                  name="idDetails.dateOfExpiry"
                                  label={props.t("Date of expiry")}
                                  placeholder={props.t("Date of expiry")}
                                  type="date"
                                  value={props.clientDetails.idDetails && props.clientDetails.idDetails.dateOfExpiry}
                                />
                              </div>
                            </Col>
                          </Row>
                          
                          
                        </div>

                        <div className="d-flex justify-content-end">
                          <div className="p-4">
                            <Button 
                              disabled={props.editLoading}  
                              type="submit" 
                              color="primary"
                            >
                              {props.t("Update")}
                            </Button>
                          </div>
                        </div>
                      </AvForm>
                    </CardBody>
                  </Card>
                </Col>

                {/* quick actions to the right side */}
                <Col md="3" sm="12" xs="12">
                  <Card>
                    <CardHeader className="d-flex flex-column gap-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <CardTitle>{props.t("Quick actions")}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardBody className="p-0">
                      {/* first action space */}
                      <CardBody className="quick-actions-card">
                        <p className="quick-actions-heading">Client</p>
                        <div className="btn-container">
                          <button type="button" className="btn btn-primary waves-effect waves-light w-100">
                            Portal Access
                          </button>
                          <button type="button" className="btn btn-primary waves-effect waves-light w-100">
                            Portal password
                          </button>
                        </div>
                      </CardBody>
                      <CardBody className="quick-actions-card">
                        <p className="quick-actions-heading">Crypto Trading</p>
                        <div className="btn-container">
                          <button type="button" className="btn btn-primary waves-effect waves-light w-100">
                            Create wallet
                          </button>
                          <button type="button" className="btn btn-primary waves-effect waves-light w-100">
                            Open order
                          </button>
                        </div>
                      </CardBody>
                      <CardBody className="quick-actions-card">
                        <p className="quick-actions-heading">Communication</p>
                        <div className="btn-container">
                          <button type="button" className="btn btn-primary waves-effect waves-light w-100">
                            Send Email
                          </button>
                        </div>
                      </CardBody>
                      <CardBody className="quick-actions-card">
                        <p className="quick-actions-heading">Misc</p>
                        <div className="btn-container">
                          <button type="button" className="btn btn-primary waves-effect waves-light w-100">
                            Add Note
                          </button>
                          <button type="button" className="btn btn-primary waves-effect waves-light w-100">
                            Add bank
                          </button>
                          <button type="button" className="btn btn-primary waves-effect waves-light w-100">
                            Print application
                          </button>
                          <button type="button" className="btn btn-primary waves-effect waves-light w-100">
                          Add transaction
                          </button>
                        </div>
                      </CardBody>                      
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      }
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  clientProfileloading: state.clientReducer.clientProfileloading,
  clientDetails: state.clientReducer.clientDetails,
  editError: state.clientReducer.editError,
  editErrorDetials: state.clientReducer.editErrorDetails,
  updatedClientDetails: state.clientReducer.updatedClientDetails,
  editSuccess: state.clientReducer.editSuccess,
  usersDocs: state.usersReducer.docs,
  usersLoading: state.usersReducer.loading,
  countries: state.dictionaryReducer.countries || []
});

export default connect(mapStateToProps, null)(withTranslation()(ClientDetails));