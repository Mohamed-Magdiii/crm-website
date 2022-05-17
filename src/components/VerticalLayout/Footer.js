import React from "react";
import { Link } from "react-router-dom";
import {
  Container, Row, Col 
} from "reactstrap";
import * as content from "content";

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer">
        <Container fluid={true}>
          <Row>
            <Col md={6}>{new Date().getFullYear()} © {content.developedBy}.</Col>
            <Col md={6}>
              <div className="text-sm-end d-none d-sm-block">
                Design & Develop by
                <Link to="#" className="ms-1 text-decoration-underline">
                  {content.developedBy}
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
