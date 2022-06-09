import React, { useState } from "react";
import {
  Card,
  CardBody, 
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";

import OrderList from "./orders/OrdersList";
import ClientDetails from "./details/ClientDetails";
import ClientBank from "./bank/ClientBank";
import ClientTransactions from "./transactions/ClientTransactions";
import ClientWallets from "./wallets/ClientWallets";

function ClientTaps(props) {
  //   const clientId = props.clientId;
  const [activeTab1, setactiveTab1] = useState("1");
  const [clientId, setClientId] = useState(props?.match.params?.id);

  const toggle1 = (tab) => {
    if (activeTab1 !== tab) {
      setactiveTab1(tab);
    }
  };
  return (
    <React.Fragment>
      <div className="page-content">
        <Col>
          <Card> 
            <CardBody>
              <Nav pills className="navtab-bg nav-justified">
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: activeTab1 === "1",
                    })}
                    onClick={() => {
                      toggle1("1");
                    }}
                  >
                    Details
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: activeTab1 === "2",
                    })}
                    onClick={() => {
                      toggle1("2");
                    }}
                  >
                    Bank Account
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: activeTab1 === "3",
                    })}
                    onClick={() => {
                      toggle1("3");
                    }}
                  >
                    Transactions
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: activeTab1 === "4",
                    })}
                    onClick={() => {
                      toggle1("4");
                    }}
                  >
                    Wallets
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: activeTab1 === "5",
                    })}
                    onClick={() => {
                      toggle1("5");
                    }}
                  >
                    Orders
                  </NavLink>
                </NavItem>
              </Nav>

              <TabContent activeTab={activeTab1} className="p-3 text-muted">
                <TabPane tabId="1">
                  <Row>
                    <Col sm="12">
                      {(activeTab1 == "1") ? <ClientDetails clientId={clientId} /> : ""}   
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                  <Row>
                    <Col sm="12">
                      {(activeTab1 == "2") ? <ClientBank clientId={clientId} /> : ""}   
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="3">
                  <Row>
                    <Col sm="12">
                      {(activeTab1 == "3") ? <ClientTransactions clientId={clientId} /> : ""}   
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="4">
                  <Row>
                    <Col sm="12">
                      {(activeTab1 == "4") ? <ClientWallets clientId={clientId} /> : ""}  
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="5">
                  <Row>
                    <Col sm="12">
                      {(activeTab1 == "5") ? <OrderList clientId={clientId} /> : ""} 
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </Col>
      </div>
    </React.Fragment>
  );
}

export default ClientTaps;
