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
import { fetchGatewaysStart } from "store/gateway/action";
import { addDepositStart } from "store/transactions/deposit/action";
import { fetchWalletStart, clearWallets } from "store/wallet/action";
import { fetchClientsStart } from "store/client/actions";
import "./SearchableInputStyles.scss";
import { withTranslation } from "react-i18next";
import Select from "react-select";
import AvFieldSelect from "components/Common/AvFieldSelect";

function DepositForm(props){
  
  const [addModal, setDepositModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedWalletId, setSelectedWalletId] = useState("");
  const [gateway, setGateway] = useState("");
  const [type, setType] = useState("LIVE");
  const [gatewayError, setGatewayError] = useState(false);
  const dispatch = useDispatch();
  const { create } = props.depositsPermissions;
  const [searchInput, setSearchInput]  = useState("");

  const gatewayErrorStyle = gatewayError ? "1px solid red" : "1px solid rgb(200, 200, 200)";
  console.log(gatewayErrorStyle);

  const handleAddDeposit = (event, values) => {
    event.preventDefault();
    dispatch(addDepositStart({
      customerId: selectedClient,
      walletId: selectedWalletId,
      type: "DEPOSIT",
      gateway,
      ...values
    }));
    setSearchInput("");
    dispatch(clearWallets());
  }; 
  
  const toggleAddModal = () => {
    setDepositModal(!addModal);
  };
  useEffect(()=>{
    dispatch(fetchClientsStart({
      page:1
    }));
    dispatch(fetchGatewaysStart());
    if (searchInput.length >= 3){
      dispatch(fetchClientsStart({
        searchText:searchInput,
        type
      }));
    }
  
  }, [searchInput, type]);

  useEffect(() => {
    if (!props.disableAddButton && open ){
      setDepositModal(false);
      setGatewayError(false);
    }
  }, [props.modalClear]);
  
  const selectClient = (id)=>{
    setSelectedClient(id);
    dispatch(fetchWalletStart({
      belongsTo:id,
      customerId:id,
    }));
  };

  const selectType = (type)=>{
    setType(type);
    if (selectedClient.length > 0)
      dispatch(fetchWalletStart({
        belongsTo:selectedClient,
        customerId:selectedClient,
      }));
  };

  console.log(gatewayError);
  return (
    <React.Fragment >
      <Link to="#" className={`btn btn-primary ${!create ? "d-none" : ""}`} onClick={toggleAddModal}><i className="bx bx-plus me-1"></i> {props.t("Add Deposit")}</Link>
      <Modal isOpen={addModal} toggle={toggleAddModal} centered={true}>
        <ModalHeader toggle={toggleAddModal} tag="h4">
          {props.t("Add Deposit")}
        </ModalHeader>
        <ModalBody >
    
          <AvForm
            className='p-4'
            onValidSubmit={(e, v) => {
              !gateway && setGatewayError(true);
              gateway && selectedWalletId && selectedClient &&
              handleAddDeposit(e, v);
            }}
          >
            <Row className="mb-3">
              <Col md="6">                      
                <div>
                  {/* <AvFieldSelect
                    name="client"
                    label={props.t("Client")}
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
                    onInputChange = {(e)=>setSearchInput(e)}
                    validate={{ required:true }}
                  >
                  </AvFieldSelect> */}
                  <Label>{props.t("Client")}</Label>
                  <div>
                    <Select 
                      required
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
                    border: "1px solid red"
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
                placeholder={props.t("enter note")}
                type="text"
                errorMessage={props.t("Enter Valid Note")}
                validate={{ 
                  required:{ value: false }
                }}
              />
            </div>
    
            <div className='text-center pt-3 p-2'>
              <Button 
                disabled = {props.disableAddButton} 
                type="submit" 
                color="primary" 
                className=""
              >
                {props.t("Add")}
              </Button>
            </div>
          </AvForm>
          {props.error && <UncontrolledAlert color="danger">
            <i className="mdi mdi-block-helper me-2"></i>
            {props.t(props.error)}
          </UncontrolledAlert>}
        </ModalBody> 
      </Modal>
    </React.Fragment>
  );
}
const mapStateToProps = (state) => ({
  gateways:state.gatewayReducer.gateways || [],
  modalClear:state.depositReducer.modalClear,
  depositResponseMessage:state.depositReducer.depositResponseMessage,
  clients:state.clientReducer.clients || [],
  wallets:state.walletReducer.wallets || [],
  depositsPermissions : state.Profile.depositsPermissions || {}, 
  disableAddButton : state.depositReducer.disableAddButton,
});
export default connect(mapStateToProps, null)(withTranslation()(DepositForm));