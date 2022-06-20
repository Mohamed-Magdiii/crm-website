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
import { fetchWalletStart, clearWallets } from "store/wallet/action";
import { fetchClientsStart } from "store/client/actions";
import { withTranslation } from "react-i18next";
import Select from "react-select";
function WithdrawForm(props){

  const [open, setWithdrawalModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedWalletId, setSelectedWalletId] = useState("");
  const [gateway, setGateway] = useState("");
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
  const selectClient = (id)=>{
    setSelectedClient(id);
    dispatch(fetchWalletStart({
      belongsTo:id
    }));
     
  };
  const toggleAddModal = () => {
    setWithdrawalModal(!open);
  };
  useEffect(()=>{
    dispatch(fetchClientsStart({
      page:1,
      limit:10
    }));
    dispatch(fetchGatewaysOfWithdrawalsStart());
    if (searchInput.length >= 3){
      dispatch(fetchClientsStart({
        searchText:searchInput
      }));
    }
  
  }, [searchInput]);
  useEffect(() => {
    if (props.modalClear && open){
      setWithdrawalModal(false);
    }
  }, [props.modalClear]);
  
  
  return (
    <React.Fragment >
      <Link to="#" className={`btn btn-primary ${!create ? "d-none" : ""}`} onClick={toggleAddModal}><i className="bx bx-plus me-1"></i> {props.t("Withdraw")}</Link>
      <Modal isOpen={open} toggle={toggleAddModal} centered={true}>
        <ModalHeader toggle={toggleAddModal} tag="h4">
          {props.t("Withdraw")}
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
                <Label>{props.t("Client")}</Label>
                <div>
                  <Select 
                    onChange={(e) => {
                    
                      selectClient(e.value.id);
                    
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
                    placeholder = "Select the client"
                    onInputChange = {(e)=>setSearchInput(e)}
                    name = "clientId"
                    
                    isRequired = {true}
                  />
                </div>
              
              </Col>
              <Col md="6">
                <Label>{props.t("Wallet")}</Label>
                <div>
                  <Select 
                    onChange={(e) => {
                    
                      setSelectedWalletId(e.value.id);
                    
                    }}
                    isSearchable = {true}
                    options={props.wallets.map((wallet) => (
                      {
                        label : `${wallet.asset} ${wallet.amount} ${wallet.asset}`,
                        value : {
                          id: `${wallet._id}`
                        }
                      }

                    ))}
                    classNamePrefix="select2-selection"
                    placeholder = "Select the wallet"

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
                        gateway : `${props.gateways[key]}`
                      }
                    }

                  ))}
                  classNamePrefix="select2-selection"
                  placeholder = "Select the gateway"
                 
                />
              </div>
            
            </div>
            
               
            <div className="mb-3">
              <AvField
                name="amount"
                label={props.t("Amount")}
                placeholder={props.t("Amount")}
                type="text"
                errorMessage={props.t("Enter Valid Amount")}
                validate={{ required: { value: true } }}
                

              />
            </div>
            <div className="mb-3">
              <AvField
                name="note"
                label={props.t("Note")}
                placeholder={props.t("Note")}
                type="text"
                errorMessage={props.t("Enter Valid Note")}
                validate={{ required: { value: true } }}
              />
            </div>
    
            <div className='text-center pt-3 p-2'>
              <Button  type="submit" color="primary" className="">
                {props.t("Make Withdraw")}
              </Button>
            </div>
          </AvForm>
          {props.error && <UncontrolledAlert color="danger">
            <i className="mdi mdi-block-helper me-2"></i>
            {props.t(props.error)}
          </UncontrolledAlert>}
          {props.withdrawResponseMessage && <UncontrolledAlert color="success">
            <i className="mdi mdi-check-all me-2"></i>
            {props.t(`Withdraw has been ${props.withdrawResponseMessage} `)}
          </UncontrolledAlert>}
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}
const mapStateToProps = (state) => ({
  gateways:state.gatewayReducer.gateways || [],
  error: state.withdrawalReducer.error,
  withdrawResponseMessage:state.withdrawalReducer.withdrawResponseMessage,
  modalClear:state.withdrawalReducer.modalClear,
  clients:state.clientReducer.clients || [],
  wallets:state.walletReducer.wallets || [],
  withdrawalsPermissions: state.Profile.withdrawalsPermissions || {}
});
export default connect(mapStateToProps, null)(withTranslation()(WithdrawForm));