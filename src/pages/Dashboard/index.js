import React from "react";
import MetaTags from "react-meta-tags";

//import Breadcrumbs
import Breadcrumbs from "../../components/Common/Breadcrumb";
import * as content from "content";

import {
  Container, Row, Col 
} from "reactstrap";

import CountriesMap from "./CountriesMap";
import Reminders from "./Reminders";
import Sales from "./Sales";
import Referrals from "./Referrals";
import Requests from "./Requests";
import Leads from "./Leads";
import Clients from "./Clients";
import KYC from "./KYC";
import Transactions from "./Transactions";
import SalesTarget from "./SalesTarget";


const Dashboard = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Dashboard | CRM Crypto - {content.clientName}</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Dashboard" breadcrumbItem="Dashboard" />
          <Row className="col-card-same-height">
            <Col sm={6} xs={12} className="col mb-4">
              <CountriesMap />
            </Col>
            <Col sm={6} xs={12} className="col mb-4">
              <Reminders />
            </Col>
          </Row>
          <Row className="col-card-same-height">
            <Col sm={6} xs={12} className="col mb-4">
              <Sales />
            </Col>
            <Col sm={6} xs={12} className="col mb-4">
              <Referrals />
            </Col>
          </Row>
          <Row className="col-card-same-height">
            <Col sm={6} xs={12} className="col mb-4">
              <Requests />
            </Col>
            <Col sm={3} className="col mb-4">
              <Leads />
            </Col>
            <Col sm={3} className="col mb-4">
              <Clients />
            </Col>
          </Row>
          <Row className="col-card-same-height">
            <Col sm={6} xs={12} className="col mb-4">
              <Transactions />
            </Col>
            <Col sm={6} xs={12} className="col mb-4">
              <KYC />
            </Col>
          </Row>
          <Row>
            <Col sm={12} xs={12} className="col mb-4">
              <SalesTarget />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;