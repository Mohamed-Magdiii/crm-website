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
import { withTranslation } from "react-i18next";
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
          {props.t("Edit Symbol")}
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
                    label={props.t("Name")}
                    placeholder={props.t("Name")}
                    type="text"
                    errorMessage={props.t("Enter name of the symbol")}
                    value={symbol.name}
                    validate={{ required:{ value:true } } }
                  />
                </div>
              </Col>
              <Col md="6"> 
                <div className="mb-3">
                  <AvField
                    name="symbol"
                    label={props.t("Symbol")}
                    placeholder={props.t("Symbol")}
                    type="text"
                    errorMessage={props.t("Enter symbol")}
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
                    label={props.t("Description")}
                    placeholder={props.t("Description")}
                    type="text"
                    errorMessage={props.t("Enter description")}
                    value={symbol.description}
                    validate={{ required:{ value:true } } }
                  />
                </div>
              </Col>
              <Col md="6">
                <div className="mb-3">
                  <AvField
                    name="markup"
                    label={props.t("Mark up")}
                    placeholder={props.t("Markup")}
                    type="text"
                    errorMessage={props.t("Enter valid markup")}
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
                    label={props.t("Desposit Fee")}
                    placeholder={props.t("Desposit Fee")}
                    type="text"
                    errorMessage={props.t("Enter valid deposit fee")}
                    value={depositFee}
                    validate = {{
                      required :{ value:true },
                      pattern : {
                        // eslint-disable-next-line no-useless-escape
                        value :"/^[+]?([0-9]+\.?[0-9]*|\.[0-9]+)$/",
                        errorMessage : "Deposit Fee must be a number"
                      }
                    }}
                  />
                </div>
              </Col>
              <Col md="6"> 
                <div className="mb-3">
                  <AvField
                    name="withdrawFee"
                    label={props.t("Withdraw Fee")}
                    placeholder={props.t("Withdraw Fee")}
                    type="text"
                    errorMessage={props.t("Enter valid withdraw fee")}
                    value={withdrawalFee}
                    validate = {{
                      required :{ value:true },
                      pattern : {
                        // eslint-disable-next-line no-useless-escape
                        value :"/^[+]?([0-9]+\.?[0-9]*|\.[0-9]+)$/",
                        errorMessage : "Withdraw Fee must be a number"
                      }
                    }}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <div className="mb-3">
                  <AvField
                    name="minDepositAmount"
                    label={props.t("Min Deposit Amount")}
                    placeholder={props.t("deposit amount")}
                    type="text"
                    errorMessage={props.t("Enter valid deposit amount")}
                    value={minDepositAmount}
                    validate = {{
                      required :{ value:true },
                      pattern : {
                        // eslint-disable-next-line no-useless-escape
                        value :"/^[+]?([0-9]+\.?[0-9]*|\.[0-9]+)$/",
                        errorMessage : "Min deposit Amount must be a number"
                      }
                    }}
                  />
                </div>
              </Col>
              <Col md="6"> 
                <div className="mb-3">
                  <AvField
                    name="minWithdrawAmount"
                    label={props.t("Min Withdraw Amount")}
                    placeholder={props.t("withdraw amount")}
                    type="text"
                    errorMessage={props.t("Enter valid withdraw amount")}
                    value={minWithdrawAmount}
                    validate = {{
                      required :{ value:true },
                      pattern : {
                        // eslint-disable-next-line no-useless-escape
                        value :"/^[+]?([0-9]+\.?[0-9]*|\.[0-9]+)$/",
                        errorMessage : "Min withdraw amount must be a number"
                      }
                    }}
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
              <Button disabled={props.disableEditButton} type="submit" color="primary" className="">
                {props.t("Edit")}
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
  editClear: state.assetReducer.editClear,  
  error:state.assetReducer.error,
  disableEditButton: state.assetReducer.disableEditButton
});
export default connect(mapStateToProps, null)(withTranslation()(AssetEdit));
