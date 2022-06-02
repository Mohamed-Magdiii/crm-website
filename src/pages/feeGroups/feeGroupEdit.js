
import { useDispatch, connect } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  UncontrolledAlert,
  Col,
  Row,
  Label
} from "reactstrap";

import React, { useState, useEffect } from "react";
import { 
  AvForm, 
  AvField,
  
} from "availity-reactstrap-validation";
import { withTranslation } from "react-i18next";
import { editFeeGroupStart } from "store/feeGroups/actions";
function feeGroupAdd(props) {
  
  const { open, selectedItem = {}, onClose, disabled } = props;
  
  
  const [isPercentage, setIsPercentage] = useState();
  useEffect(()=>{
    setIsPercentage(selectedItem.isPercentage);
  }, [selectedItem.isPercentage]);
  const dispatch = useDispatch();
  const updateFeeGroup = (event, values)=>{
    event.preventDefault();
    dispatch(editFeeGroupStart(selectedItem._id, values
    ));
  };
  return (
    <React.Fragment >
      
      <Modal isOpen={open} toggle={onClose} centered={true}>
        <ModalHeader toggle={onClose} tag="h4">
          {props.t("Update Fee Group")}
        </ModalHeader>
        <ModalBody >
          <AvForm
            className='p-4'
            onValidSubmit={(e, v) => {
              updateFeeGroup(e, {
                ...v,
                isPercentage:isPercentage
              });
            }}
          >
            <Row>
              <Col md="6">
                <div className="mb-3">
                  <AvField
                    name="title"
                    label={props.t("Title")}
                    placeholder={props.t("title")}
                    type="text"
                    value = {selectedItem.title}
                    errorMessage={props.t("Enter Valid title")}
                    validate={{ required: { value: true } }}
                  />
                </div>
              </Col>
              <Col md="6">
                <div className="mb-3">
                  <AvField
                    name="value"
                    label={props.t("Value")}
                    placeholder={props.t("value")}
                    type="text"
                    value={selectedItem.value}
                    errorMessage={props.t("Enter valid fees group value")}
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
                    value= {selectedItem.maxValue}
                    errorMessage={props.t("Enter Valid max feees group value")}
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
                    value={selectedItem.minValue}
                    errorMessage={props.t("Enter valid min fees group value")}
                    validate={{ required: { value: true } }}
                  />
                </div>
              </Col>
            </Row> 
          
            <div className="mb-3">
            
              <input 
                checked={isPercentage}
                type="checkbox"
                name="isPercentage"
                onChange={()=>setIsPercentage(preValue=>!preValue)} 
                value={isPercentage ? "True" : "False"} />
              <Label check for="isPercentage">Is Percentage</Label>
        
            </div>
          
            <div className='text-center pt-3 p-2'>
              <Button  disabled={disabled} type="submit" color="primary" className="">
                {props.t("Update Fee Group")}
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
            props.showEditSuccessMessage && (
              <UncontrolledAlert color="success">
                <i className="mdi mdi-check-all me-2"/>
                {props.t("Fees Group is updated successfully !!!")}
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
  showEditSuccessMessage: state.feeGroupReducer.showEditSuccessMessage,
});

export default connect(mapStateToProps, null)(withTranslation()(feeGroupAdd));