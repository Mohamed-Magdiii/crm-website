import { useDispatch, connect } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  UncontrolledAlert,
  Dropdown,
  DropdownMenu,
  Input,
  DropdownItem,
  DropdownToggle,
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

function DepositForm(props){
  
  const [addModal, setDepositModal] = useState(false);
  
  const [selectedClient, setSelectedClient] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  
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
      <Link to="#" className="btn btn-light" onClick={toggleAddModal}><i className="bx bx-plus me-1"></i> Add Deposit</Link>
      <Modal isOpen={addModal} toggle={toggleAddModal} centered={true}>
        <ModalHeader toggle={toggleAddModal} tag="h4">
          Add Deposit
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
                <Label>Client</Label>
            
                <Dropdown  className= "transparentbar" toggle={() => setIsOpen(!isOpen)} isOpen={isOpen}>
                  <DropdownToggle className="transparentbar"  >
                    <Input  onChange={(e) => setSearchInput(e.target.value) } value={searchInput} placeholder="search client" />
                  </DropdownToggle>
                  <DropdownMenu  >
                    {props.clients.map((item) => (
                      <div key={item._id} onClick={(e)=>setSearchInput(e.target.textContent)}>
                        <DropdownItem onClick={(e)=>selectClient(e.target.value)} value={item._id}>{`${item.firstName} ${item.lastName}`}</DropdownItem>
                      </div>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </Col>
              <Col md="6">
                <AvField name="walletId" 
                  type="select" 
                  label="Select a wallet"
                  id="walletList"
                  validate = {{ required:{ value:true } }}
                >
                  <option hidden></option>
                  {props.wallets.map(wallet=> (
                    <option key={wallet._id} value={wallet._id} >
                      {`${wallet.asset}-(Balance ${wallet.amount} ${wallet.asset})`}
                    </option>
                  ))}
     
                </AvField>
              </Col>
          
            </Row>
          
        
            <div className="mb-3">
              <AvField
                name="gateway"
                label="Gateway"
                placeholder="gateway"
                type="select"
                errorMessage="Enter valid gateway"
                validate={{ required: { value: true } }}
              >
                <option hidden></option>
                {Object.keys(props.gateways).map((key)=>{
                  return <option key={key}>{props.gateways[key]}</option>;
                })}

              </AvField>
            </div>
              
               
            <div className="mb-3">
              <AvField
                name="amount"
                label="Amount"
                placeholder="Amount"
                type="text"
                errorMessage="Enter Valid Amount"
                validate={{ required: { value: true } }}
              />
            </div>
            <div className="mb-3">
              <AvField
                name="note"
                label="Note"
                placeholder="Note"
                type="text"
                errorMessage="Enter Valid Note"
                validate={{ required: { value: true } }}
              />
            </div>
    
            <div className='text-center pt-3 p-2'>
              <Button  type="submit" color="primary" className="">
                    Add Deposit
              </Button>
            </div>
          </AvForm>
          {props.error && <UncontrolledAlert color="danger">
            <i className="mdi mdi-block-helper me-2"></i>
            {props.error}
          </UncontrolledAlert>}
          {props.depositResponseMessage && <UncontrolledAlert color="success">
            <i className="mdi mdi-check-all me-2"></i>
            {`Deposit has been ${props.depositResponseMessage}`}
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
});
export default connect(mapStateToProps, null)(DepositForm);