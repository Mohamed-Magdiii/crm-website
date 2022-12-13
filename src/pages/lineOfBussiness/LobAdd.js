import React, { useState, useEffect } from "react";
import { AvForm } from "availity-reactstrap-validation";
import { AvField } from "availity-reactstrap-validation";
import { connect } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  UncontrolledAlert,
  Col,
  Row,
  Collapse,
  Label,
} from "reactstrap";

import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addLOBStart } from "./../../store/lob/actions";
function LobAdd(props) {
  const [addModal, setAddMarkupModal] = useState(false);
  const dispatch = useDispatch();
  const toggleAddModal = () => {
    setAddMarkupModal(!addModal);
  };
  useEffect(() => {
    if (open ){
      setAddMarkupModal(false);
    }
  }, [props.modalClear]);
  
  const [type, setChangeType] = useState("INDIVIDUAL");
  const addLobGroup = (e, val) => {
    e.preventDefault();
    dispatch(addLOBStart(val));
  };
  return (
    <React.Fragment>
      <Link to="#" className={"btn btn-primary"} onClick={toggleAddModal}>
        <i className="bx bx-plus me-1"></i>
        {props.t("Add New LOB")}
      </Link>
      <Modal
        size="lg"
        isOpen={addModal}
        toggle={toggleAddModal}
        centered={true}
      >
        <ModalHeader toggle={toggleAddModal} tag="h4">
          {props.t("Add")}
        </ModalHeader>
        <ModalBody>
          <AvForm
            className="p-4"
            onValidSubmit={(e, v) => {
              addLobGroup(e, v);
            }}
          >
            <Row>
              <Col md="6">
                <div className="mb-3">
                  <AvField
                    name="title.en"
                    label={props.t("Title")}
                    placeholder={props.t("Enter English Title")}
                    type="text"
                    value=""
                    errorMessage={props.t("Enter Valid title")}
                    validate={{ required: { value: true } }}
                  />
                </div>
              </Col>
              <Col md="6">
                <div className="mb-3">
                  <AvField
                    name="title.ar"
                    label={props.t("Title")}
                    placeholder={props.t("Enter Arabic Title")}
                    type="text"
                    value=""
                    errorMessage={props.t("Enter Valid title")}
                    validate={{ required: { value: true } }}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <div className="mb-3">
                  <AvField
                    name="description.en"
                    label={props.t("Description English")}
                    placeholder={props.t("Enter English Description")}
                    type="textarea"
                    value=""
                    rows={5}
                    cols={5}
                    errorMessage={props.t("Enter Valid description")}
                    validate={{ required: { value: true } }}
                  />
                </div>
              </Col>
              <Col md="6">
                <div className="mb-3">
                  <AvField
                    name="description.ar"
                    label={props.t("Description Arabic")}
                    placeholder={props.t("Enter Descriptionb Arabic")}
                    type="textarea"
                    value=""
                    rows={5}
                    cols={5}
                    errorMessage={props.t("Enter Valid description")}
                    validate={{ required: { value: true } }}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <div className="mb-3">
                  <AvField type="select" name="type" value={type} label="Type" onChange={(e) => setChangeType(e.target.value)} helpMessage="Please choose type assigned to Line of Bussiness">
                    <option value={"INDIVIDUAL"}>Individual</option>
                    <option value={"CORPORATE"}>Corporate</option>
                  </AvField>
                </div>
              </Col>
            </Row>
            <div className="text-center pt-3 p-2">
              <Button type="submit" color="primary" className="">
                {props.t("Add")}
              </Button>
            </div>
          </AvForm>
          {/* {
          props.error && (
            <UncontrolledAlert color="danger">
              <i className="mdi mdi-block-helper me-2" />
              {props.t(props.error)}
            </UncontrolledAlert>
          )
        } */}
         
        </ModalBody>
        {/* {props.successMessage && (
          <UncontrolledAlert color="success">
            <i className="mdi mdi-check-all me-2" />
            {props.t("LOB Group is updated successfully !!!")}
          </UncontrolledAlert>
        )} */}
      </Modal>
    </React.Fragment>
  );
}

const mapStateToProps = (state)=>({
  successMessage:state.lob.successMessage,
  modalClear:state.lob.modalClear,
  disableAddButton : state.lob.disableAddButton,

});
export default connect(mapStateToProps, null)(withTranslation()(LobAdd));
