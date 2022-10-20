import React, { useState } from "react";
import { 
  useDispatch, connect 
} from "react-redux";
import MetaTags from "react-meta-tags";
import { fetchDictionaryStart } from "store/dictionary/actions";
import {
  Card,
  CardBody,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane
} from "reactstrap";
import classnames from "classnames";
import Withdrawal from "pages/Transactions/Crypto/Withdrawal";
import WithdrawalForex from "pages/Transactions/Forex/withdrawals/WithdrawalForex";

function WithdrawalIndex(){
  const dispatch = useDispatch();
  useState(()=>{
    dispatch(fetchDictionaryStart());
  }, []);
  const [activeTab, setactiveTab] = useState("1");
  const toggle = tab => {
    if (activeTab !== tab) {
      setactiveTab(tab);
    }
  };
  
  return (
    <React.Fragment>
      <MetaTags>
        <title>
          Withdrawals
        </title>
      </MetaTags>
      <div className="page-content"> 
        <div className="container-fluid">
          <h2>Withdrawals</h2>
          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <Nav tabs>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeTab === "1",
                        })}
                        onClick={() => {
                          toggle("1");
                        }}
                      >
                        Crypto
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeTab === "2",
                        })}
                        onClick={() => {
                          toggle("2");
                        }}
                      >
                        Forex
                      </NavLink>
                    </NavItem>
                  </Nav>

                  <TabContent activeTab={activeTab} className="p-3 text-muted">
                    {/* crypto withdrawal page */}
                    <TabPane tabId="1">
                      <Row>
                        <Col sm="12">
                          <Withdrawal />
                        </Col>
                      </Row>
                    </TabPane>

                    {/* forex withdrawal page */}
                    <TabPane tabId="2">
                      <Row>
                        <Col sm="12">                          
                          <WithdrawalForex />
                        </Col>
                      </Row>
                    </TabPane>
                  </TabContent>
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
  loading: state.dictionaryReducer.loading || false,
  dictionary: state.dictionaryReducer.dictionary || [],
  error : state.dictionaryReducer.error,
});
export default connect(mapStateToProps, null)(WithdrawalIndex);