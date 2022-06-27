import React, { useState } from "react"; 
import {
  Modal, 
  ModalHeader,
  ModalBody, 
  Col,
  Row,
} from "reactstrap"; 
import FeatherIcon from "feather-icons-react";
import QRCode from "qrcode.react"; 
// i18n
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function QrPukModal(props) {
  const { open, puk = "", onClose } = props;
  // eslint-disable-next-line no-unused-vars
  const [Copy, setCopy] = useState("Copy Puk");

  const CopyPuk = () => { 
    navigator.clipboard.writeText(puk);
    setCopy("Copied");
  };
  return (
    <React.Fragment>
      <Modal isOpen={open} toggle={onClose} centered={true}>
        <ModalHeader toggle={onClose} tag="h4">
          {props.t("Address")}
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col className="d-flex justify-content-center">
              <QRCode size={300} value={puk} renderAs="canvas" />
            </Col>
          </Row>
          <br/>
          <br/>
          <Row>
            <Col>
              {puk} 
            </Col>
            <Col>
              <Link to="#" onClick={CopyPuk}>
                <FeatherIcon icon="copy" onClick={CopyPuk}/>
              </Link>   
            </Col> 
          </Row>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}

export default withTranslation()(QrPukModal);
