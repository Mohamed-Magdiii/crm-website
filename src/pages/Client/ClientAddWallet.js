import React, { useState, useEffect } from "react";
import {
  Link
} from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import {
  Modal, Button, ModalHeader, ModalBody, UncontrolledAlert 
} from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";

// i18n
import { withTranslation } from "react-i18next";
import { fetchAssetsStart } from "store/assests/actions";
import { addWallet } from "store/wallet/action";

function ClientAddWallet(props){
  const [sizePerPage, setSizePerPage] = useState(10);
  const [addModal, setAddModal] = useState(false);
  const assets = props.assets;
  const dispatch = useDispatch();
  const fetchAssetsHandler = (page, limit) => {
    dispatch(fetchAssetsStart({
      limit,
      page
    })) ;
  };
  const toggleAddModal = () => {
    setAddModal(!addModal);
  };
  const addNewWalletHandler = (e, v) => {
    dispatch(addWallet(v));
  };
  useEffect(()=>{
    fetchAssetsHandler(1, sizePerPage);
  }, [sizePerPage, 1]);
  useEffect(()=>{
    if (props.addClearingCounter > 0 && addModal) {
      setAddModal(false);
    }
  }, [props.addClearingCounter]);

  return (
    <React.Fragment >
      <Link to="#" className="btn btn-light" onClick={toggleAddModal}>
        <i className="bx bx-plus me-1"></i> {props.t("Add new")} 
      </Link>
      <Modal isOpen={addModal} toggle={toggleAddModal} centered={true}>
        <ModalHeader toggle={toggleAddModal} tag="h4">
          {props.t("Add new wallet")} 
        </ModalHeader>
        <ModalBody >
          <AvForm
            className='p-4'
            onValidSubmit={(e, v) => {
              v.belongsTo = props.clientId;
              addNewWalletHandler(e, v);
            }}
          >
            <div className="mb-3">
              <AvField
                name="symbol"
                label={props.t("Asset")}
                placeholder={props.t("Asset")}
                type="select"
                errorMessage={props.t("Asset is required")}
                validate={{ required: { value: true } }}
              >
                {assets.map((asset) => (
                  <option key={assets.indexOf(asset)} value={asset.id}>
                    {asset.name}
                  </option>
                ))}
              </AvField>
            </div>
            <div className='text-center pt-3 p-2'>
              <Button disabled={props.addLoading} type="submit" color="primary">
                {props.t("Add")}
              </Button>
            </div>
          </AvForm>
          {props.addFail && <UncontrolledAlert color="danger">
            <i className="mdi mdi-block-helper me-2"></i>
            {/* TODO this needs to be handled in translation */}
            {props.t(JSON.stringify(props.addFailDetails))}
          </UncontrolledAlert>}
          {props.addSuccess && <UncontrolledAlert color="success">
            <i className="mdi mdi-check-all me-2"></i>
            {props.t("Wallet added successfully")} !!!
          </UncontrolledAlert>}
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  addLoading: state.walletReducer.addLoading,
  addFailDetails: state.walletReducer.addFailDetails,
  addSuccess: state.walletReducer.addSuccess,
  addFail: state.walletReducer.addFail,  
  addClearingCounter: state.walletReducer.addClearingCounter,
  activeComponentProp: state.walletReducer.activeComponentProp,
  limit: state.assetReducer.limit,
  page: state.assetReducer.page || 1,
  assets: state.assetReducer.assets || []
});

export default connect(mapStateToProps, null)(withTranslation()(ClientAddWallet));