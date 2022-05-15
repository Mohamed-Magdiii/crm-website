import React, {
  useState, useEffect
} from "react";
import { useDispatch, connect } from "react-redux";
import { fetchClientsStart } from "store/client/actions";
import { fetchWalletStart } from "store/wallet/action";
import {
  Row, Col, Card, CardBody, CardHeader
} from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import WithDrawForm from "./WithDrawForm";
import { fetchWithdrawalsStart } from "store/transactions/withdrawal/action";
import SearchBar from "components/Common/SearchBar";
function Withdrawal(props){
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const [selectedClientId, setSelectedClientId] = useState("");
  const [selectedWalletId, setSelectedWalletId] = useState("");
  
  function selectWallet(id){
    setSelectedWalletId(id);
  }
  useEffect(()=>{
    if (searchInput.length >= 3){
      dispatch(fetchClientsStart({
        searchText:searchInput
      }));
    }

  }, [searchInput]);
  useEffect(()=>{
    dispatch(fetchWithdrawalsStart());
  }, []);
  
  const handleSearchInput = (e)=>{
  
    setSearchInput(e.target.value);
    
  };
  
  
  const selectClient = (id)=>{
    setSelectedClientId(id);
    setSelectedWalletId("");
    dispatch(fetchWalletStart({
      belongsTo:id
    }));
     
  };
  
  return (

    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Row>
            <Col className="col-12">
              <Card>
                <CardHeader className="d-flex flex-column gap-3 ">
                  <div className="d-flex justify-content-between align-items-center">
                    <h1>Withdrawal Page</h1>
                    <WithDrawForm selectedWallet={selectedWalletId} selectedClient={selectedClientId}/>
                  </div>
                  
                  <SearchBar handleSearchInput={handleSearchInput} placeholder="Search for the client"/>
                      
                </CardHeader>
                  
                
                <CardBody>
                  <AvForm>
                    <Row className="col-12">
                      <Col md="6">
                        
                        <AvField name="clients_list" 
                          type="select" 
                          label="Select a client "
                          onChange={(e)=>selectClient(e.target.value)}>
                          <option hidden>Select a client</option>
                          {props.clients.map(client=> (
                            <option key={client._id} value={client._id} >
                              {`${client.firstName} ${client.lastName}`}
                            </option>
                          ))}
                        </AvField>
                      </Col>
                      <Col md="6">
                        <AvField name="wallet" 
                          type="select" 
                          label="Select a wallet"
                          id="walletList"
                          onChange={(e)=>selectWallet(e.target.value)}>
                          <option hidden>Select a wallet</option>
                          {props.wallets.map(wallet=> (
                            <option key={wallet._id} value={wallet._id} >
                              {wallet.recordId}
                            </option>
                          ))}
                     
                        </AvField>
                      </Col> 
                      
                    </Row>
                  </AvForm>
            
           
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
      
    </React.Fragment>
    
  );
}
const mapStateToProps = (state)=>({
  clients:state.clientReducer.clients || [],
  wallets:state.walletReducer.wallets || [],
  withdrawals:state.withdrawalReducer.withdrawals || []
}
);
export default connect(mapStateToProps, null)(Withdrawal);