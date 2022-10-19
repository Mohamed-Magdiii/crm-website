import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  useDispatch, connect
} from "react-redux";
import {
  Modal, ModalHeader,
  ModalBody,
  Row, Col, Button
} from "reactstrap";
import {
  AvForm, AvField, AvRadio, AvRadioGroup
} from "availity-reactstrap-validation";
import { withTranslation } from "react-i18next";

import { createTradingAccount } from "store/tradingAccounts/actions";
import { ACCOUNT_TYPES } from "common/data/trading-account";
import AvFieldSelect from "components/Common/AvFieldSelect";

function CreateTradingAccount (props) {
  const [addModal, setAddAccountModal] = useState(false);
  
  const dispatch = useDispatch();
  const { create = true } = props.tradingAccountPermission;
  const toggleAddModal = () => {
    setAddAccountModal(!addModal);
    if (props.onClose) {
      props.onClose();
    }
  };
  const handleCreateAccount = (e, values) => {
    dispatch(createTradingAccount(values));
  };
  useEffect(()=>{
    if (props.clearingCounter > 0 && addModal) {
      setAddAccountModal(false);
      if (props.onClose) {
        props.onClose();
      }
    }
  }, [props.clearingCounter]);

  useEffect(()=>{
    setAddAccountModal(props.show);
  }, [props.show]);

  const [accObj, setAccObj] = useState({
    platform: "MT5",
    type: ACCOUNT_TYPES.DEMO,
    accountTypes: [],
  });

  useEffect(()=>{
    setAccObj({
      ...accObj,
      accountTypes: props.accountTypes.filter((obj) =>
        obj.type === accObj.type && obj.platform === accObj.platform
      )
    });
  }, [accObj.platform, accObj.type, props.accountTypes]);

  useEffect(()=>{
    if (props.createCounter > 0 && addModal) {
      setAddAccountModal(false);
    }
  }, [props.createCounter]);


  return (
    <React.Fragment >
      {!props.hidenAddButton &&
        <Link to="#"  className={`btn btn-primary ${!create ? "d-none" : ""}`} onClick={toggleAddModal}><i className="bx bx-plus me-1"></i> Create Trading Account</Link>
      }
      <Modal isOpen={addModal} toggle={toggleAddModal} centered={true}>
        <ModalHeader toggle={toggleAddModal} tag="h4">
            Create Trading Account
        </ModalHeader>
        <ModalBody >
          <AvForm onValidSubmit={handleCreateAccount}>
            <Row form>

              <Col className="col-12 mb-3">
                <AvField
                  name="customerId"
                  type="hidden"
                  value={props.customerId}                />
              </Col>
              <Col className="col-12 mb-3">
                <AvRadioGroup
                  inline
                  name="platform"
                  value={accObj.platform}
                  label={props.t("Platform")}
                  required
                  onChange={(e)=> {
                    setAccObj({
                      ...accObj,
                      platform: e.target.value,
                    });
                  }}
                >
                  <AvRadio label={props.t("MT5")} value={"MT5"} />
                  <AvRadio label={props.t("MT4")} value={"MT4"} />
                </AvRadioGroup>
              </Col>
              <Col className="col-12 mb-3">
                <AvRadioGroup
                  inline
                  name="type"
                  value={accObj.type}
                  label={props.t("Type")}
                  required
                  onChange={(e)=> {
                    setAccObj({
                      ...accObj,
                      type: e.target.value,
                    });
                  }}
                >
                  <AvRadio label={props.t(ACCOUNT_TYPES.DEMO)} value={ACCOUNT_TYPES.DEMO} />
                  <AvRadio label={props.t(ACCOUNT_TYPES.LIVE)} value={ACCOUNT_TYPES.LIVE} />
                </AvRadioGroup>
              </Col>
              <Col className="col-12 mb-3">
                <AvFieldSelect 
                  name="accountTypeId"
                  label={props.t("Account Type")}
                  errorMessage={props.t("Account Type is required")}
                  validate={{ required: { value: true } }}
                  value={accObj.accountTypes[0] && accObj.accountTypes[0]._id || ""}
                  options={accObj.accountTypes.map((obj)=>{
                    return ({
                      label: `${obj.title}`, 
                      value: obj._id
                    });
                  })} 
                />
              </Col>
              

            </Row>
            <Row>
              <Col>
                <div className="text-end">
                  <Button disabled={props.creating} type="submit" color="primary" className="">
                    Create
                  </Button>
                </div>
              </Col>
            </Row>
          </AvForm>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}


const mapStateToProps = (state) => ({
  accountTypes: state.tradingAccountsReducer.accountTypes || [],
  tradingAccountPermission: state.Profile.todosPermissions || {},
  createCounter: state.tradingAccountsReducer.createCounter || 0,
  creating: state.tradingAccountsReducer.creating || false,
});
export default connect(mapStateToProps, null)(withTranslation()(CreateTradingAccount));
