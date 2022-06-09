import React, { useState, useEffect } from "react";
import {
  Link
} from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import {
  Modal, Button, ModalHeader, ModalBody, UncontrolledAlert 
} from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";

import { addBankAccount } from "store/bankAccount/actions";
// i18n
import { withTranslation } from "react-i18next";

function ClientAddBankAccountModal(props){
  const [addModal, setAddModal] = useState(false);
  const dispatch = useDispatch();
  const addBankAccountHandler = (e, values) => {
    dispatch(addBankAccount(values));
  };
  const toggleAddModal = () => {
    setAddModal(!addModal);
  };
  useEffect(()=>{
    if (props.addClearingCounter > 0 && addModal) {
      setAddModal(false);
    }
  }, [props.addClearingCounter]);
  
  return (
    <React.Fragment >
      <Link to="#" className="btn btn-light" onClick={toggleAddModal}>
        <i className="bx bx-plus me-1"></i> {props.t("Add new")} 
      </Link>
      <Modal isOpen={addModal} toggle={toggleAddModal} centered={true}>
        <ModalHeader toggle={toggleAddModal} tag="h4">
          {props.t("Add new bank account")} 
        </ModalHeader>
        <ModalBody >
          <AvForm
            className='p-4' 
            onValidSubmit={(e, v) => {
              addBankAccountHandler(e, v);
            }}
          >
            <div className="mb-3">
              <AvField
                name="accountHolderName"
                label={props.t("Account owner name")}
                placeholder={props.t("Account owner name")}
                type="text"
                errorMessage={props.t("Owner name is required")}
                validate={{ required: { value: true } }}
              />
            </div>

            <div className="mb-3">
              <AvField
                name="bankName"
                label={props.t("Bank name")}
                placeholder={props.t("Bank name")}
                type="text"
                errorMessage={props.t("Bank name is required")}
                validate={{ required: { value: true } }}
              />
            </div>

            <div className="mb-3">
              <AvField
                name="accountNumber"
                label={props.t("Account number")}
                placeholder={props.t("Account number")}
                type="text"
                errorMessage={props.t("Account number is required")}
                validate={{ required: { value: true } }}
              />
            </div>

            <div className="mb-3">
              <AvField
                name="swiftCode"
                label={props.t("Swift code")}
                placeholder={props.t("Swift code")}
                type="text"
                errorMessage={props.t("swift code is required")}
                validate={{ required: { value: true } }}
              />
            </div>

            <div className="mb-3">
              <AvField
                name="address"
                label={props.t("Address")}
                placeholder={props.t("Address")}
                type="text"
                errorMessage={props.t("Address is required")}
                validate={{ required: { value: true } }}
              />
            </div>

            <div className="mb-3">
              <AvField
                name="iban"
                label={props.t("IBAN")}
                placeholder={props.t("IBAN")}
                type="text"
                errorMessage={props.t("Iban is required")}
                validate={{ required: { value: true } }}
              />
            </div>

            <div className="mb-3">
              <AvField
                name="currency"
                label={props.t("Currency")}
                placeholder={props.t("Currency")}
                type="text"
                errorMessage={props.t("Currency is required")}
                validate={{ required: { value: true } }}
              />
            </div>

            <div className="mb-3">
              <AvField
                name="customerId"
                label={props.t("Customer Id")}
                placeholder={props.t("Customer Id")}
                type="text"
                errorMessage={props.t("Customer Id is required")}
                validate={{ required: { value: true } }}
              />
            </div>
            <div className='text-center pt-3 p-2'>
              {/* on clicking this button it switches from the list component to the edit component if 
                  submission is valid but it adds the new system email to the db onValidSubmit above */}
              <Button disabled={props.addLoading} type="submit" color="primary">
                {props.t("Add")}
              </Button>
            </div>
          </AvForm>
          {props.addError && <UncontrolledAlert color="danger">
            <i className="mdi mdi-block-helper me-2"></i>
            {/* TODO this needs to be handled in translation */}
            {props.t(JSON.stringify(props.addErrorDetails))}
          </UncontrolledAlert>}
          {props.addSuccess && <UncontrolledAlert color="success">
            <i className="mdi mdi-check-all me-2"></i>
            {props.t("Bank account added successfully")} !!!
          </UncontrolledAlert>}
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  addLoading: state.bankAccountReducer.addLoading,
  addErrorDetails: state.bankAccountReducer.addErrorDetails,
  addSuccess: state.bankAccountReducer.addSuccess,
  addError: state.bankAccountReducer.addError,  
  addClearingCounter: state.bankAccountReducer.addClearingCounter
});

export default connect(mapStateToProps, null)(withTranslation()(ClientAddBankAccountModal));