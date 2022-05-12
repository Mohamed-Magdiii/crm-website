import React, {
  useState, useEffect, useCallback
} from "react";
import {useDispatch, connect } from "react-redux";
import { fetchClientsStart } from "store/client/actions";
import { fetchWalletStart } from "store/wallet/action";
import {
  Row, Col, Card, CardBody, CardHeader, Dropdown, DropdownMenu, DropdownToggle, DropdownItem
} from "reactstrap";
  
import { debounce } from "lodash";
import WithDrawForm from "./WithDrawForm";
function Deposit(props){
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const [menu, setMenu] = useState(false);
  const [searchDropDown, setSearchDropDown] = useState(false);
  const toggleSearchDropDown = ()=>setSearchDropDown(preValue=>!preValue);
  const toggle = ()=>setMenu(preValue=>!preValue);
  useEffect(()=>{
    if (searchInput !== ""){
      dispatch(fetchClientsStart({
        searchText:searchInput
      }));
    }
     
  }, [searchInput]);
  const handleSearchInput = (e)=>{
    
    setSearchInput(e.target.value);
      
  };
  const debouncedChangeHandler = useCallback(
    debounce(handleSearchInput, 1000), []
  );
    
  const selectClient = (id)=>{
      
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
                <CardHeader className="d-flex flex-column gap-3">
                  <div>  
                      
                      
                    <Dropdown isOpen={searchDropDown} toggle={toggleSearchDropDown} className="d-inline-block">
                      <DropdownToggle>
                        <input className="form-control"
                          autoComplete="off"
                          onChange={debouncedChangeHandler}    
                        /> 
                      </DropdownToggle>
                      <DropdownMenu className="language-switch dropdown-menu-end">
                        {props.clients.map(client=> (
                          <DropdownItem
                            key={client._id}
                            onClick={()=>selectClient(client._id)}
                              
                          >
              
                            <span className="align-middle">
                              {`${client.firstName} ${client.lastName}`}
                            </span>
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                    <Dropdown isOpen={menu} toggle={toggle} className="d-inline-block">
                      <DropdownToggle className="btn header-item " tag="button">
                        <h2>Wallets</h2>
                      </DropdownToggle>
                      <DropdownMenu className="language-switch dropdown-menu-end">
                        {props.wallets.map(wallet=> (
                          <DropdownItem
                            key={wallet._id}
                              
                          >
                            <span className="align-middle">
                              {wallet.recordId}
                            </span>
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                    <WithDrawForm/>
                  </div>
                </CardHeader>
                <CardBody>
                
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
  wallets:state.walletReducer.wallets || []
}
);
export default connect(mapStateToProps, null)(Deposit);