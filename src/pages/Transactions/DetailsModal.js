import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody
} from "reactstrap";
import { captilazeFirstLetter } from "common/utils/manipulateString";
import { withTranslation } from "react-i18next";
function DetailsModal(props){
  const { rawData, open, onClose } = props;
  
  return (
    <React.Fragment>
      <div>
        <Modal isOpen= {open} toggle = {onClose} centered = {true} size = {"lg"}>
          <ModalHeader toggle = {onClose} tag="h4">
            {props.t("Details")}
          </ModalHeader>
          <ModalBody>
            <div >
              {Object.keys(rawData).length > 0 ? Object.keys(rawData).map(key => {
                return <p className="paragraph" key={rawData[key]}>{`${captilazeFirstLetter(props.t(key))} : ${props.t(rawData[key])}`}</p>;
              }) : "" }
            </div>
          </ModalBody>
        </Modal>
      </div>
    </React.Fragment>
  );
}
export default withTranslation()(DetailsModal);