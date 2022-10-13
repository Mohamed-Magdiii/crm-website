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
import { fetchTradingAccounts } from "store/tradingAccounts/actions";

function AddForexWithdrawalModal(props){
  const dispatch = useDispatch();
  const customerId = JSON.parse(localStorage.getItem("authUser")).roleId._id;
  const { create } = props.withdrawalsPermissions;
  const [addModal, setAddModal] = useState(false);
  const [gateway, setGateway] = useState("");
  const [accountType, setAccuntType] = useState("");
  const [tradingAccountOwnerName, setTradingAccountOwnerName] = useState();
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
  
  const toggleAddModal = () => {
    setAddModal(!addModal);
    setTradingAccountOwnerName("");
  };

  useEffect(() => {
    if (!props.disableAddButton && open ){
      setAddModal(false);
    }
  }, [props.modalClear]);

  const handleAddForexDeposit = (e, v) => {
    dispatch(addForexWithdrawal(v));
  };

  const loadTradingAccounts = (login)=>{
    dispatch(fetchTradingAccounts({ login }));   
  };

  const handleLiveAccountChange = (e) => {
    setTradingAccountLogin(e.target.value);
    loadTradingAccounts(e.target.value);
    
  };

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
      <Link to="#" className={`btn btn-primary ${!create ? "d-none" : ""}`} onClick={toggleAddModal}><i className="bx bx-plus me-1"></i> {props.t("Add New Withdrawal")}</Link>
      <Modal isOpen={addModal} toggle={toggleAddModal} centered={true}>
        <ModalHeader toggle={toggleAddModal} tag="h4">
          {props.t("Add New Withdrawal")}
        </ModalHeader>
        <ModalBody >
          <AvForm
            className='p-4'
            onValidSubmit={(e, v) => {
              v.gateway = gateway;
              v.accountType = accountType;
              v.customerId = props.tradingAccounts.filter((item) => (item.login == v.liveAccount))[0]?.customerId._id;
              v.tradingAccountId = props.tradingAccounts.filter((item) => (item.login == v.account))[0]?._id;
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
                      setAccuntType(e.value);
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
                  name="account"
                  label={props.t("Account")}
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

            {/* gateway */}
            <Row className="mb-3">
              <Col md="12">
                <Label>{props.t("Gateway")}</Label>
                <div>
                  <Select 
                    required
                    onChange={(e) => {
                      setGateway(e.value.gateway);
                    }}
                    isSearchable = {true}
                    options={Object.keys(props.forexWithdrawalsGateways).map((key) => (
                      {
                        label : `${props.forexWithdrawalsGateways[key]}`,
                        value : {
                          gateway: `${props.forexWithdrawalsGateways[key]}`
                        }
                      }
  
                    ))}
                    classNamePrefix="select2-selection"
                    placeholder = "Choose A Gateway"    
                  />
                </div>
              </Col>
            </Row>

            {/* amount */}
            <Row className="mb-3">
              <Col md="6">
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
                props.withdrawalAddLoading 
                  ?
                  <Loader />
                  :
                  <Button 
                    disabled = {props.withdrawalAddLoading} 
                    type="submit" 
                    color="primary"
                  >
                    {props.t("Add")}
                  </Button>
              }
            </div>
          </AvForm>
          {props.addForexWithdrawalFailDetails && <UncontrolledAlert color="danger">
            <i className="mdi mdi-block-helper me-2" />
            {props.t(props.addForexWithdrawalFailDetails)}
          </UncontrolledAlert>}
        </ModalBody> 
      </Modal>
    </React.Fragment>
  );
}
const mapStateToProps = (state) => ({
  forexWithdrawalsGateways: state.forexGatewayReducer.forexWithdrawalsGateways || [],
  withdrawalsPermissions : state.Profile.withdrawalsPermissions || {}, 
  modalClear: state.forexWithdrawalReducer.modalClear,
  disableAddButton : state.forexWithdrawalReducer.disableAddButton,
  withdrawalAddLoading: state.forexWithdrawalReducer.withdrawalAddLoading,
  addForexWithdrawalFailDetails: state.forexWithdrawalReducer.addForexWithdrawalFailDetails,
  tradingAccounts: state.tradingAccountReducer.tradingAccounts,
  fetchTradingAccountsLoading: state.tradingAccountReducer.loading
});
export default connect(mapStateToProps, null)(withTranslation()(AddForexWithdrawalModal));