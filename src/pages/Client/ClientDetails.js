import React, { useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import {
  Row, Col, Button, UncontrolledAlert, CardBody, CardHeader, CardTitle, Card
} from "reactstrap";
import {
  AvForm, AvField
} from "availity-reactstrap-validation";

// i18n 
import { withTranslation } from "react-i18next";
import { fetchClientDetails, editClientDetails } from "store/client/actions"; 
import CountryDropDown from "components/Common/CountryDropDown";

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
          <div className="d-flex flex-row justify-content-between">
            {/* input fields to the left side */}
            <Col md="7">
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
                    {/* first row */}
                    <Row>
                      <Col md="6">
                        <div className="mb-6">
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
                      <Col md="6">
                        <div className="mb-6">
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
                    </Row>

                    {/* second row */}
                    <Row>
                      <Col md="6">
                        <div className="mb-6">
                          <AvField
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
                                {title}
                              </option>
                            ))}
                          </AvField>
                        </div>
                      </Col>
                      <Col md="6">
                        <div className="mb-6">
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
                      </Col>
                    </Row>

                    {/* third row */}
                    <Row>
                      <Col md="6">
                        <CountryDropDown />
                      </Col>
                      <Col md="6">
                        <div className="mb-6">
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
                      </Col>
                    </Row>

                    {/* forth row */}
                    <Row>
                      <Col md="6">
                        <div className="mb-6">
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
                      <Col md="6">
                        <div className="mb-6">
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
                      </Col>
                    </Row>

                    {/* final row */}
                    <Row>
                      <Col md="6">
                        <div className="mb-6">
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
                      </Col>
                      <Col md="6">
                        <div className="mb-6">
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
                      </Col>
                    </Row>

                    <div className="d-flex justify-content-end">
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
                  </AvForm>
                </CardBody>
                <CardBody>
                </CardBody>
              </Card>
            </Col>

            {/* quick actions to the right side */}
            <Col md="4">
              <Card>
                <CardHeader className="d-flex flex-column gap-3" key="0">
                  <div className="d-flex justify-content-between align-items-center">
                    <CardTitle>{props.t("Quick actions")}</CardTitle>
                  </div>
                </CardHeader>
                <CardBody key="0">
                  <CardHeader className="d-flex flex-column gap-3" key="1">
                    <div className="d-flex justify-content-between align-items-center">
                      <CardTitle>{props.t("Space 1")}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardBody key="1">
                    <div className="d-flex flex-column justify-content-between">
                      <div className="d-flex flex-row justify-content-between">
                        <button type="button" className="btn btn-primary waves-effect waves-light w-xm">
                          Action 1
                        </button>

                        <button type="button" className="btn btn-primary waves-effect waves-light w-xm">
                          Action 2
                        </button>
                      </div>
                    </div>
                  </CardBody>

                  <CardHeader className="d-flex flex-column gap-3" key="2">
                    <div className="d-flex justify-content-between align-items-center">
                      <CardTitle>{props.t("Space 2")}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardBody key="2">
                    <div className="d-flex flex-column justify-content-between">
                      <div className="d-flex flex-row justify-content-between">
                        <button type="button" className="btn btn-primary waves-effect waves-light w-xm">
                          Action 3
                        </button>

                        <button type="button" className="btn btn-primary waves-effect waves-light w-xm">
                          Action 4
                        </button>
                      </div>
                    </div>
                  </CardBody>
                </CardBody>
              </Card>
            </Col>
          </div>

          {/* TODO error message needs to be handled to disappear after a while */}
          {props.editError && <UncontrolledAlert color="danger" className="col-sm-8">
            <i className="mdi mdi-block-helper me-2"></i>
            {/* TODO this need to be handled in translation */}
            {props.t(props.editErrorDetails)}
          </UncontrolledAlert>}
          {props.editSuccess && <UncontrolledAlert color="success" className="col-sm-8">
            <i className="mdi mdi-check-all me-2"></i>
            {props.t("Client updated successfully")} !!!
          </UncontrolledAlert>}
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