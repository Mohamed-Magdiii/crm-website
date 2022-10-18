import { useDispatch, connect } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  UncontrolledAlert,
  Col,
  Row,
  Label,
} from "reactstrap";

import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { makeWithdrawalStart } from "store/transactions/withdrawal/action";
import { fetchGatewaysOfWithdrawalsStart } from "store/gateway/action";
import { 
  fetchWalletStart, clearWallets, fetchClientWallets 
} from "store/wallet/action";
import { fetchClientsStart } from "store/client/actions";
import { withTranslation } from "react-i18next";
import Select from "react-select";
// import AvFieldSelect from "components/Common/AvFieldSelect";

function WithdrawForm(props){
  const [open, setWithdrawalModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedWalletId, setSelectedWalletId] = useState("");
  const [gateway, setGateway] = useState("");
  const [type, setType] = useState("LIVE");
  const [gatewayError, setGatewayError] = useState(false);

  const gatewayErrorStyle = gatewayError ? "1px solid red" : "1px solid rgb(200, 200, 200)";

  const dispatch = useDispatch();
  const { create } = props.withdrawalsPermissions;
  const handleWithdraw = (event, values) => {
    event.preventDefault();
    dispatch(makeWithdrawalStart({
      customerId:selectedClient,
      walletId: selectedWalletId,
      gateway,
      ...values
    }));
    setSearchInput("");
    dispatch(clearWallets());
    
  }; 

  useEffect(() => {
    selectedClient &&
    dispatch(fetchClientWallets({
      belongsTo: selectedClient
    }));
  }, [selectedClient]);

  const selectType = (type)=>{
    setType(type);
    if (selectedClient.length > 0)
      dispatch(fetchWalletStart({
        belongsTo:selectedClient,
        customerId:selectedClient,
      }));
  };
  const toggleAddModal = () => {
    setWithdrawalModal(!open);
    setGatewayError(false);
  };

  useEffect(()=>{
    dispatch(fetchClientsStart({
      page: 1,
      // type
    }));
    dispatch(fetchGatewaysOfWithdrawalsStart());
    if (searchInput.length >= 3){
      dispatch(fetchClientsStart({
        searchText:searchInput,
        limit:props.totalDocs,
        type
      }));
    }
  }, [searchInput, type, open]);

  useEffect(() => {
    if (props.withdrawalModalClear && open){
      setWithdrawalModal(false);
    }
  }, [props.withdrawalModalClear]);
  
  return (
    <React.Fragment >
      <Link to="#" className={`btn btn-primary ${!create ? "d-none" : ""}`} onClick={toggleAddModal}><i className="bx bx-plus me-1"></i> {props.t("Make Withdraw")}</Link>
      <Modal isOpen={open} toggle={toggleAddModal} centered={true}>
        <ModalHeader toggle={toggleAddModal} tag="h4">
          {props.t("Make Withdraw")}
        </ModalHeader>
        <ModalBody >

          <AvForm
            className='p-4'
            onValidSubmit={(e, v) => {
              handleWithdraw(e, v);
            }}
          >
            
            <Row className="mb-3">
              <Col md="6">                      
                <div>
                  <Label>{props.t("Client")}</Label>
                  <div>
                    <Select 
                      required
                      onChange={(e) => {
                        setSelectedClient(e.value?.id);
                      }}
                      isSearchable = {true}
                      options={props.clients.map((item) => (
                        {
                          label : `${item.firstName} ${item.lastName}`,
                          value : {
                            name: `${item.firstName} ${item.lastName}`,
                            id: `${item._id}`
                          }
                        }
                      ))}
                      classNamePrefix="select2-selection"
                      placeholder={props.t("Choose A Client")}    
                    />
                  </div>
                </div>
              </Col>

              {/* type */}
              <Col md="6">
                <Label>{props.t("Type")}</Label>
                <div>
                  <Select 
                    defaultValue={{
                      label:"Live",
                      value:"LIVE" 
                    }}
                    onChange={(e) => {
                      selectType(e.value);   
                    }}
                    options={[{
                      label:"Live",
                      value:"LIVE" 
                    },
                    {
                      label:"Demo",
                      value:"DEMO"
                    }]}
                    classNamePrefix="select2-selection"
                    placeholder={props.t("choose a type for deposit")}
                  />
                </div>
              </Col>
            </Row>

            <Row className="mb-3">
              {/* wallet */}
              <Col md="12">
                <Label>{props.t("Wallet")}</Label>
                <div>
                  <Select 
                    onChange={(e) => {
                      setSelectedWalletId(e.value.id);
                    }}
                    isSearchable = {true}
                    options={props.wallets.map((wallet) => (
                      {
                        label : `${wallet.asset}-(Balance ${wallet.amount} ${wallet.asset})`,
                        value : {
                          id: `${wallet._id}`
                        }
                      }

                    ))}
                    classNamePrefix="select2-selection"
                    placeholder={props.t("choose your wallet")}
                  />
                </div>
              </Col>
            </Row>
          
            <div className="mb-3">
              <Label>{props.t("Gateway")}</Label>
              <div>
                <Select 
                  onChange={(e) => {
                    setGateway(e.value.gateway);
                  }}
                  isSearchable = {true}
                  options={Object.keys(props.gateways).map((key) => (
                    {
                      label : `${props.gateways[key]}`,
                      value : {
                        gateway: `${props.gateways[key]}`
                      }
                    }
                  ))}
                  classNamePrefix="select2-selection"
                  placeholder = {props.t("Choose Valid Gateway")}
                  style={{
                    border: gatewayErrorStyle
                  }}
                />
                {gatewayError && <small className="text-danger">{props.t("Choose Valid Gateway")}</small>}
              </div>
            </div>
              
            <div className="mb-3">
              <AvField
                name="amount"
                label={props.t("Amount")}
                placeholder={props.t("Enter amount")}
                type="number"
                min="1"
                errorMessage={props.t("Enter Valid Amount")}
                validate = {{
                  required :{ value:true }
                }}
              />
            </div>

            <div className="mb-3">
              <AvField
                name="note"
                label={props.t("Note")}
                placeholder={props.t("Enter Note")}
                type="text"
                errorMessage={props.t("Enter Valid Note")}
                validate={{ 
                  required:{ value: false }
                }}
              />
            </div>
    
            <div className='text-center pt-3 p-2'>
              <Button disabled = {props.disableWithdrawalButton} type="submit" color="primary" className="">
                {props.t("Add")}
              </Button>
            </div>
          </AvForm>
          {props.error && <UncontrolledAlert color="danger">
            <i className="mdi mdi-block-helper me-2"></i>
            {props.t(props.addWithdrawalErrorDetails)}
          </UncontrolledAlert>}

        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}
const mapStateToProps = (state) => ({
  gateways:state.gatewayReducer.gateways || [],
  error: state.withdrawalReducer.addWithdrawalError,
  addWithdrawalErrorDetails: state.withdrawalReducer.addWithdrawalErrorDetails,
  withdrawResponseMessage:state.withdrawalReducer.withdrawResponseMessage,
  withdrawalModalClear:state.withdrawalReducer.withdrawalModalClear,
  clients:state.clientReducer.clients || [],
  wallets:state.walletReducer.docs || [],
  withdrawalsPermissions: state.Profile.withdrawalsPermissions || {}, 
  disableWithdrawalButton : state.withdrawalReducer.disableWithdrawalButton,
  totalDocs:state.clientReducer.totalDocs,
  loading:state.clientReducer.loading
});
export default connect(mapStateToProps, null)(withTranslation()(WithdrawForm));