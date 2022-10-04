import { useDispatch, connect } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  UncontrolledAlert,
  Label,
  Row,
  Col,
  Input
} from "reactstrap";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import "./SearchableInputStyles.scss";
import { withTranslation } from "react-i18next";
import Select from "react-select";
import { addForexDeposit } from "store/forexTransactions/deposits/actions";
import Loader from "components/Common/Loader";

function AddForexDepositModal(props){
  const dispatch = useDispatch();
  const customerId = JSON.parse(localStorage.getItem("authUser")).roleId._id;
  const { create } = props.depositsPermissions;
  const [addModal, setDepositModal] = useState(false);
  const [memFiles, setMemFiles] = useState({});
  const [imageError, setImageError] = useState();
  const [gateway, setGateway] = useState("");
  const [tradingAccountOwnerName, setTradingAccountOwnerName] = useState();

  // max file size to uplaod = 5 MB
  const maxFileSize = 5;
  const acceptedExtensions = ["image/jpeg", "image/png", "application/pdf"];
  const fileSizeError = "File is too large, It has to be 5MB at most";
  const fileExtensionError = "Only accepts files with the following extensions *jpg, *png, *pdf";

  const addFile = (name, files) => {
    // clear previous error
    setImageError("");

    // check file extension
    if (!acceptedExtensions.includes(files?.type)){
      setImageError(fileExtensionError);
    }

    // check file size
    if ((files?.size / 1000000) > maxFileSize){
      setImageError(fileSizeError);
    }

    // otherwise it's all good 
    if ((files?.size / 1000000) <= maxFileSize){
      setMemFiles({
        ...memFiles,
        [name]: files,
      });
    }
  };
  
  const toggleAddModal = () => {
    setDepositModal(!addModal);
    setImageError("");
    setTradingAccountOwnerName("");
  };

  useEffect(() => {
    if (!props.disableAddButton && open ){
      setDepositModal(false);
    }
  }, [props.modalClear]);

  const test = [
    {
      _id: "1",
      customer: "shokr",
      recordId: "10033" 
    },
    {
      _id: "2",
      customer: "abdelrhman",
      recordId: "10044" 
    }
  ];

  const handleAddForexDeposit = (e, v) => {
    dispatch(addForexDeposit(v));
  };

  const handleLiveAccountChange = (e) => {
    setTradingAccountOwnerName(test.filter((item) => (item.recordId === e.target.value))[0]?.customer);
  };

  const validateLiveAccount = (value, ctx, input, cb) =>{
    if (!test.map((item) => (item.recordId)).includes(value)){
      cb("Enter A Valid Live Account");
    } else
      cb(true);
  };

  return (
    <React.Fragment >
      <Link to="#" className={`btn btn-primary ${!create ? "d-none" : ""}`} onClick={toggleAddModal}><i className="bx bx-plus me-1"></i> {props.t("Add New Deposit")}</Link>
      <Modal isOpen={addModal} toggle={toggleAddModal} centered={true}>
        <ModalHeader toggle={toggleAddModal} tag="h4">
          {props.t("Add Deposit")}
        </ModalHeader>
        <ModalBody >
          <AvForm
            className='p-4'
            onValidSubmit={(e, v) => {
              v.gateway = gateway;
              // v.image = memFiles;
              v.customerId = customerId;
              v.tradingAccountId = test.filter((item) => (item.recordId === v.liveAccount))[0]?._id;
              delete v.liveAccount;
              delete v.customerName;
              handleAddForexDeposit(e, v);
            }}
          >
            <Row className="mb-3">
              {/* live account */}
              <Col md="12">
                <AvField
                  name="liveAccount"
                  label={props.t("Live Account")}
                  placeholder={props.t("Enter Live Account")}
                  type="text"
                  errorMessage={props.t("Enter Valid Live Account")}
                  validate = {{
                    required :{ value:true },
                    custom:validateLiveAccount
                  }}
                  onChange={(e) => {
                    handleLiveAccountChange(e);
                  }}
                  onKeyPress={(e) => {
                    if (!isNaN(e.key) && e.target.value.length > 0){
                      return true;
                    }
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
              </Col>
            </Row>

            {/* customer name */}
            <Row className="mb-3">
              <Col md="6">
                <AvField
                  readOnly={true}
                  value={tradingAccountOwnerName}
                  name="customerName"
                  label={props.t("Customer Name")}
                  placeholder={props.t("Customer Name")}
                  type="text"
                  errorMessage={props.t("Enter A Valid Live Account")}
                  validate = {{
                    required :{ value:true }
                  }}
                />
              </Col>
            </Row>

            {/* gateway */}
            <Row className="mb-3">
              <Col md="12">
                <Label>{props.t("Gateway")}</Label>
                <div>
                  <Select 
                    required
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
                    placeholder = "Choose A Gateway"    
                  />
                </div>
              </Col>
            </Row>

            {/* amount and image */}
            <Row className="mb-3">
              {/* amount */}
              <Col md="6">
                <AvField
                  name="amount"
                  label={props.t("Amount")}
                  placeholder={props.t("Enter Amount")}
                  type="number"
                  min="1"
                  errorMessage={props.t("Enter Valid Amount")}
                  validate = {{
                    required :{ value:true }
                  }}
                />
              </Col>

              {/* image */}
              <Col md="6">
                <Label>{props.t("Image")}</Label>
                <Input
                  type="file"
                  className="form-control form-control-md"
                  id="image"
                  onChange={(e) => {
                    addFile("IMAGE", e.target.files[0]);
                  }}
                  name="image"
                  invalid={imageError}
                />
                {
                  imageError && <small className="text-danger">{imageError}</small>
                }
              </Col>
            </Row>

            {/* note */}
            <Row className="mb-3">
              <AvField
                name="note"
                label={props.t("Note")}
                placeholder={props.t("Enter Note")}
                type="text"
                errorMessage={props.t("Enter Valid Note")}
              />
            </Row>
    
            <div className='text-center pt-3 p-2'>
              {
                props.loading 
                  ?
                  <Loader />
                  :
                  <Button 
                    disabled = {props.loading} 
                    type="submit" 
                    color="primary"
                  >
                    {props.t("Add")}
                  </Button>
              }
            </div>
          </AvForm>
          {props.addForexDepositFailDetails && <UncontrolledAlert color="danger">
            <i className="mdi mdi-block-helper me-2" />
            {props.t(props.addForexDepositFailDetails)}
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
  loading: state.tradingAccountReducer.loading,
  addForexDepositFailDetails: state.forexDepositReducer.addForexDepositFailDetails
});
export default connect(mapStateToProps, null)(withTranslation()(AddForexDepositModal));