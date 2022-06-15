import React, { useEffect, useState } from "react";
import { useDispatch, connect } from "react-redux";
import {
  Row, Col, Button, UncontrolledAlert, CardBody, CardHeader, CardTitle, Card
} from "reactstrap";
import {
  AvForm, AvField
} from "availity-reactstrap-validation";
import Select from "react-select";

// i18n 
import { withTranslation } from "react-i18next";
import { fetchClientDetails, editClientDetails } from "store/client/actions";
import { fetchUsers } from "store/users/actions";
import CountryDropDown from "components/Common/CountryDropDown";
import NationalityDropDown from "components/Common/NationalityDropDown";

function ClientDetails(props) {
  const clientId = props.clientId;
  const dispatch = useDispatch();
  const loadClientDetails = () => {
    dispatch(fetchClientDetails(clientId)); 
  };
  const loadUsers = () => {
    dispatch(fetchUsers());
  };

  // title select component hanlder 
  const [selectedTitle, setSelectedTitle] = useState();
  const titles = ["Mr", "Mrs", "Miss", "Ms", "Dr"];
  const titleOptions = titles.map((title) => {
    return (
      { 
        value: title, 
        label: title 
      }
    );
  });
  // as props.clientDetails is initially undefined then this useEffect just loads an 
  // initial value to it when ever it's loaded 
  useEffect(() => {
    let titleOptionObj = titleOptions.filter((titleOption) => (
      titleOption.value === props.clientDetails.title
    ));
    setSelectedTitle(titleOptionObj[0]);
  }, [props.clientDetails]);
  const titleChangeHandler = (selectedTitle) => {
    setSelectedTitle(selectedTitle);
  };

  // agent select component handler
  let selectedAgent = null;
  const agentSelectHandler = () => {
    const agentOptions = props.usersDocs.map((user) => {
      return ({
        value: user._id,
        label: user.firstName + " " + user.lastName
      });
    });
    const agentOptionObj = agentOptions.find((agentOption) => (
      agentOption.value === props.clientDetails.agent
    ));  
    selectedAgent = agentOptionObj;

    return agentOptions;
  };
  const agentOptions = props.usersDocs && agentSelectHandler();
  const agentChangeHandler = (selectedAgentVar) => {
    selectedAgent = selectedAgentVar;
  };  
  
  const loadUpdatedClientDetailsHandler = (e, values) => {
    dispatch(editClientDetails({
      values,
      id: clientId
    }));
  };
  
  useEffect(() => {
    loadClientDetails();
    loadUsers();
  }, [props.updatedClientDetails]);

  return (
    <React.Fragment>
      {agentOptions &&
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
                          v.title = selectedTitle.value;
                          v.agent = selectedAgent.value;
                          loadUpdatedClientDetailsHandler(e, v);
                        }}
                      >
                        <div className="d-flex flex-column gap-4">
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
                                <label htmlFor="selectTitle">{props.t("Title")}</label>
                                {/* if selected title not loaded yet 
                                    then it will render a select component with empty obj
                                    when it's loaded it will be replaced with a select component
                                    with selected title as its default value */}
                                {!selectedTitle && 
                                  <Select
                                    defaultValue={{}}
                                    options={titleOptions} 
                                    onChange={titleChangeHandler}
                                  />
                                }
                                {selectedTitle && 
                                  <Select
                                    defaultValue={selectedTitle}
                                    options={titleOptions} 
                                    onChange={titleChangeHandler}
                                  />
                                }
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
                                  label={props.t("Date of birth")}
                                  placeholder={props.t("Date of birth")}
                                  type="date"
                                  errorMessage={props.t("Date of birth is required")}
                                  validate={{ required: { value: true } }}
                                  value={props.clientDetails.dob}
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
                                <label htmlFor="selectAgent">{props.t("Agent")}</label>
                                <Select
                                  defaultValue={selectedAgent}
                                  options={agentOptions} 
                                  onChange={agentChangeHandler}
                                />
                              </div>
                            </Col>
                          </Row>

                          {/* final row */}
                          <Row>
                            <Col md="6">
                              <CountryDropDown />
                            </Col>
                            <Col md="6">
                              <NationalityDropDown />
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
                    <CardBody>
                      {/* first action space */}
                      <CardHeader className="d-flex flex-column gap-3">
                        <div className="d-flex justify-content-center align-items-center">
                          <CardTitle>{props.t("Space1")}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardBody>
                        <Row>
                          <div className="d-flex flex-wrap gap-2 justify-content-center">
                            <div className="mb-6">
                              <button type="button" className="btn btn-primary waves-effect waves-light w-xs">
                                Action 1
                              </button>
                            </div>
                            <div className="mb-6">
                              <button type="button" className="btn btn-primary waves-effect waves-light w-xs">
                                Action 2
                              </button>
                            </div>
                            <div className="mb-6">
                              <button type="button" className="btn btn-primary waves-effect waves-light w-xs">
                                Action 3
                              </button>
                            </div>
                          </div>
                        </Row>
                      </CardBody>

                      {/* second action space */}
                      <CardHeader className="d-flex flex-column gap-3">
                        <div className="d-flex justify-content-center align-items-center">
                          <CardTitle>{props.t("Space2")}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardBody>
                        <Row>
                          <div className="d-flex flex-wrap gap-2 justify-content-center">
                            <div className="mb-6">
                              <button type="button" className="btn btn-primary waves-effect waves-light w-xs">
                                Action 4
                              </button>
                            </div>
                            <div className="mb-6">
                              <button type="button" className="btn btn-primary waves-effect waves-light w-xs">
                                Action 5
                              </button>
                            </div>
                            <div className="mb-6">
                              <button type="button" className="btn btn-primary waves-effect waves-light w-xs">
                                Action 6
                              </button>
                            </div>
                          </div>
                        </Row>
                      </CardBody>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
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
      }
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  loading: state.clientReducer.loading,
  clientDetails: state.clientReducer.clientDetails,
  editError: state.clientReducer.editError,
  editErrorDetials: state.clientReducer.editErrorDetails,
  updatedClientDetails: state.clientReducer.updatedClientDetails,
  editSuccess: state.clientReducer.editSuccess,
  usersDocs: state.usersReducer.docs
});

export default connect(mapStateToProps, null)(withTranslation()(ClientDetails));