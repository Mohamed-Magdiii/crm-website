// a modal to only edit title and action
import React, { useEffect } from "react";
import {
  useDispatch, connect
} from "react-redux";
import {
  Modal, Button,
  ModalHeader,
  ModalBody,
  UncontrolledAlert,
} from "reactstrap";
import {
  AvForm, AvField
} from "availity-reactstrap-validation";

import { editBankAccount } from "store/client/actions";
// i18n
import { withTranslation } from "react-i18next";

function BankAccountEditModal(props){
  const { open, selectedBankAccount = {}, onClose } = props;
  const dispatch = useDispatch();
  const handleEditSystemEmail = (e, values) => {
    dispatch(editBankAccount({
      id: selectedBankAccount.id,
      values
    }));
  };
  useEffect(()=>{
    if (props.bankAccountEditClearingCounter > 0 && open) {
      onClose();
    }
  }, [props.bankAccountEditClearingCounter]);

  return (
    <React.Fragment >
      <Modal isOpen={open} toggle={onClose} centered={true}>
        <ModalHeader toggle={onClose} tag="h4">
          {props.t("Edit bank account")}
        </ModalHeader>
        <ModalBody >
          <AvForm
            className='p-4'
            onValidSubmit={(e, v) => {
              handleEditSystemEmail(e, v);
              props.bankAccountUpdateHandler();
            }}
          >
            <div className="mb-3">
              <AvField
                name="bankName"
                label={props.t("Bank name")}
                placeholder={props.t("Bank name")}
                type="text"
                value={selectedBankAccount.bankName}
                errorMessage={props.t("Bank name is required")}
                validate={{ required: { value: true } }}
              />
            </div>

            <div className="mb-3">
              <AvField
                name="swiftCode"
                label={props.t("Swift code")}
                placeholder={props.t("Swift code")}
                type="text"
                value={selectedBankAccount.swiftCode}
                errorMessage={props.t("Swift code is required")}
                validate={{ required: { value: true } }}
              />
            </div>

            <div className="mb-3">
              <AvField
                name="iban"
                label={props.t("IBAN")}
                placeholder={props.t("IBAN")}
                type="text"
                value={selectedBankAccount.swiftCode}
                errorMessage={props.t("IBAN is required")}
                validate={{ required: { value: true } }}
              />
            </div>

            <div className="mb-3">
              <AvField
                name="accountNumber"
                label={props.t("Account number")}
                placeholder={props.t("Account number")}
                type="text"
                value={selectedBankAccount.accountNumber}
                errorMessage={props.t("Account number is required")}
                validate={{ required: { value: true } }}
              />
            </div>

            <div className="mb-3">
              <AvField
                name="currency"
                label={props.t("Currency")}
                placeholder={props.t("Currency")}
                type="text"
                value={selectedBankAccount.currency}
                errorMessage={props.t("Currency is required")}
                validate={{ required: { value: true } }}
              />
            </div>
            {/* submit button */}
            <div className='text-center pt-3 p-2'>
              <Button disabled={props.addLoading} type="submit" color="primary">
                {props.t("Update")}
              </Button>
            </div>
          </AvForm>
          {props.editError && <UncontrolledAlert color="danger">
            <i className="mdi mdi-block-helper me-2"></i>
            {/* TODO this needs to be handled in translation */}
            {props.t(JSON.stringify(props.editError))}
          </UncontrolledAlert>}
          {props.editResult && <UncontrolledAlert color="success">
            <i className="mdi mdi-check-all me-2"></i>
            {props.t("Bank account updated successfully")} !!!
          </UncontrolledAlert>}
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}


const mapStateToProps = (state) => ({
  addLoading: state.clientReducer.addLoading,
  editResult: state.clientReducer.editResult,
  editError: state.clientReducer.editError,
  bankAccountEditClearingCounter: state.clientReducer.bankAccountEditClearingCounter
});

export default connect(mapStateToProps, null)(withTranslation()(BankAccountEditModal));