import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Modal,
  Button,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { useDispatch, connect } from "react-redux";
import AvFieldSelect from "components/Common/AvFieldSelect";
import { AvForm } from "availity-reactstrap-validation";
import { fetchClientWallets } from "store/wallet/action";
import { fetchAssetsStart } from "store/assests/actions";
function ConvertWallet(props){
  const [addModal, setAddModal] = useState(false);
  const { clientId } = props;
  const toggleAddModal = ()=>{
    setAddModal(!addModal);
  };
  const dispatch = useDispatch();
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
          
            }}
          >
            <AvFieldSelect
              type="text" 
              label = "Client Wallets"
              name="oldAsset"
              options = {props.docs && props.docs.map((wallet)=>{
                return {
                  label:wallet.asset,
                  value:wallet._id
                };
              })}/>
            <AvFieldSelect 
              
              type="text" 
              label="New Asset" 
              name="newAsset"
              options = {props.assets.map(asset=>{
                return {
                  label:asset.name,
                  value: asset.name
                };
              })}/>
            <div className="mt-2 m-auto">
              <Button className="btn btn-primary">Convert Wallet</Button>
            </div>
           
          </AvForm>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}
const mapStateToProps = (state)=>({
  docs: state.walletReducer.docs || [],
  assets: state.assetReducer.assets || []
});
export default connect(mapStateToProps, null)(ConvertWallet);