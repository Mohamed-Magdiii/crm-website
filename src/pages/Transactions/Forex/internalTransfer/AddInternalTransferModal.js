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
import { addForexWithdrawal } from "store/forexTransactions/withdrawals/actions";
import Loader from "components/Common/Loader";

function AddInternalTransferModal(props){
  const dispatch = useDispatch();
  const customerId = JSON.parse(localStorage.getItem("authUser")).roleId._id;
  const { create } = props.withdrawalsPermissions;
  const [addModal, setAddModal] = useState(false);
  const [accountType, setAccountType] = useState("");
  const [tradingAccountOwnerName, setTradingAccountOwnerName] = useState();
  const [toAccount, setToAccount] = useState();
  const [transferToAccount, setTransferToAccount] = useState();

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

  // transfer to account options
  const transferToAccountOptions = [
    {
      label: "Own Account",
      value: "ownAccount"
    },
    {
      label: "Client's Account",
      value: "clientAccount"
    }
  ];
  
  const toggleAddModal = () => {
    setAddModal(!addModal);
    setTradingAccountOwnerName("");
    setTransferToAccount("");
  };

  useEffect(() => {
    if (!props.disableAddButton && open ){
      setAddModal(false);
    }
  }, [props.modalClear]);

  const test = [
    {
      _id: "1",
      customer: "shokr",
      recordId: "10033" 
    },
    {
      _id: "2",
      customer: "abdelrhman",
      recordId: "10044" 
    }
  ];

  const handleAddForexDeposit = (e, v) => {
    dispatch(addForexWithdrawal(v));
  };

  const handleLiveAccountChange = (e) => {
    setTradingAccountOwnerName(test.filter((item) => (item.recordId === e.target.value))[0]?.customer);
  };

  const validateLiveAccount = (value, ctx, input, cb) =>{
    if (!test.map((item) => (item.recordId)).includes(value)){
      cb("Enter A Valid Live Account");
    } else
      cb(true);
  };
  
  return (
    <React.Fragment >
      <Link to="#" className={`btn btn-primary ${!create ? "d-none" : ""}`} onClick={toggleAddModal}><i className="bx bx-plus me-1"></i> {props.t("Add New Withdrawal")}</Link>
      <Modal isOpen={addModal} toggle={toggleAddModal} centered={true}>
        <ModalHeader toggle={toggleAddModal} tag="h4">
          {props.t("Add New Internal Transfer")}
        </ModalHeader>
        <ModalBody >
          <AvForm
            className='p-4'
            onValidSubmit={(e, v) => {
              v.accountType = accountType;
              v.customerId = customerId;
              v.tradingAccountId = test.filter((item) => (item.recordId === v.account))[0]?._id;
              v.toAccount = toAccount;
              v.transferToAccount = transferToAccount;
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
                  value={tradingAccountOwnerName}
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
                      setTransferToAccount(e.value.gateway);
                    }}
                    isSearchable = {true}
                    options={transferToAccountOptions}
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
                props.loading 
                  ?
                  <Loader />
                  :
                  <Button 
                    disabled = {props.loading} 
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
  loading: state.internalTransferReducer.loading,
  addinternalTransferFailDetails: state.internalTransferReducer.addinternalTransferFailDetails,
  tradingAccounts: state.tradingAccountReducer.tradingAccounts
});
export default connect(mapStateToProps, null)(withTranslation()(AddInternalTransferModal));