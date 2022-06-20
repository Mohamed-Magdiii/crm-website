import React, { useState } from "react"; 
import {
  Modal, 
  ModalHeader,
  ModalBody, 
  Col,
  Row,
} from "reactstrap"; 
import QRCode from "qrcode.react"; 
// i18n
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function QrPukModal(props) {
  const { open, puk = "", onClose } = props;
  const [Copy, setCopy] = useState("Copy Puk");

  const CopyPuk = () => { 
    navigator.clipboard.writeText(puk);
    setCopy("Copied");
    setTimeout(() => {
      setCopy("Copy Puk");
    }, 2000);
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
            <Col className="md-2 d-flex justify-content-center ">
              <Link to="#" onClick={CopyPuk}>{Copy}</Link>   
            </Col> 
            <Col className="d-flex justify-content-center">
              {puk} 
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}

export default withTranslation()(QrPukModal);
