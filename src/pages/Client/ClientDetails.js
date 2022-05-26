import React, { useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import {
  Row, Col, Button, UncontrolledAlert
} from "reactstrap";
import {
  AvForm, AvField
} from "availity-reactstrap-validation";

// i18n 
import { withTranslation } from "react-i18next";
import { fetchClientDetails, editClientDetails } from "store/client/actions"; 

function ClientDetails(props) {
  const clientId = props.clientId;
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
            <Col className="col-12"> 
              <AvForm
                onValidSubmit={(e, v) => {
                  loadUpdatedClientDetailsHandler(e, v);
                }}
              >
                {/* title */}
                <div className="col-sm-8">
                  <AvField
                    name="title"
                    label={props.t("Title")}
                    placeholder={props.t("Title")}
                    type="text"
                    errorMessage={props.t("Title is required")}
                    validate={{ required: { value: true } }}
                    value={props.clientDetails.title}
                  />
                </div>

                {/* first name */}
                <div className="col-sm-8">
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

                {/* last name */}
                <div className="col-sm-8">
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

                {/* nationality */}
                <div className="col-sm-8">
                  <AvField
                    name="nationality"
                    label={props.t("Nationality")}
                    placeholder={props.t("Nationality")}
                    type="text"
                    errorMessage={props.t("Nationality is required")}
                    validate={{ required: { value: true } }}
                    value={props.clientDetails.nationality}
                  />
                </div>

                {/* phone */}
                <div className="col-sm-8">
                  <AvField
                    name="phone"
                    label={props.t("Phone")}
                    placeholder={props.t("Phone")}
                    type="text"
                    errorMessage={props.t("Phone is required")}
                    validate={{ required: { value: true } }}
                    value={props.clientDetails.phone}
                  />
                </div>

                {/* country */}
                <div className="col-sm-8">
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

                {/* city */}
                <div className="col-sm-8">
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

                {/* agent */}
                <div className="col-sm-8">
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

                {/* call status */}
                <div className="col-sm-8">
                  <AvField
                    name="callStatus"
                    label={props.t("Call status")}
                    placeholder={props.t("Call status")}
                    type="text"
                    errorMessage={props.t("Call status is required")}
                    validate={{ required: { value: true } }}
                    value={props.clientDetails.callStatus}
                  />
                </div>

                {/* dob */}
                <div className="col-sm-8">
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

                <div className="d-flex justify-content-end col-sm-8 mt-3">
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