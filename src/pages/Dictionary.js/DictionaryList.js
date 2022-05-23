import React, { useEffect, useState } from "react";
import { 
  useDispatch, connect 
} from "react-redux";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { fetchDictionaryStart } from "store/dictionary/actions";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,

} from "reactstrap";
import classnames from "classnames";
import ActionsTab from "./ActionsTab";
import CountriesTab from "./CountriesTab";
import EmailProvidersTab from "./EmailProvidersTab";
import ExchangesTab from "./ExchangesTab";
function DictionaryList(props){
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
      <div className="page-content"> 
        <div className="container-fluid">
          <h2>Dictionary</h2>
          <Row>
            <Col className="col-12">
              <Card>
                <CardHeader className="d-flex flex-column gap-3">
                  <div className="d-flex justify-content-between  align-items-center">
                    <CardTitle>Dictionary</CardTitle>     
                  </div>
                      
                </CardHeader>
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
                        Actions
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
                        Exchanges
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeTab === "3",
                        })}
                        onClick={() => {
                          toggle("3");
                        }}
                      >
                        Email Providers
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeTab === "4",
                        })}
                        onClick={() => {
                          toggle("4");
                        }}
                      >
                        Countries
                      </NavLink>
                    </NavItem>
                  </Nav>

                  <TabContent activeTab={activeTab} className="p-3 text-muted">
                    <TabPane tabId="1">
                      <Row>
                        <Col sm="12">
                        
                          <ActionsTab />
                          
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="2">
                      <Row>
                        <Col sm="12">
                          
                          <ExchangesTab />  
                          
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="3">
                      <Row>
                        <Col sm="12">
                          
                          <EmailProvidersTab/>
                          
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="4">
                      <Row>
                        <Col sm="12">
                        
                          <CountriesTab/>
                        
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
export default connect(mapStateToProps, null)(DictionaryList);