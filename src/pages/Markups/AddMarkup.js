import React, { useState, useEffect } from "react";
import {
  useDispatch, connect
} from "react-redux";
import {
  Row, Col,
  Modal, Button,
  ModalHeader,
  ModalBody,
  UncontrolledAlert,
} from "reactstrap";
import {
  AvForm, AvField, AvInput,
} from "availity-reactstrap-validation";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { addMarkupStart } from "../../store/markups/actions";

function AddMarkup(props) {

  const [addModal, setAddMarkupModal] = useState(false);
  const dispatch = useDispatch();
  const { create } = props.markupsPermissions ;
  const toggleAddModal = () => {
    setAddMarkupModal(!addModal);
  };

  const handleAddMarkup = (e, v) => {   
    e.preventDefault();  
    dispatch(addMarkupStart(v));
  };

  useEffect(() => {
    if (!props.addMarkupSuccessMessage && addModal) {
      setAddMarkupModal(false);
    }
  }, [props.addMarkupSuccessMessage]);

  return (
    <React.Fragment >
      <Link to="#" className={`btn btn-light ${!create ? "d-none" : ""}`} onClick={toggleAddModal}><i className="bx bx-plus me-1"></i>{props.t("Add New Markup")}</Link>
      <Modal isOpen={addModal} toggle={toggleAddModal} centered={true}>
        <ModalHeader toggle={toggleAddModal} tag="h4">
          {props.t("Add Markup")}
        </ModalHeader>
        <ModalBody >
          <AvForm
            className='p-4'
            onValidSubmit={(e, v) => {
              handleAddMarkup(e, v);
            }}
          >
            <Row>
              <Col md="6">
                <div className="mb-3">
                  <AvField
                    name="title"
                    label={props.t("Title")}
                    placeholder={props.t("Title")}
                    type="text"
                    errorMessage={props.t("Enter title of the markup")}
                    validate={{ required: { value: true } }}
                  />
                </div>
              </Col>
              <Col md="6">
                <div className="mb-3">
                  <AvField
                    name="value"
                    label={props.t("Value")}
                    placeholder={props.t("Value")}
                    type="text"
                    errorMessage={props.t("Enter Value")}
                    validate={{ required: { value: true } }}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <AvInput type="checkbox" name="isPercentage" validate={{ required: { value: false } }} /> is it precentage?
              </Col>
            </Row>
            <div className='text-center pt-3 p-2'>
              <Button disabled={props.addLoading} type="submit" color="primary" className="">
                {props.t("Add Markup")}
              </Button>
            </div>
          </AvForm>
          {props.error && <UncontrolledAlert color="danger">
            <i className="mdi mdi-block-helper me-2"></i>
            {props.t(props.error)}
          </UncontrolledAlert>}
          {props.addMarkupSuccessMessage && props.addMarkupSuccessMessage.length > 0 && <UncontrolledAlert color="success">
            <i className="mdi mdi-check-all me-2"></i>
            {props.t(props.addMarkupSuccessMessage)}
          </UncontrolledAlert>}
        </ModalBody>
      </Modal>
    </React.Fragment>);
}
const mapStateToProps = (state) => ({
  error: state.markupsReducer.error,
  addMarkupSuccessMessage: state.markupsReducer.addMarkupSuccessMessage,
  markupsPermissions : state.Profile.markupsPermissions || {}
});
export default connect(mapStateToProps, null)(withTranslation()(AddMarkup));
