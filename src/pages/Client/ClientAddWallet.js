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
  useEffect(()=>{
    fetchAssetsHandler(1, sizePerPage);
  }, [sizePerPage, 1]);
  useEffect(()=>{
    if (props.clearingCounter > 0 && addModal) {
      props.switchComponents();
      setAddModal(false);
    }
  }, [props.clearingCounter]);

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
            onValidSubmit={() => {}}
          >
            <div className="mb-3">
              <AvField
                name="assetId"
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
          {props.addError && <UncontrolledAlert color="danger">
            <i className="mdi mdi-block-helper me-2"></i>
            {/* TODO this needs to be handled in translation */}
            {props.t(JSON.stringify(props.addErrorDetails))}
          </UncontrolledAlert>}
          {props.addSuccess && <UncontrolledAlert color="success">
            <i className="mdi mdi-check-all me-2"></i>
            {props.t("Wallet adde successfully")} !!!
          </UncontrolledAlert>}
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  addLoading: state.walletReducer.addLoading,
  addErrorDetails: state.walletReducer.addErrorDetails,
  addSuccess: state.walletReducer.addSuccess,
  addError: state.walletReducer.addError,  
  clearingCounter: state.walletReducer.clearingCounter,
  activeComponentProp: state.walletReducer.activeComponentProp,
  limit: state.assetReducer.limit,
  page: state.assetReducer.page || 1,
  assets: state.assetReducer.assets || []
});

export default connect(mapStateToProps, null)(withTranslation()(ClientAddWallet));