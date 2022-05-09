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
  let minDepositAmount;
  let minWithdrawAmount;
  let depositFee;
  let withdrawalFee;
  if (symbol.minAmount){
    const { minAmount:{ deposit, withdrawal } } = symbol;
    minDepositAmount = deposit;
    minWithdrawAmount = withdrawal;
  }
  
  if (symbol.fee){
    const { fee:{ deposit, withdrawal } } = symbol;
    depositFee = deposit;
    withdrawalFee = withdrawal;
  }
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
    
    if (props.editClear) {
      onClose();
    }
  }, [props.editClear]);

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
                    validate={{ required:{ value:true } } }
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
                    validate={{ required:{ value:true } } }
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
                    validate={{ required:{ value:true } } }
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
                    validate={{ required:{ value:true } } }
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
                    value={depositFee}
                    validate={{ required:{ value:true } } }
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
                    value={withdrawalFee}
                    validate={{ required:{ value:true } }}
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
                    value={minDepositAmount}
                    validate={{ required:{ value:true } }}
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
                    value={minWithdrawAmount}
                    validate={{ required:{ value:true } }}
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
                validate={{ required:{ value:true } } }
              />
            </div>
            <div className='text-center pt-3 p-2'>
              <Button disabled={props.addLoading} type="submit" color="primary" className="">
                Update Symbol
              </Button>
            </div>
          </AvForm>
          {props.error && <UncontrolledAlert color="danger">
            <i className="mdi mdi-block-helper me-2"></i>
            {props.error}
          </UncontrolledAlert>}
          {props.editDone && <UncontrolledAlert color="success">
            <i className="mdi mdi-check-all me-2"></i>
            Symbol Updated successfully !!!
          </UncontrolledAlert>}
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}


const mapStateToProps = (state) => ({
  editLoading: state.assetReducer.editLoading,
  editDone: state.assetReducer.editDone,
  editClear: state.assetReducer.editClear,  
  error:state.assetReducer.error
});
export default connect(mapStateToProps, null)(AssetEdit);
