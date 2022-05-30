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
import React, { useState, useEffect} from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { addNewItem } from "store/dictionary/actions";

function EmailProviderAdd(props){
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
      <Link to="#" className="btn btn-primary" onClick={toggleAddModal}><i className="bx bx-plus me-1"></i>Add New Email Provider</Link>
      <Modal isOpen={addModal} toggle={toggleAddModal} centered={true}>
        <ModalHeader toggle={toggleAddModal} tag="h4">
          Add New Email Provider
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
                name="emailProviders"
                label="Email Providers"
                placeholder="Email Providers"
                type="text"
                errorMessage="Enter valid email provider"
                validate={{ required: { value: true } }}
              />
            </div>
              
            
            <div className='text-center pt-3 p-2'>
              <Button  type="submit" color="primary" className="">
                     Add New Email Provider
              </Button>
            </div>
          </AvForm>
          {props.error && <UncontrolledAlert color="danger">
            <i className="mdi mdi-block-helper me-2"></i>
            {props.error}
          </UncontrolledAlert>}
          {props.showAddSuccessMessage && <UncontrolledAlert color="success">
            <i className="mdi mdi-check-all me-2"></i>
             Email Provider has been added successfully!
          </UncontrolledAlert>}
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}
const mapStateToProps = (state)=>({
  dictionary: state.dictionaryReducer.dictionary || [],
  error : state.dictionaryReducer.error,
  id :state.dictionaryReducer.id,
  showAddSuccessMessage:state.dictionaryReducer.showAddSuccessMessage
});
export default connect(mapStateToProps, null)(EmailProviderAdd);