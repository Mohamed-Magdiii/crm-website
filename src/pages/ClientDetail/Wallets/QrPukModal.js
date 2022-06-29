import React from "react";
import { 
  Modal, 
  ModalHeader, 
  ModalBody, 
  Col, 
  Row 
} from "reactstrap";
import FeatherIcon from "feather-icons-react";
import QRCode from "qrcode.react";
// i18n
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { showSuccessNotification } from "store/notifications/actions";
import { useDispatch } from "react-redux";

function QrPukModal(props) {
  const { open, puk = "", onClose } = props;
  const dispatch = useDispatch();

  const showNotification = (message = "") => {
    dispatch(showSuccessNotification(message));
  };
  const CopyPuk = () => {
    navigator.clipboard.writeText(puk);
    showNotification("Copied Successfully");
  };
  return (
    <React.Fragment>
      <Modal isOpen={open} toggle={onClose} centered={true}>
        <ModalHeader toggle={onClose} tag="h4">
          {props.t("Address")}
        </ModalHeader>
        <ModalBody>
          <div className="container">
            <Row className=" ">
              <Col className="d-flex justify-content-center ">
                <QRCode size={300} value={puk} renderAs="canvas" />
              </Col>
            </Row>
            <br />
            <br />
            <Row>
              <Col md="9" style={{ wordWrap: "break-word" }}  >
                {puk} 
              </Col>
              <Col md="3" className="d-flex justify-content-center ">
                <Link to="#" onClick={CopyPuk}>
                  <FeatherIcon icon="copy" />
                </Link>
                <br/>
              </Col>
            </Row>
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}

export default withTranslation()(QrPukModal);
