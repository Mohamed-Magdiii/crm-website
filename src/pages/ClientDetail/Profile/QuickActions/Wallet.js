import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  Label,
  UncontrolledAlert
} from "reactstrap";
import { useDispatch, connect } from "react-redux";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { fetchClientWallets, convertWalletStart } from "store/wallet/action";
import { fetchAssetsStart } from "store/assests/actions";

import Select from "react-select";
function ConvertWallet(props){
  const [addModal, setAddModal] = useState(false);
  const [toAsset, setToAsset] = useState("");
  const [fromAsset, setFromAsset] = useState("");
  const [toAssetId, setToAssetId ] = useState("");
  const [fromAssetId, setFromAssetId] = useState("");
  const { clientId } = props;
  const toggleAddModal = ()=>{
    setAddModal(!addModal);
  };
  const dispatch = useDispatch();
  const handleConvertWallet = (e, v)=>{
    dispatch(convertWalletStart({
      toAsset,
      fromAsset,
      fromAssetId,
      toAssetId,
      amount:v.amount
    }));
  };
  useEffect(()=>{
    dispatch(fetchClientWallets(clientId));
    dispatch(fetchAssetsStart({
      page:1,
      limit:1000
    }));
  }, []);
  return (
    <React.Fragment>
      <Link to="#" className="btn btn-primary" onClick={toggleAddModal}>
        <i className="bx me-1"> Convert Wallet</i>
      </Link>
      <Modal isOpen={addModal} toggle={toggleAddModal} centered={true}>
        <ModalHeader toggle={toggleAddModal} tag="h4">
            Convert Wallet
        </ModalHeader>
        <ModalBody>
          <AvForm
            className="p-4"
            onValidSubmit={ (e, v) => {
              handleConvertWallet(e, v);
            }}
          >
            <Label>From Asset</Label>
            <Select
              type="text" 
              label = "From Asset"
              name="toAsset"
              options = {props.docs && props.docs.map((wallet)=>{
                return {
                  label:`${wallet.asset} (${wallet.amount})`,
                  value:{
                    id:wallet._id,
                    asset:wallet.asset
                  }
                };
              })}
              onChange= {e=>{
                setFromAsset(e.value.asset);
                setFromAssetId(e.value.id);
              }}
            />
            <Label>To Asset</Label>
            <Select 
              
              type="text" 
              label="To Asset" 
              name="fromAsset"
              options = {props.docs && props.docs.map(wallet=>{
                return {
                  label:`${wallet.asset} (${wallet.amount})`,
                  value: {
                    id:wallet._id, 
                    asset:wallet.asset
                  }
                };
                
              })}
              onChange={e=>{
                setToAssetId(e.value.id);
                setToAsset(e.value.asset);
              }}
            />
            <AvField 
              label="Amount"
              name="amount"
              type="number"/>
            <div className="mt-2 m-auto">
              <Button className="btn btn-primary">Convert Wallet</Button>
            </div>
           
          </AvForm>
          {props.convertWalletError && <UncontrolledAlert color="danger">
            <i className="mdi mdi-block-helper me-2"></i>
            {props.convertWalletError}
          </UncontrolledAlert>}
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}
const mapStateToProps = (state)=>({
  docs: state.walletReducer.docs || [],
  assets: state.assetReducer.assets || [],
  convertWalletError : state.walletReducer.convertWalletError,
  disableConvertWalletButton:state.walletReducer.disableConvertWalletButton
});
export default connect(mapStateToProps, null)(ConvertWallet);