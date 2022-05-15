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
import { makeWithdrawalStart } from "store/transactions/withdrawal/action";
import { fetchGatewaysOfWithdrawalsStart } from "store/gateway/action";
function WithdrawForm(props){

  const [open, setWithdrawalModal] = useState(false);
  const { selectedClient, selectedWallet  } = props;
  const dispatch = useDispatch();
  
  const handleWithdraw = (event, values) => {
    event.preventDefault();
    dispatch(makeWithdrawalStart({
      customerId:selectedClient,
      walletId:selectedWallet,
      ...values
    }));
    
  }; 

  const toggleAddModal = () => {
    setWithdrawalModal(!open);
  };
  useEffect(()=>{
    dispatch(fetchGatewaysOfWithdrawalsStart());
  }, []);
  useEffect(() => {
    if (props.modalClear && open){
      setWithdrawalModal(false);
    }
  }, [props.modalClear]);
  console.log(props.gateways);
  return (
    <React.Fragment >
      {selectedWallet.length > 0 && <Link to="#" className="btn btn-light" onClick={toggleAddModal}><i className="bx bx-plus me-1"></i> Withdraw</Link>}
      <Modal isOpen={open} toggle={toggleAddModal} centered={true}>
        <ModalHeader toggle={toggleAddModal} tag="h4">
          Withdraw
        </ModalHeader>
        <ModalBody >

          <AvForm
            className='p-4'
            onValidSubmit={(e, v) => {
              handleWithdraw(e, v);
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
                    Make Withdraw
              </Button>
            </div>
          </AvForm>
          {props.error && <UncontrolledAlert color="danger">
            <i className="mdi mdi-block-helper me-2"></i>
            {props.error}
          </UncontrolledAlert>}
          {props.withdrawResponseMessage && <UncontrolledAlert color="success">
            <i className="mdi mdi-check-all me-2"></i>
            {`Withdraw has been ${props.withdrawResponseMessage} `}
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
  modalClear:state.withdrawalReducer.modalClear
});
export default connect(mapStateToProps, null)(WithdrawForm);