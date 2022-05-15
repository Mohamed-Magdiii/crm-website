import { useDispatch, connect } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  UncontrolledAlert,
} from "reactstrap";

import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { fetchGatewaysStart } from "store/gateway/action";
import { addDepositStart } from "store/transactions/deposit/action";
function DepositForm(props){

  const [addModal, setDepositModal] = useState(false);

  const dispatch = useDispatch();
  const { selectedClient, selectedWallet } = props;
  
  const handleAddDeposit = (event, values) => {
    event.preventDefault();
    dispatch(addDepositStart({
      customerId:selectedClient,
      walletId:selectedWallet,
      ...values
    }));
    
  }; 

  const toggleAddModal = () => {
    setDepositModal(!addModal);
  };
  useEffect(()=>{
    dispatch(fetchGatewaysStart());
  }, []);
  useEffect(() => {
    if (props.modalClear && open ){
      setDepositModal(false);
    }
  }, [props.modalClear]);
  
  return (
    <React.Fragment >
      {selectedWallet.length > 0 && <Link to="#" className="btn btn-light" onClick={toggleAddModal}><i className="bx bx-plus me-1"></i> Add Deposit</Link>}
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
            
              
            <div className="mb-3">
              <AvField
                name="gateway"
                label="Gateway"
                placeholder="gateway"
                type="select"
                errorMessage="Enter valid gateway"
                validate={{ required: { value: true } }}
              >
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
  depositResponseMessage:state.depositReducer.depositResponseMessage
});
export default connect(mapStateToProps, null)(DepositForm);