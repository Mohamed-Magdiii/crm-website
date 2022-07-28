import React, { useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import {
  Row, Col, Button, CardBody, CardHeader, CardTitle, Card
} from "reactstrap";
import {
  AvForm, AvField
} from "availity-reactstrap-validation";
import AvFieldSelect from "components/Common/AvFieldSelect";

// i18n 
import { withTranslation } from "react-i18next";
import { 
  editClientDetails, 
  updateEmploymentStatusStart, 
  updateFinancialInfoStart  
} from "store/client/actions";
import { fetchMarkupsStart } from "store/markups/actions";
import { fetchFeeGroupStart } from "store/feeGroups/actions";
import { fetchTransactionFeeGroupStart } from "store/transactionFeeGroups/actions";
import { fetchUsers } from "store/users/actions";
import Loader from "components/Common/Loader";
import { CALL_STATUSES } from "common/callstatus";
import { LANGUAGES } from "common/languages";
import employmentStatus from "common/employmentStatus";
import professions from "common/profession";
import annualIncome from "common/annualIncome";
import sourceOfFunds from "common/souceOfFunds";
import { TITLES, YESNO } from "common/data/dropdowns";
import OrdersAddModal from "../orders/OrdersAddModal";
import ResetPassword from "./QuickActions/resetPassword";
import ClientAddBankAccountModal from "../Bank/ClientAddBankAccountModal";
import Transaction from "./QuickActions/Transaction";
import ConvertWallet from "./QuickActions/Wallet";
function ClientDetails(props) {
  const clientId = props.clientId;
  const dispatch = useDispatch();
  const { experience, financialInfo, tradingFeeId, markupId, transactionFeeId, declarations } = props.clientDetails;
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
  const updateFinancialInfo = (e, values)=>{
    dispatch(updateFinancialInfoStart({
      values,
      id:clientId
    }));
  };
  const updateEmploymentInfo = (e, values)=>{
    dispatch(updateEmploymentStatusStart({
      values,
      id:clientId
    }));
  };
  useEffect(() => {
    // dispatch(fetchClientDetails(clientId)); 
    dispatch(fetchUsers());
    dispatch(fetchMarkupsStart({
      limit:1000,
      page:1
    }));
    dispatch(fetchFeeGroupStart({
      limit:1000,
      page:1
    }));
    dispatch(fetchTransactionFeeGroupStart({
      limit:1000,
      page:1
    }));
  }, []);

  // useEffect is used to set initial value once client details is loaded 
  // for agent, nationality and country so if the user clicks update without changing 
  // any of them it will load it's previous value and update all updated fields
  useEffect(() => {
  }, [props.clientDetails]);


  return (
    <React.Fragment>
      {(props.clientProfileloading || props.usersLoading || props.dictLoading) && 
        <div className="d-flex justify-content-center">
          <Loader />
        </div>
      }
      {(!props.clientProfileloading && !props.usersLoading && !props.dictLoading) &&
        <div className="">
          <div className="container-fluid">
            <div>
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
                                  placeholder={props.t("Enter First Name")}
                                  type="text"
                                  errorMessage={props.t("Enter First Name")}
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
                                  placeholder={props.t("Enter Last Name")}
                                  type="text"
                                  errorMessage={props.t("Enter Last Name")}
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
                                  placeholder={props.t("Enter Phone")}
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
                                  placeholder={props.t("Enter Date of birth")}
                                  type="date"
                                  errorMessage={props.t("Enter Date of birth")}
                                  validate={{ required: { value: true } }}
                                  value={props.clientDetails.dob}
                                />
                              </div>
                            </Col>
                            <Col md="3">
                              <div className="mt-2">
                                <AvFieldSelect 
                                  name="nationality"
                                  label={props.t("Nationality")}
                                  errorMessage={props.t("Nationality is required")}
                                  validate={{ required: { value: true } }}
                                  value={props.clientDetails.nationality}
                                  options={props.countries.map((country)=>{
                                    return ({
                                      label: `${country.en}`, 
                                      value: country.en
                                    });
                                  })} 
                                />
                              </div>
                            </Col>
                          </Row>

                          {/* third row */}
                          <Row>
                            <Col md="3">
                              <div className="mt-2">
                                <AvFieldSelect 
                                  name="country"
                                  label={props.t("Country")}
                                  errorMessage={props.t("Country is required")}
                                  validate={{ required: { value: true } }}
                                  value={props.clientDetails.country}
                                  options={props.countries.map((country)=>{
                                    return ({
                                      label: `${country.en}`, 
                                      value: country.en
                                    });
                                  })}
                                />
                              </div>
                            </Col>
                            <Col md="3">
                              <div className="mt-2">
                                <AvField
                                  name="city"
                                  label={props.t("City")}
                                  placeholder={props.t("Enter City")}
                                  type="text"
                                  errorMessage={props.t("Enter City")}
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
                              <div className="mt-2">
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
                              </div>
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
                                  name="usCitizen"
                                  type="text"
                                  label={props.t("US Citizen")}
                                  errorMessage={props.t("US Citizen is required")}
                                  // validate={{ required: { value: true } }}
                                  value={props.clientDetails.usCitizen}
                                  options = {YESNO}
                                />
                              </div>
                            </Col>
                            {/* <Col md="3">
                              <div className="mt-2">
                                <AvFieldSelect
                                  name="workedInCrypto"
                                  label={props.t("Worked in Crypto ?")}
                                  placeholder={props.t("Worked in Crypto ?")}
                                  type="text"
                                  errorMessage={props.t("Worked in Crypto is required")}
                                  // validate={{ required: { value: true } }}
                                  value={props.clientDetails.workedInCrypto}
                                  options = {YESNO}
                                />
                              </div>
                            </Col> */}
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
                                  options = {YESNO}
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
                                      label: `${country.en}`, 
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
                              disabled={props.updating}  
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
                          <button type="button" onClick = {()=>{
                            dispatch(editClientDetails({
                              values:{ isActive:"false" },
                              id:clientId
                            }));
                          }} className="btn btn-primary waves-effect waves-light w-100">
                            Portal Access
                          </button>
                          <ResetPassword clientId = {clientId}/>
                        </div>
                      </CardBody>
                      <CardBody className="quick-actions-card">
                        <p className="quick-actions-heading">Crypto Trading</p>
                        <div className="btn-container">
                          <ConvertWallet clientId = {clientId}/>
                          <OrdersAddModal buttonText = "Open Order"/>
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
                          <ClientAddBankAccountModal clientId={clientId} buttonText="Open Bank"/>
                          <button type="button" className="btn btn-primary waves-effect waves-light w-100">
                            Print application
                          </button>
                          <Transaction/>
                        </div>
                      </CardBody>                      
                    </CardBody>
                  </Card>
                </Col>
                <Col>
                  <Row>
                    <Col md="3">
                      <Card>
                        <CardTitle></CardTitle>
                        <CardBody>
                          <AvForm onValidSubmit = {(e, v)=>{
                            dispatch(editClientDetails({
                              id:clientId,
                              values:{ ...v }
                            }));
                          }}>
                            <Row>
                              <Col md="12">
                                
                                <AvFieldSelect
                                  label =" Trading Fee" 
                                  name="tradingFeeId"
                                  value = {tradingFeeId ?._id ? tradingFeeId._id : ""}
                                  validate = { { required : { value : true } }}
                                  options = {props.feeGroups.map(feeGroup=>{
                                    return {
                                      label: feeGroup.title,
                                      value : feeGroup._id
                                    };
                                  })}
                                
                                />
                                
                              </Col>
                              <Col md="12">
                                <div className="mt-2">
                                  <AvFieldSelect 
                                    label="Transaction Fee"
                                    name="transactionFeeId"
                                    value = {transactionFeeId ?._id ? transactionFeeId._id : ""}
                                    options = {props.transactionFeeGroups.map(transactionFeeGroup=>{
                                      return {
                                        label:transactionFeeGroup.title,
                                        value:transactionFeeGroup._id
                                      };
                                    })}
                                    
                                  />
                                </div>
                           
                              </Col>
                              <Col md="12">
                                <div className="mt-2">
                                  <AvFieldSelect 
                                    label="Markup"
                                    name="markupId"
                                    value = {markupId ?._id ?  markupId._id : ""}
                                    options= {props.markups.map(markup=>{
                                      return {
                                        label:markup.title,
                                        value:markup._id
                                      };
                                    })}
                                  />
                                </div>
                             
                              </Col>        
                              <div className="d-flex justify-content-end">
                                <div className="p-4">
                                  <Button 
                                    disabled={props.updating}  
                                    type="submit" 
                                    color="primary"
                                  >
                                    {props.t("Update")}
                                  </Button>
                                </div>
                              </div>                    
                            </Row>

                          </AvForm>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col md="5">
                      <Card>
                        <CardHeader>
                          <CardTitle>Employment Info</CardTitle>
                        </CardHeader>
                        
                        <CardBody>
                          <AvForm onValidSubmit = {(e, v)=>{
                            updateEmploymentInfo(e, v);
                          }}>
                            <Row>
                            
                              <Col  >
                              
                                <div>
                                  <AvFieldSelect
                                    name="employmentStatus"
                                    type="text"
                                    value = {experience ?.employmentStatus ? experience.employmentStatus : ""}
                                    errorMessage={props.t("Employment Status is required")}
                                    validate={{ required: { value: true } }}
                                    label={props.t("Employment Status")}
                                    options={employmentStatus.map((obj)=>{
                                      return ({
                                        label: obj, 
                                        value: obj
                                      });
                                    })}
                                  />
                                </div>
                            
                
                              </Col>
                              <Col>
                                <div>
                                  <AvFieldSelect
                                    name="profession"
                                    label={props.t("Indusrtry")}
                                    placeholder={props.t("Industry is required")}
                                    type="text"
                                    value = {experience ?.profession ? experience.profession : ""}
                                    errorMessage={props.t("Industry is required")}
                                    validate={{ required: { value: true } }}
                                    options ={professions.map((obj)=>{
                                      return ({
                                        label:obj,
                                        value:obj
                                      });
                                    })}
                                  />
                                </div>
                              </Col>
                
             
                            </Row>
                            <Row>
                              <Col>
                                <div className="mt-4">
                                  <AvField name="jobTitle" 
                                    value = {experience ?.jobTitle ? experience.jobTitle : ""} 
                                    label="Job Industry"/>
                                </div>
                            
                              </Col>
                              <Col>
                                <div className= "mt-4">
                                  <AvField 
                                    value = {experience ?.employer ? experience.employer : "" }
                                    name="employer" 
                                    label="Employer"/>
                                </div>
                            
                              </Col>
                            </Row>
                            <div className="d-flex justify-content-end">
                              <div className="p-4">
                                <Button 
                                  disabled={props.employmentInfoUpdating}  
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

                    <Col  md="4" sm="12" xs="12">
                      <Card>
                        <CardHeader>
                          <CardTitle>Finanical Info</CardTitle>
                        </CardHeader>
                        <CardBody>
                          <AvForm onValidSubmit = {(e, v)=>{
                            updateFinancialInfo(e, v); 
                          }}>
                            <Row>
                              <Col >
                                <div className = "mt-2">
                                  <AvFieldSelect
                                    name="annualIncome"
                                    type="text"
                                    errorMessage={props.t("Annual Income Status is required")}
                                    validate={{ required: { value: true } }}
                                    value = {financialInfo ?.annualIncome ? financialInfo.annualIncome : ""}
                                    label={props.t("Annual Income")}
                                    options={annualIncome.map((obj)=>{
                                      return ({
                                        label: obj, 
                                        value: obj
                                      });
                                    })}
                                  />
                                </div>

                
                              </Col>
                              <Col>
                                <div className="mt-2">
                                  <AvFieldSelect
                                    name="sourceOfFunds"
                                    label={props.t("Soucre of Funds")}
                                    placeholder={props.t("Industry is required")}
                                    type="text"
                                    value = {financialInfo ?.sourceOfFunds ? financialInfo.sourceOfFunds : ""}
                                    errorMessage={props.t("Source of Funds is required")}
                                    validate={{ required: { value: true } }}
                                    options ={sourceOfFunds.map((obj)=>{
                                      return ({
                                        label:obj,
                                        value:obj
                                      });
                                    })}
                                  />
                                </div>
                              </Col>
                
                            
                            </Row>
                          
                            <Row>
                              <div className="mt-4">
                                <AvFieldSelect 
                                  label = "Worked in Financial?"
                                  name="workedInFinancial" 
                                  value= {financialInfo?.workedInFinancial ? financialInfo.workedInFinancial : ""}
                                  errorMessage = {props.t("This field is required")}
                                  validate = {{ required :{ value:true } }}
                                  options = {[{
                                    value: "yes",
                                    label: "Yes"
                                  }, {
                                    value: "no",
                                    label: "No"
                                  }]}
                                />
                              </div>
                            </Row>
                            <div className="d-flex justify-content-end">
                              <div className="p-4">
                                <Button 
                                  disabled={props.financialInfoUpdating}  
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
                  </Row>

                 
                </Col>


                { declarations && declarations.length > 0 && <Row>
                  <Col  md="6" sm="12" xs="12">
                    
                    <Card>
                      <CardHeader className="d-flex flex-column gap-3">
                        <div className="d-flex justify-content-between align-items-center">
                          <CardTitle>{props.t("Declarations")}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardBody >
                        {declarations && declarations.length > 0 &&  declarations.map(declaration=>{
                          return <div className="d-flex gap-3 align-items-start" key={declaration}>
                            <input type="checkbox" className="d-block" checked={true}/>
                  
                            <p style={{ fontSize:"11px" }}>{declaration}</p>
                          </div>;
                        })}
                      </CardBody>
                
                                
                    </Card>
                  </Col>
             
                 
                </Row>}

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
  updating: state.clientReducer.updating,
  clientDetails: state.clientReducer.clientDetails,
  editError: state.clientReducer.editError,
  editErrorDetials: state.clientReducer.editErrorDetails,
  updatedClientDetails: state.clientReducer.updatedClientDetails,
  editSuccess: state.clientReducer.editSuccess,
  usersDocs: state.usersReducer.docs,
  usersLoading: state.usersReducer.loading,
  countries: state.dictionaryReducer.countries || [],
  dictLoading: state.dictionaryReducer.loading,
  markups :state.markupsReducer.markups || [],
  transactionFeeGroups: state.transactionFeeGroupReducer.transactionFeeGroups || [],
  feeGroups : state.feeGroupReducer.feeGroups || [],
  employmentInfoUpdating : state.clientReducer.employmentInfoUpdating,
  financialInfoUpdating : state.clientReducer.financialInfoUpdating
});

export default connect(mapStateToProps, null)(withTranslation()(ClientDetails));