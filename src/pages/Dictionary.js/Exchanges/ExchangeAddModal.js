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
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { addNewItem } from "store/dictionary/actions";
function ExchangeAddModal(props){
  const [addModal, setAddModal] = useState(false);
  const dispatch = useDispatch();
  const toggleAddModal = ()=>{
    setAddModal(preValue => !preValue);
  };
  useEffect(()=>{
    if (!props.showAddSuccessMessage && addModal){
      setAddModal(false);
    }
  }, [props.showAddSuccessMessage]);
  return (
    <React.Fragment >
      <Link to="#" className="btn btn-primary" onClick={toggleAddModal}><i className="bx bx-plus me-1"></i>{("Add New Exchange")}</Link>
      <Modal isOpen={addModal} toggle={toggleAddModal} centered={true}>
        <ModalHeader toggle={toggleAddModal} tag="h4">
          Add New Exchange
        </ModalHeader>
        <ModalBody >
          <AvForm
            className='p-4'
            onValidSubmit={(e, v) => {
              e.preventDefault();
              dispatch(addNewItem(props.id, v));
            }}
          >
            
            
            <div className="mb-3">
              <AvField
                name="exchanges"
                label={"Exchanges"}
                placeholder="Exchanges"
                type="text"
                errorMessage="Enter valid exchange"
                validate={{ required: { value: true } }}
              />
            </div>
              
            
            <div className='text-center pt-3 p-2'>
              <Button  type="submit" color="primary" className="">
                     Add new Exchange
              </Button>
            </div>
          </AvForm>
          {props.error && <UncontrolledAlert color="danger">
            <i className="mdi mdi-block-helper me-2"></i>
            {props.error}
          </UncontrolledAlert>}
          {props.showAddSuccessMessage && <UncontrolledAlert color="success">
            <i className="mdi mdi-check-all me-2"></i>
             Exchange has been added successfully!
          </UncontrolledAlert>}
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}
const mapStateToProps = (state)=>({
  loading: state.dictionaryReducer.loading || false,
  dictionary: state.dictionaryReducer.dictionary || [],
  error : state.dictionaryReducer.error,
  id :state.dictionaryReducer.id,
  showAddSuccessMessage:state.dictionaryReducer.showAddSuccessMessage
});
export default connect(mapStateToProps, null)(ExchangeAddModal);