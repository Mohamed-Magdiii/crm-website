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

import { 
  addNewClient, addNewClientSuccess, apiError
} from "../../store/client/actions";
import CountryDropDown from "../../components/Common/CountryDropDown";
function ClientForm(props){

  const [addModal, setAddUserModal] = useState(false);

  const dispatch = useDispatch();

  const handleAddLead = (event, values) => {
    event.preventDefault();
    dispatch(addNewClient(values));
    setTimeout(()=>{
      dispatch(addNewClientSuccess(""));
      dispatch(apiError(""));
    }, 2000);
  }; 

  const toggleAddModal = () => {
    setAddUserModal(!addModal);
  };

  useEffect(() => {
    if (props.successMessage  && addModal) {
      setTimeout(()=>{
        setAddUserModal(false);
      }, 2000);
    }
  }, [props.successMessage]);

  return (
    <React.Fragment >
      <Link to="#" className="btn btn-light" onClick={toggleAddModal}><i className="bx bx-plus me-1"></i>{props.t("Add New")}</Link>
      <Modal isOpen={addModal} toggle={toggleAddModal} centered={true}>
        <ModalHeader toggle={toggleAddModal} tag="h4">
          {props.t("Add New Client")}
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
                {props.t("Add new Client")}
              </Button>
            </div>
          </AvForm>
          {props.error && <UncontrolledAlert color="danger">
            <i className="mdi mdi-block-helper me-2"></i>
            {props.t(props.error)}
          </UncontrolledAlert>}
          {props.successMessage && <UncontrolledAlert color="success">
            <i className="mdi mdi-check-all me-2"></i>
            {props.t("Client Added successfully !!!")}
          </UncontrolledAlert>}
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}
const mapStateToProps = (state) => ({
  error: state.clientReducer.error,
  successMessage: state.clientReducer.successMessage,
});
export default connect(mapStateToProps, null)(withTranslation()(ClientForm));