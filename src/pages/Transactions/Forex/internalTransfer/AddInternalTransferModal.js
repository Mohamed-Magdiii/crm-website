import { useDispatch, connect } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  UncontrolledAlert,
  Label,
  Row,
  Col
} from "reactstrap";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import "../SearchableInputStyles.scss";
import { withTranslation } from "react-i18next";
import Select from "react-select";
import { addInternalTransfer } from "store/forexTransactions/internalTransfers/actions";
import Loader from "components/Common/Loader";
import { fetchTradingAccounts } from "store/tradingAccounts/actions";

function AddInternalTransferModal(props){
  const dispatch = useDispatch();
  const { create } = props.withdrawalsPermissions;
  const [addModal, setAddModal] = useState(false);
  const [accountType, setAccountType] = useState("");
  const [tradingAccountOwnerName, setTradingAccountOwnerName] = useState();
  const [toAccount, setToAccount] = useState();
  const [transferTo, setTransferTo] = useState();
  const [tradingAccountLogin, setTradingAccountLogin] = useState();

  // account type options
  const accountTypeOptions = [
    {
      label: "Live Account",
      value: "liveAccount"
    },
    {
      label: "IB Account (Individual)",
      value: "ibAccount"
    }
  ];

  // transfer to options
  const transferToOptions = [
    {
      label: "Own Account",
      value: "ownAccount"
    },
    {
      label: "Client's Account",
      value: "clientAccount"
    }
  ];

  // in case of IB transfer, transfer to account oprions
  const transferToAccountOptions = props.tradingAccountsByCustomerId?.map((item) => (
    {
      label: `${item.login}-${item.platform}`,
      value: item.login
    }
  ));
  
  const toggleAddModal = () => {
    setAddModal(!addModal);
    setTradingAccountOwnerName("");
    setTransferTo("");
  };

  useEffect(() => {
    if (!props.disableAddButton && open ){
      setAddModal(false);
    }
  }, [props.modalClear]);

  const handleAddForexDeposit = (e, v) => {
    dispatch(addInternalTransfer(v));
  };

  const loadTradingAccounts = (login)=>{
    dispatch(fetchTradingAccounts({ login: +login }));   
  };

  const loadTradingAccountsByCustomerId = (customerId)=>{
    dispatch(fetchTradingAccounts({ customerId }));   
  };

  const handleLiveAccountChange = (e) => {
    setTradingAccountLogin(e.target.value);
    loadTradingAccounts(e.target.value);
  };
  
  useEffect(() => {
    loadTradingAccountsByCustomerId(props.tradingAccounts[0]?.customerId._id);
  }, props.tradingAccounts);

  useEffect(() => {
    setTradingAccountOwnerName(
      props.tradingAccounts.filter((item) => (item.login == tradingAccountLogin))[0]?.customerId.firstName + 
      " " +
      props.tradingAccounts.filter((item) => (item.login == tradingAccountLogin))[0]?.customerId.lastName 
    );
  }, [props.fetchTradingAccountsLoading]);

  const validateLiveAccount = (value, ctx, input, cb) =>{
    if (!props.tradingAccounts.map((item) => (item.login))[0] == value || props.fetchTradingAccountsFail){
      cb("Enter A Valid Live Account");
    } else cb(true);
  };

  return (
    <React.Fragment >
      <Link to="#" className={`btn btn-primary ${!create ? "d-none" : ""}`} onClick={toggleAddModal}>
        <i className="bx bx-plus me-1" /> 
        {props.t("Add New Internal Transfer")}
      </Link>
      <Modal isOpen={addModal} toggle={toggleAddModal} centered={true}>
        <ModalHeader toggle={toggleAddModal} tag="h4">
          {props.t("Add New Internal Transfer")}
        </ModalHeader>
        <ModalBody >
          <AvForm
            className='p-4'
            onValidSubmit={(e, v) => {
              // v.accountType = accountType;
              v.customerId = props.tradingAccounts.filter((item) => (item.login == v.liveAccount))[0]?.customerId._id;
              v.tradingAccountFrom = props.tradingAccounts.filter((item) => (item.login == v.fromAccount))[0]?._id;
              v.tradingAccountTo = toAccount;
              v.transferToAccount = transferTo;
              delete v.account;
              delete v.customerName;
              delete v.accountType;
              handleAddForexDeposit(e, v);
            }}
          >
            {/* account type live or IB (individual) */}
            <Row className="mb-3">
              <Col md="12">
                <Label>{props.t("Account Type")}</Label>
                <div>
                  <Select 
                    required
                    onChange={(e) => {
                      setAccountType(e.value);
                    }}
                    isSearchable = {true}
                    options={accountTypeOptions}
                    classNamePrefix="select2-selection"
                    placeholder = "Choose An Account Type"
                  />
                </div>
              </Col>
            </Row>

            {/* account */}
            <Row className="mb-3">
              <Col md="12">
                <AvField
                  name="fromAccount"
                  label={props.t("From Account")}
                  placeholder={props.t("Enter An Account")}
                  type="text"
                  errorMessage={props.t("Enter A Valid Account")}
                  validate = {{
                    required :{ value:true },
                    custom:validateLiveAccount
                  }}
                  onChange={(e) => {
                    handleLiveAccountChange(e);
                  }}
                  onKeyPress={(e) => {
                    if (!isNaN(e.key) && e.target.value.length > 0){
                      return true;
                    }
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
              </Col>
            </Row>

            {/* customer name */}
            <Row className="mb-3">
              <Col md="12">
                <AvField
                  readOnly={true}
                  value={props.tradingAccounts?.length != 0 && tradingAccountOwnerName}
                  name="customerName"
                  label={props.t("Customer Name")}
                  placeholder={props.t("Customer Name")}
                  type="text"
                  errorMessage={props.t("Enter A Valid Live Account")}
                  validate = {{
                    required :{ value:true }
                  }}
                />
              </Col>
            </Row>

            {/* transfer to */}
            {
              accountType === "ibAccount" && 
            <Row className="mb-3">
              <Col md="12">
                <Label>{props.t("Transfer To")}</Label>
                <div>
                  <Select 
                    required
                    onChange={(e) => {
                      setTransferTo(e.value.gateway);
                    }}
                    isSearchable = {true}
                    options={transferToOptions}
                    classNamePrefix="select2-selection"
                    placeholder = "Choose An option"    
                  />
                </div>
              </Col>
            </Row>
            }

            {/* to account */}
            <Row className="mb-3">
              <Col md="12">
                <Label>{props.t("To Account")}</Label>
                <div>
                  <Select 
                    required
                    onChange={(e) => {
                      setToAccount(e.value.gateway);
                    }}
                    options={
                      transferTo === "clientAccount"
                        ?
                        transferToAccountOptions
                        :
                        transferToAccountOptions
                    }
                    isSearchable = {true}
                    classNamePrefix="select2-selection"
                    placeholder = "Choose An Account"    
                  />
                </div>
              </Col>
            </Row>

            {/* amount */}
            <Row className="mb-3">
              <Col md="12">
                <AvField
                  name="amount"
                  label={props.t("Amount")}
                  placeholder={props.t("Enter Amount")}
                  type="number"
                  min="1"
                  errorMessage={props.t("Enter Valid Amount")}
                  validate = {{
                    required :{ value:true }
                  }}
                />
              </Col>
            </Row>

            {/* note */}
            <Row className="mb-3">
              <AvField
                name="note"
                label={props.t("Note")}
                placeholder={props.t("Enter Note")}
                type="text"
                errorMessage={props.t("Enter Valid Note")}
              />
            </Row>
    
            <div className='text-center pt-3 p-2'>
              {
                props.addInternalTransferLoading 
                  ?
                  <Loader />
                  :
                  <Button 
                    disabled = {props.addInternalTransferLoading} 
                    type="submit" 
                    color="primary"
                  >
                    {props.t("Add")}
                  </Button>
              }
            </div>
          </AvForm>
          {props.addinternalTransferFailDetails && <UncontrolledAlert color="danger">
            <i className="mdi mdi-block-helper me-2" />
            {props.t(props.addinternalTransferFailDetails)}
          </UncontrolledAlert>}
        </ModalBody> 
      </Modal>
    </React.Fragment>
  );
}
const mapStateToProps = (state) => ({
  withdrawalsPermissions : state.Profile.withdrawalsPermissions || {}, 
  modalClear: state.internalTransferReducer.modalClear,
  disableAddButton : state.internalTransferReducer.disableAddButton,
  addInternalTransferLoading: state.internalTransferReducer.addInternalTransferLoading,
  addinternalTransferFailDetails: state.internalTransferReducer.addinternalTransferFailDetails,
  tradingAccounts: state.tradingAccountReducer.tradingAccounts,
  fetchTradingAccountsLoading: state.tradingAccountReducer.loading,
  tradingAccountsByCustomerId: state.tradingAccountReducer.tradingAccountsByCustomerId
});
export default connect(mapStateToProps, null)(withTranslation()(AddInternalTransferModal));