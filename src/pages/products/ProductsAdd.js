
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
import  Select  from "react-select";
import { fetchLOBStart } from "./../../store/lob/actions";
import { addProductStart } from "./../../store/products/actions";

function ProductsAdd(props){
  const [addModal, setAddMarkupModal] = useState(false);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [lobError, setLobError] = useState(false);
  const [lob, setLOB] = useState();
  const dispatch = useDispatch();
  const toggleAddModal = () => {
    setAddMarkupModal(!addModal);
  };
  useEffect(() => {
    if (open ){
      setAddMarkupModal(false);
    }
  }, [props.modalClear]);

  useEffect(() => {
    loadLOB(1, sizePerPage);
  }, [sizePerPage, 1, props.editSuccess ]);
  const loadLOB = (page, limit) => {
    dispatch(fetchLOBStart({}));
  };
  
  const addLobGroup = (e, val) => {
    e.preventDefault();
    console.log(val);
    lobError && dispatch(addProductStart({
      ...val,
      product:lob 
    }));
  };
  return (
    <React.Fragment>
      <Link to="#" className={"btn btn-primary"} onClick={toggleAddModal}>
        <i className="bx bx-plus me-1"></i>
        {props.t("Add New Product")}
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
              console.log(lobError);
              if (lobError){
                addLobGroup(e, v);
              }
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
                <Select 
                  required
                  onChange={(e) => {
                    setLOB(e.value); 
                    setLobError(e.value);
                  }}
                  isSearchable = {true}
                  options={props.lob.map((item) => (
                    {
                      label : `${item.title.en}`,
                      value : `${item._id}`
                    }
                  ))}
                  classNamePrefix="select2-selection"
                  placeholder={props.t("Choose LOB")}    
                />
                {!lobError && <small className="text-danger">{props.t("Choose Valid Lob")}</small>}
              </Col>
            </Row>
            <div className="text-center pt-3 p-2">
              <Button type="submit" color="primary" className="">
                {props.t("Add")}
              </Button>
            </div>
          </AvForm>
          {
            props.error && (
              <UncontrolledAlert color="danger">
                <i className="mdi mdi-block-helper me-2" />
                {props.t(props.error)}
              </UncontrolledAlert>
            )
          }
           
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
  lob: state.lob.docs,
  successMessage: state.products.successMessage,
  error:state.products.error
});
export default connect(mapStateToProps, null)(withTranslation()(ProductsAdd));