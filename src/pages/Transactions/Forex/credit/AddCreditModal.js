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
import Loader from "components/Common/Loader";
import { addCredit } from "store/forexTransactions/credit/actions";
import { fetchTradingAccounts } from "store/tradingAccounts/actions";

function AddCreditModal(props){
  const dispatch = useDispatch();
  const customerId = JSON.parse(localStorage.getItem("authUser")).roleId._id;
  const { create } = props.withdrawalsPermissions;
  const [addModal, setAddModal] = useState(false);
  const [tradingAccountOwnerName, setTradingAccountOwnerName] = useState();
  const [creditType, setCreditType] = useState();
  const [tradingAccountLogin, setTradingAccountLogin] = useState();

  // credit type options
  const creditTypeOptions = [
    {
      label: "Credit In",
      value: "CREDIT_IN"
    },
    {
      label: "Credit Out",
      value: "CREDIT_OUT"
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

  const handleAddCredit = (e, v) => {
    dispatch(addCredit(v));
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
      <Link to="#" className={`btn btn-primary ${!create ? "d-none" : ""}`} onClick={toggleAddModal}><i className="bx bx-plus me-1"></i> {props.t("Add New Credit")}</Link>
      <Modal isOpen={addModal} toggle={toggleAddModal} centered={true}>
        <ModalHeader toggle={toggleAddModal} tag="h4">
          {props.t("Add New Credit")}
        </ModalHeader>
        <ModalBody >
          <AvForm
            className='p-4'
            onValidSubmit={(e, v) => {
              v.customerId = customerId;
              v.tradingAccountId = props.tradingAccounts.filter((item) => (item.login == v.liveAccount))[0]?._id;
              v.type = creditType;
              delete v.account;
              delete v.customerName;
              delete v.accountType;
              delete v.liveAccount;
              handleAddCredit(e, v);
            }}
          >
            {/* live account */}
            <Row className="mb-3">
              <Col md="12">
                <AvField
                  name="liveAccount"
                  label={props.t("Live Account")}
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

            {/* amount and credit type*/}
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

              <Col md="6">
                <Label>{props.t("Credit Type")}</Label>
                <div>
                  <Select 
                    required
                    onChange={(e) => {
                      setCreditType(e.value);
                    }}
                    options={creditTypeOptions}
                    isSearchable = {true}
                    classNamePrefix="select2-selection"
                    placeholder = "Choose An Account"    
                  />
                </div>
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
                props.addCreditLoading 
                  ?
                  <Loader />
                  :
                  <Button 
                    disabled = {props.addCreditLoading} 
                    type="submit" 
                    color="primary"
                  >
                    {props.t("Add")}
                  </Button>
              }
            </div>
          </AvForm>
          {props.addCreditFailDetails && <UncontrolledAlert color="danger">
            <i className="mdi mdi-block-helper me-2" />
            {props.t(props.addCreditFailDetails)}
          </UncontrolledAlert>}
        </ModalBody> 
      </Modal>
    </React.Fragment>
  );
}
const mapStateToProps = (state) => ({
  withdrawalsPermissions : state.Profile.withdrawalsPermissions || {}, 
  modalClear: state.creditReducer.modalClear,
  disableAddButton : state.creditReducer.disableAddButton,
  addCreditLoading: state.creditReducer.addCreditLoading,
  addCreditFailDetails: state.creditReducer.addCreditFailDetails,
  tradingAccounts: state.tradingAccountReducer.tradingAccounts,
  fetchTradingAccountsLoading: state.tradingAccountReducer.loading
});
export default connect(mapStateToProps, null)(withTranslation()(AddCreditModal));