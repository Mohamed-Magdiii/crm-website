import React, { useEffect } from "react";
import {
  useDispatch, connect
} from "react-redux";
import {
  Row, Col,
  Modal, Button,
  ModalHeader,
  ModalBody,
  UncontrolledAlert,
} from "reactstrap";
import {
  AvForm, AvField, 
} from "availity-reactstrap-validation";

import { editSymbolStart } from "store/assests/actions";
function AssetEdit (props) {
  const { open, symbol = {}, onClose } = props;
  

  const dispatch = useDispatch();
  
  const handleSymbolUpdate = (e, values) => {
    e.preventDefault();
    const id = symbol._id;
    
    dispatch(editSymbolStart({
      id,
      values
    }));
  };
  useEffect(()=>{
    if (props.editClearingCounter > 0 && open) {
      onClose();
    }
  }, [props.editClearingCounter]);

  return (
    <React.Fragment >
      {/* <Link to="#" className="btn btn-light" onClick={onClose}><i className="bx bx-plus me-1"></i> Add New</Link> */}
      <Modal isOpen={open} toggle={onClose} centered={true}>
        <ModalHeader toggle={onClose} tag="h4">
            Edit Symbol
        </ModalHeader>
        <ModalBody >
          <AvForm
            className='p-4'
            onValidSubmit={(e, v) => {
              handleSymbolUpdate(e, v);
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
                    value={symbol.name}
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
                    value={symbol.symbol}
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
                    value={symbol.description}
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
                    value={symbol.markup}
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
                    value={symbol.minAmount}
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
                value={symbol.explorerLink}
              />
            </div>
            <div className='text-center pt-3 p-2'>
              <Button disabled={props.addLoading} type="submit" color="primary" className="">
                Update Symbol
              </Button>
            </div>
          </AvForm>
          {props.editError && <UncontrolledAlert color="danger">
            <i className="mdi mdi-block-helper me-2"></i>
            {props.editError}
          </UncontrolledAlert>}
          {props.editResult && <UncontrolledAlert color="success">
            <i className="mdi mdi-check-all me-2"></i>
            Symbol Updated successfully !!!
          </UncontrolledAlert>}
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}


const mapStateToProps = (state) => ({
  addLoading: state.rolesReducer.addLoading,
  editResult: state.rolesReducer.editResult,
  editError: state.rolesReducer.editError,
  editClearingCounter: state.rolesReducer.editClearingCounter,  
});
export default connect(mapStateToProps, null)(AssetEdit);
