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


function DepositForm(props){

  const [addModal, setDepositModal] = useState(false);

  const dispatch = useDispatch();

  const handleAddDeposit = (event, values) => {
    event.preventDefault();
    
    
  }; 

  const toggleAddModal = () => {
    setDepositModal(!addModal);
  };

  useEffect(() => {
    
  }, [props.addSymbolSuccessMessage]);

  return (
    <React.Fragment >
      <Link to="#" className="btn btn-light" onClick={toggleAddModal}><i className="bx bx-plus me-1"></i> Withdraw</Link>
      <Modal isOpen={addModal} toggle={toggleAddModal} centered={true}>
        <ModalHeader toggle={toggleAddModal} tag="h4">
          Withdraw
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
                type="text"
                errorMessage="Enter valid gateway"
                validate={{ required: { value: true } }}
              />
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
          {props.addSymbolSuccessMessage && <UncontrolledAlert color="success">
            <i className="mdi mdi-check-all me-2"></i>
              Withdraw is done successfully !!!
          </UncontrolledAlert>}
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}
const mapStateToProps = (state) => ({
  error: state.assetReducer.error,
  addSymbolSuccessMessage: state.assetReducer.addSymbolSuccessMessage,
});
export default connect(mapStateToProps, null)(DepositForm);