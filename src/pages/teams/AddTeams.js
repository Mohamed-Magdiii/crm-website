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
import { addTeamsStart } from "./../../store/teams/actions";

function AddTeams(props) {
  const dispatch  = useDispatch();
  const [addModal, setAddMarkupModal] = useState(false);
  const [lobError, setLobError] = useState(false);
  const [file, setFile] = useState(false);
  const toggleAddModal = () => {
    setAddMarkupModal(!addModal);
  };
  useEffect(() => {
    if (!props.disableAddButton && open) {
      setAddMarkupModal(false);
    }
  }, [props.modalClear]);
  function formDataToJson(f) {
    return Object.fromEntries(Array.from(f.keys(), k =>
      k.endsWith("[]") ? [k.slice(0, -2), f.getAll(k)] : [k, f.get(k)]));
  }
  const addTeamMember = (e, values) => {
    e.preventDefault();
    const { image, ...data} = values;
    const formData = new FormData();
    const myData = JSON.stringify(data);
    formData.set("image", file);
    formData.set("data", myData);
    dispatch(addTeamsStart(formData));
  };
  const validateFile = (value, ctx, input, cb) => {
    const extensions = ["png", "jpg", "jpeg", "pdf"];
    const extension = value.split(".")[1];
    if (extensions.includes(extension) || !value) {
      if (!value || file.size <= 2097152) {
        cb(true);
      } else cb("2mb maximum size");
    } else cb("Only images or PDF can be uploaded");
  };
  return (
    <React.Fragment>
      <Link to="#" className={"btn btn-primary"} onClick={toggleAddModal}>
        <i className="bx bx-plus me-1"></i>
        {props.t("Add team member")}
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
              addTeamMember(e, v);
            }}
          >
            <Row>
              <div className="mb-3">
                <Label>Member Image</Label>
                <AvField
                  name="image"
                  type="file"
                  errorMessage={props.t("Please upload an image for the team")}
                  validate={{
                    required: { value: true },
                    custom: validateFile,
                  }}
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
           
            </Row>
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
                    name="name.en"
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
                    name="name.ar"
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

            <div className="text-center pt-3 p-2">
              <Button
                disabled={props.disableAddButton}
                type="submit"
                color="primary"
                className=""
              >
                {props.t("Add")}
              </Button>
            </div>
          </AvForm>
          {props.error && (
            <UncontrolledAlert color="danger">
              <i className="mdi mdi-block-helper me-2" />
              {props.t(props.error)}
            </UncontrolledAlert>
          )}
        </ModalBody>
        {props.successMessage && (
          <UncontrolledAlert color="success">
            <i className="mdi mdi-check-all me-2" />
            {props.t("LOB Group is updated successfully !!!")}
          </UncontrolledAlert>
        )}
      </Modal>
    </React.Fragment>
  );
}
const mapStateToProps = (state) => ({
  successMessage: state.teams.successMessage,
  error: state.teams.error,
  disableAddButton: state.teams.disableAddButton,
});
export default connect(mapStateToProps, null)(withTranslation()(AddTeams));
