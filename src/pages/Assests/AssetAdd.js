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
import { addNewSymbol } from "store/assests/actions";
import { withTranslation } from "react-i18next";
function AssestForm(props){

  const [addModal, setAddUserModal] = useState(false);

  const dispatch = useDispatch();
  const { create} = props.symbolsPermissions;
  const handleAddLead = (event, values) => {
    event.preventDefault();
    dispatch(addNewSymbol(values));
    
  }; 

  const toggleAddModal = () => {
    setAddUserModal(!addModal);
  };

  useEffect(() => {
    if (!props.addSymbolSuccessMessage  && addModal) {
      
      setAddUserModal(false);
      
    }
  }, [props.addSymbolSuccessMessage]);

  return (
    <React.Fragment >
      <Link to="#" className={`btn btn-primary ${!create ? "d-none" : ""}`} onClick={toggleAddModal}><i className="bx bx-plus me-1"></i>{props.t("Add New Symbol")}</Link>
      <Modal isOpen={addModal} toggle={toggleAddModal} centered={true}>
        <ModalHeader toggle={toggleAddModal} tag="h4">
          {props.t("Add New Symbol")}
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
                    name="name"
                    label={props.t("Name")}
                    placeholder={props.t("Name")}
                    type="text"
                    errorMessage={props.t("Enter name of the symbol")}
                    validate={{ required: { value: true } }}
                  />
                </div>
              </Col>
              <Col md="6"> 
                <div className="mb-3">
                  <AvField
                    name="symbol"
                    label={props.t("Symbol")}
                    placeholder={props.t("Symbol")}
                    type="text"
                    errorMessage={props.t("Enter symbol")}
                    validate={{ required: { value: true } }}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <div className="mb-3">
                  <AvField
                    name="description"
                    label={props.t("Description")}
                    placeholder={props.t("Description")}
                    type="text"
                    errorMessage={props.t("Enter description")}
                    validate={{ required: { value: true } }}
                  />
                </div>
              </Col>
              <Col md="6">
                <div className="mb-3">
                  <AvField
                    name="markup"
                    label={props.t("Mark up")}
                    placeholder={props.t("Markup")}
                    type="text"
                    errorMessage={props.t("Enter valid markup")}
                    validate={{ required: { value: true } }}
                  />
                </div>
              </Col>
            </Row> 
            <Row>
              <Col md="6">
                <div className="mb-3">
                  <AvField
                    name="depositFee"
                    label={props.t("Desposit Fee")}
                    placeholder={props.t("Desposit Fee")}
                    type="text"
                    errorMessage={props.t("Enter valid deposit fee")}
                    validate={{ required: { value: true } }}
                  />
                </div>
              </Col>
              <Col md="6"> 
                <div className="mb-3">
                  <AvField
                    name="withdrawFee"
                    label={props.t("Withdraw Fee")}
                    placeholder={props.t("Withdraw Fee")}
                    type="text"
                    errorMessage={props.t("Enter valid withdraw fee")}
                    validate={{ required: { value: true } }}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <div className="mb-3">
                  <AvField
                    name="minDepositAmount"
                    label={props.t("Min Deposit Amount")}
                    placeholder={props.t("deposit amount")}
                    type="text"
                    errorMessage={props.t("Enter valid deposit amount")}
                    validate={{ required: { value: true } }}
                  />
                </div>
              </Col>
              <Col md="6"> 
                <div className="mb-3">
                  <AvField
                    name="minWithdrawAmount"
                    label={props.t("Min Withdraw Amount")}
                    placeholder={props.t("withdraw amount")}
                    type="text"
                    errorMessage={props.t("Enter valid withdraw amount")}
                    validate={{ required: { value: true } }}
                  />
                </div>
              </Col>
            </Row>
            <div className="mb-3">
              <AvField
                name="explorerLink"
                label={props.t("Link")}
                placeholder={props.t("explorer link")}
                type="text"
                errorMessage={props.t("explorer link")}
                validate={{ required: { value: true } }}
              />
            </div>
            
            <div className='text-center pt-3 p-2'>
              <Button  type="submit" color="primary" className="">
                {props.t("Add New Symbol")}
              </Button>
            </div>
          </AvForm>
          {props.error && <UncontrolledAlert color="danger">
            <i className="mdi mdi-block-helper me-2"></i>
            {props.t(props.error)}
          </UncontrolledAlert>}
          {props.addSymbolSuccessMessage && <UncontrolledAlert color="success">
            <i className="mdi mdi-check-all me-2"></i>
            {props.t("Symbol Added successfully !!!")}
          </UncontrolledAlert>}
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}
const mapStateToProps = (state) => ({
  error: state.assetReducer.error,
  addSymbolSuccessMessage: state.assetReducer.addSymbolSuccessMessage,
  symbolsPermissions: state.Profile.symbolsPermissions || {}
});
export default connect(mapStateToProps, null)(withTranslation()(AssestForm));