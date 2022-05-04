import { useDispatch, connect } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  UncontrolledAlert,
  Col,
  Row
} from "reactstrap";

import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { addNewSymbol } from "store/assests/actions";

function AssestForm(props){

  const [addModal, setAddUserModal] = useState(false);

  const dispatch = useDispatch();

  const handleAddLead = (event, values) => {
    event.preventDefault();
    dispatch(addNewSymbol(values));
    
  }; 

  const toggleAddModal = () => {
    setAddUserModal(!addModal);
  };

  useEffect(() => {
    if (!props.addSymbolSuccessMessage  && addModal) {
      
      setAddUserModal(false);
      
    }
  }, [props.addSymbolSuccessMessage]);

  return (
    <React.Fragment >
      <Link to="#" className="btn btn-light" onClick={toggleAddModal}><i className="bx bx-plus me-1"></i> Add New</Link>
      <Modal isOpen={addModal} toggle={toggleAddModal} centered={true}>
        <ModalHeader toggle={toggleAddModal} tag="h4">
          Add New Symbol
        </ModalHeader>
        <ModalBody >
          <AvForm
            className='p-4'
            onValidSubmit={(e, v) => {
              handleAddLead(e, v);
            }}
          >
            <Row>
              <Col md="6">
                <div className="mb-3">
                  <AvField
                    name="name"
                    label="Name"
                    placeholder="Name"
                    type="text"
                    errorMessage="Enter name of the symbol"
                    validate={{ required: { value: true } }}
                  />
                </div>
              </Col>
              <Col md="6"> 
                <div className="mb-3">
                  <AvField
                    name="symbol"
                    label="Symbol"
                    placeholder="Symbol"
                    type="text"
                    errorMessage="Enter symbol"
                    validate={{ required: { value: true } }}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <div className="mb-3">
                  <AvField
                    name="description"
                    label="Description"
                    placeholder="Description"
                    type="text"
                    errorMessage="Enter description"
                    validate={{ required: { value: true } }}
                  />
                </div>
              </Col>
              <Col md="6">
                <div className="mb-3">
                  <AvField
                    name="markup"
                    label="Mark up"
                    placeholder="Markup"
                    type="text"
                    errorMessage="Enter valid markup"
                    validate={{ required: { value: true } }}
                  />
                </div>
              </Col>
            </Row> 
            <Row>
              <Col md="6">
                <div className="mb-3">
                  <AvField
                    name="depositFee"
                    label="Desposit Fee"
                    placeholder="Desposit Fee"
                    type="text"
                    errorMessage="Enter valid deposit fee"
                    validate={{ required: { value: true } }}
                  />
                </div>
              </Col>
              <Col md="6"> 
                <div className="mb-3">
                  <AvField
                    name="withdrawFee"
                    label="Withdraw Fee"
                    placeholder="Withdraw Fee"
                    type="text"
                    errorMessage="Enter valid withdraw fee"
                    validate={{ required: { value: true } }}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <div className="mb-3">
                  <AvField
                    name="minDepositAmount"
                    label="Min Deposit Amount"
                    placeholder="deposit amount"
                    type="text"
                    errorMessage="Enter valid deposit amount"
                    validate={{ required: { value: true } }}
                  />
                </div>
              </Col>
              <Col md="6"> 
                <div className="mb-3">
                  <AvField
                    name="minWithdrawAmount"
                    label="Min Withdraw Amount"
                    placeholder="withdraw amount"
                    type="text"
                    errorMessage="Enter valid withdraw amount"
                    validate={{ required: { value: true } }}
                  />
                </div>
              </Col>
            </Row>
            <div className="mb-3">
              <AvField
                name="explorerLink"
                label="Link"
                placeholder="explorer link"
                type="text"
                errorMessage="explorer link"
                validate={{ required: { value: true } }}
              />
            </div>
            
            <div className='text-center pt-3 p-2'>
              <Button  type="submit" color="primary" className="">
                    Add New Symbol 
              </Button>
            </div>
          </AvForm>
          {props.error && <UncontrolledAlert color="danger">
            <i className="mdi mdi-block-helper me-2"></i>
            {props.error}
          </UncontrolledAlert>}
          {props.addSymbolSuccessMessage && <UncontrolledAlert color="success">
            <i className="mdi mdi-check-all me-2"></i>
              Symbol Added successfully !!!
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
export default connect(mapStateToProps, null)(AssestForm);