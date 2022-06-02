import React, { useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import {
  Row, Col, Button, UncontrolledAlert, CardBody, CardHeader, CardTitle
} from "reactstrap";
import {
  AvForm, AvField
} from "availity-reactstrap-validation";

// i18n 
import { withTranslation } from "react-i18next";
import { fetchClientDetails, editClientDetails } from "store/client/actions"; 

function ClientDetails(props) {
  const clientId = props.clientId;
  const titles = ["Mr", "Mrs", "Miss", "Ms", "Dr"];
  const dispatch = useDispatch();
  const loadClientDetails = () => {
    dispatch(fetchClientDetails(clientId)); 
  };
  const loadUpdatedClientDetailsHandler = (e, values) => {
    dispatch(editClientDetails({
      values,
      id: clientId
    }));
  };
  
  useEffect(() => {
    loadClientDetails();

  }, [props.updatedClientDetails]);
  
  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Row>
            {/* form on the left side */}
            <Col className="col-10"> 
              <CardHeader className="d-flex flex-column gap-3">
                <div className="d-flex justify-content-between  align-items-center">
                  <CardTitle>{props.t("General information")}</CardTitle>
                </div>
              </CardHeader>
              <CardBody>
                <AvForm
                  onValidSubmit={(e, v) => {
                    loadUpdatedClientDetailsHandler(e, v);
                  }}
                >
                  {/* first row */}
                  <div className="input-group">
                    {/* first name */}
                    <AvField
                      className="group-control"
                      name="firstName"
                      label={props.t("First name")}
                      placeholder={props.t("First name")}
                      type="text"
                      errorMessage={props.t("First name is required")}
                      validate={{ required: { value: true } }}
                      value={props.clientDetails.firstName}
                    />

                    {/* last name */}
                    <AvField
                      className="group-control"
                      name="lastName"
                      label={props.t("Last name")}
                      placeholder={props.t("Last name")}
                      type="text"
                      errorMessage={props.t("Last name is required")}
                      validate={{ required: { value: true } }}
                      value={props.clientDetails.lastName}
                    />
                  </div>

                  {/* second row */}
                  <div className="input-group">
                    {/* title */}
                    <AvField
                      className="group-control"
                      name="title"
                      label={props.t("Title")}
                      placeholder={props.t("Title")}
                      type="select"
                      errorMessage={props.t("Title is required")}
                      validate={{ required: { value: true } }}
                      value={props.clientDetails.title}
                    >
                      {titles.map((title) => (
                        <option key={title.indexOf(title)} value={title}>
                          title
                        </option>
                      ))}
                    </AvField>
                    
                    {/* phone number */}
                    <AvField
                      className="group-control"
                      name="phone"
                      label={props.t("Phone")}
                      placeholder={props.t("Phone")}
                      type="text"
                      errorMessage={props.t("Phone is required")}
                      validate={{ required: { value: true } }}
                      value={props.clientDetails.phone}
                    />
                  </div>

                  {/* third row */}
                  <div className="input-group">
                    {/* nationality */}
                    <AvField
                      className="group-control"
                      name="nationality"
                      label={props.t("Nationality")}
                      placeholder={props.t("Nationality")}
                      type="text"
                      errorMessage={props.t("Nationality is required")}
                      validate={{ required: { value: true } }}
                      value={props.clientDetails.nationality}
                    />
                    
                    {/* country */}
                    <AvField
                      name="country"
                      label={props.t("Country")}
                      placeholder={props.t("Country")}
                      type="text"
                      errorMessage={props.t("Country is required")}
                      validate={{ required: { value: true } }}
                      value={props.clientDetails.country}
                    />
                  </div>

                  {/* forth row */}
                  <div className="input-group">
                    {/* city */}
                    <AvField
                      name="city"
                      label={props.t("City")}
                      placeholder={props.t("City")}
                      type="text"
                      errorMessage={props.t("City is required")}
                      validate={{ required: { value: true } }}
                      value={props.clientDetails.city}
                    />
                    
                    {/* agent */}
                    <AvField
                      name="agent"
                      label={props.t("Agent")}
                      placeholder={props.t("Agent")}
                      type="text"
                      errorMessage={props.t("Agent is required")}
                      validate={{ required: { value: true } }}
                      value={props.clientDetails.agent}
                    />
                  </div>

                  {/* final row */}
                  <div className="input-group">
                    {/* call status */}
                    <AvField
                      name="callStatus"
                      label={props.t("Call status")}
                      placeholder={props.t("Call status")}
                      type="text"
                      errorMessage={props.t("Call status is required")}
                      validate={{ required: { value: true } }}
                      value={props.clientDetails.callStatus}
                    />
                    
                    {/* dob */}
                    <AvField
                      name="dob"
                      label={props.t("Dob")}
                      placeholder={props.t("Dob")}
                      type="text"
                      errorMessage={props.t("Dob is required")}
                      validate={{ required: { value: true } }}
                      value={props.clientDetails.dob}
                    />
                  </div>

                  <div className="d-flex justify-content-end col-sm-6 mt-3">
                    {/* submit button */}
                    <div className="p-2">
                      <Button 
                        disabled={props.editLoading}  
                        type="submit" 
                        color="primary"
                      >
                        {props.t("Update")}
                      </Button>
                    </div>
                  </div>
                  {/* TODO this error message needs to be handled to disappear after a while */}
                  {props.editError && <UncontrolledAlert color="danger" className="col-sm-8">
                    <i className="mdi mdi-block-helper me-2"></i>
                    {/* TODO this need to be handled in translation */}
                    {props.t(props.editErrorDetails)}
                  </UncontrolledAlert>}
                  {props.editSuccess && <UncontrolledAlert color="success" className="col-sm-8">
                    <i className="mdi mdi-check-all me-2"></i>
                    {props.t("Client updated successfully")} !!!
                  </UncontrolledAlert>}
                </AvForm>
              </CardBody>
            </Col>
            {/* card on the right side */}
            <Col>
              <CardHeader className="d-flex flex-column gap-3">
                <div className="d-flex justify-content-between  align-items-center">
                  
                </div>
              </CardHeader>
              <CardBody>
                testing
              </CardBody>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  loading: state.clientReducer.loading,
  clientDetails: state.clientReducer.clientDetails,
  editError: state.clientReducer.editError,
  editErrorDetials: state.clientReducer.editErrorDetails,
  updatedClientDetails: state.clientReducer.updatedClientDetails,
  editSuccess: state.clientReducer.editSuccess
});

export default connect(mapStateToProps, null)(withTranslation()(ClientDetails));