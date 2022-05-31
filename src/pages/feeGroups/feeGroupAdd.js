
import { useDispatch, connect } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  UncontrolledAlert,
  Col,
  Row
} from "reactstrap";

import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { withTranslation } from "react-i18next";
import { addFeesGroupStart } from "store/feeGroups/actions";
function feeGroupAdd(props) {

  const [addModal, setAddUserModal] = useState(false);

  const dispatch = useDispatch();
  
  const handleAddFeesGroup = (event, values)=>{
    event.preventDefault();
    dispatch(addFeesGroupStart(values));
  }; 

  const toggleAddModal = () => {
    setAddUserModal(!addModal);
  };

  useEffect(()=>{
    if (props.successMessage  && addModal) {

      
    }
  }, [props.successMessage]);

  return (
    <React.Fragment >
      <Link to="#" className="btn btn-primary" onClick={toggleAddModal}>
        <i className="bx bx-plus me-1"/> 
        {props.t("Add New Fees Group")}
      </Link>
      <Modal isOpen={addModal} toggle={toggleAddModal} centered={true}>
        <ModalHeader toggle={toggleAddModal} tag="h4">
          {props.t("Add New Fees Group")}
        </ModalHeader>
        <ModalBody >
          <AvForm
            className='p-4'
            onValidSubmit={(e, v) => {
              handleAddFeesGroup(e, v);
            }}
          >
            <Row>
              <Col md="6">
                <div className="mb-3">
                  <AvField
                    name="value"
                    label={props.t("Value")}
                    placeholder={props.t("value")}
                    type="text"
                    errorMessage={props.t("Enter valid fees group value")}
                    validate={{ required: { value: true } }}
                  />
                </div>
              </Col>
              <Col md="6"> 
                <div className="mb-3">
                  <AvField
                    name="minValue"
                    label={props.t("Min value")}
                    placeholder={props.t("min value")}
                    type="text"
                    errorMessage={props.t("Enter valid min fees group value")}
                    validate={{ required: { value: true } }}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <div className="mb-3">
                  <AvField
                    name="maxValue"
                    label={props.t("Max Value")}
                    placeholder={props.t("Max Value")}
                    type="text"
                    errorMessage={props.t("Enter Valid max feees group value")}
                    validate={{ required: { value: true } }}
                  />
                </div>
              </Col>
              <Col md="6">
                <div className="mb-3">
                  <AvField
                    name="title"
                    label={props.t("Title")}
                    placeholder={props.t("title")}
                    type="text"
                    errorMessage={props.t("Enter Valid title")}
                    validate={{ required: { value: true } }}
                  />
                </div>
              </Col>
            </Row> 
            <div className="mb-3">
              <AvField
                name="isPercentage"
                label={props.t("Is Percentage")}
                placeholder={props.t("Password")}
                type="select"
                errorMessage={props.t("Please Select a value")}
                validate={{ required: { value: true } }}
              >
                <option>true</option>
                <option>false</option>
              </AvField>
            </div>
            
            <div className='text-center pt-3 p-2'>
              <Button  type="submit" color="primary" className="">
                {props.t("Add New Fees Group")}
              </Button>
            </div>
          </AvForm>
          {
            props.error && (
              <UncontrolledAlert color="danger">
                <i className="mdi mdi-block-helper me-2"/>
                {props.t(props.error)}
              </UncontrolledAlert>
            )
          }
          {
            props.successMessage && (
              <UncontrolledAlert color="success">
                <i className="mdi mdi-check-all me-2"/>
                {props.t("New Fees Group is added successfully !!!")}
              </UncontrolledAlert>
            )
          }
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  error: state.feeGroupReducer.error,
  successMessage: state.feeGroupReducer.successMessage,
});

export default connect(mapStateToProps, null)(withTranslation()(feeGroupAdd));