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
function DepositForm(props){
  
  const [addModal, setDepositModal] = useState(false);
  
  const [selectedClient, setSelectedClient] = useState("");
  const dispatch = useDispatch();
  const { create } = props.depositsPermissions;
  const [searchInput, setSearchInput]  = useState("");
  const handleAddDeposit = (event, values) => {
    event.preventDefault();
    dispatch(addDepositStart({
      customerId:selectedClient,
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
      page:1,
      limit:10
    }));
    dispatch(fetchGatewaysStart());
    if (searchInput.length >= 3){
      dispatch(fetchClientsStart({
        searchText:searchInput
      }));
    }
  
  }, [searchInput]);

  useEffect(() => {
    if (props.modalClear && open ){
      setDepositModal(false);
    }
  }, [props.modalClear]);
  
  const selectClient = (id)=>{
    setSelectedClient(id);
    dispatch(fetchWalletStart({
      belongsTo:id
    }));
     
  };
  
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
              handleAddDeposit(e, v);
            }}
          >
            <Row>
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
                  />
                </div>
              </Col>
              <Col md="6">
                <AvField name="walletId" 
                  type="select" 
                  label={props.t("Select a wallet")}
                  id="walletList"
                  validate = {{ required:{ value:true } }}
                >
                  <option hidden></option>
                  {props.wallets.map(wallet=> (
                    <option key={wallet._id} value={wallet._id} >
                      {props.t(`${wallet.asset}-(Balance ${wallet.amount} ${wallet.asset})`)}
                    </option>
                  ))}
     
                </AvField>
              </Col>
          
            </Row>
          
        
            <div className="mb-3">
              <AvField
                name="gateway"
                label={props.t("Gateway")}
                placeholder={props.t("gateway")}
                type="select"
                errorMessage={props.t("Enter valid gateway")}
                validate={{ required: { value: true } }}
              >
                <option hidden></option>
                {Object.keys(props.gateways).map((key)=>{
                  return <option key={key}>{props.t(props.gateways[key])}</option>;
                })}

              </AvField>
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
                {props.t("Add Deposit")}
              </Button>
            </div>
          </AvForm>
          {props.error && <UncontrolledAlert color="danger">
            <i className="mdi mdi-block-helper me-2"></i>
            {props.t(props.error)}
          </UncontrolledAlert>}
          {props.depositResponseMessage && <UncontrolledAlert color="success">
            <i className="mdi mdi-check-all me-2"></i>
            {props.t(`Deposit has been ${props.depositResponseMessage}`)}
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
  depositsPermissions : state.Profile.depositsPermissions || {}
});
export default connect(mapStateToProps, null)(withTranslation()(DepositForm));