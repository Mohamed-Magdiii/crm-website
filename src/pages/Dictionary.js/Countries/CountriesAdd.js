import { useDispatch, connect } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  UncontrolledAlert,
} from "reactstrap";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { addNewItem } from "store/dictionary/actions";
function CountriesAdd(props){
  const [addModal, setAddModal] = useState(false);
  const dispatch = useDispatch();
  const { create } = props.dictionariesPermissions;
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
      <Link to="#" className={`btn btn-primary ${!create ? "d-none" : ""}`} onClick={toggleAddModal}><i className="bx bx-plus me-1"></i>{props.t("Add New Country")}</Link>
      <Modal isOpen={addModal} toggle={toggleAddModal} centered={true}>
        <ModalHeader toggle={toggleAddModal} tag="h4">
          {props.t("Add New Country")}
        </ModalHeader>
        <ModalBody >
          <AvForm
            className='p-4'
            onValidSubmit={(e, v) => {
              e.preventDefault();
              
              dispatch(addNewItem(props.id, { countries: { ...v } }));
            }}
          >
            
            
            <div className="mb-3">
              <AvField
                name="alpha2"
                label={props.t("Alpha2")}
                placeholder={props.t("Alpha2")}
                type="text"
                errorMessage={props.t("Enter valid alpha2")}
                validate={{ required: { value: true } }}
              />
            </div>
            <div className="mb-3">
              <AvField
                name="alpha3"
                label={props.t("Alpha3")}
                placeholder={props.t("Alpha3")}
                type="text"
                errorMessage={props.t("Enter valid alpha3")}
                validate={{ required: { value: true } }}
              />
            </div>
            <div className="mb-3">
              <AvField
                name="callingCode"
                label={props.t("Calling Code")}
                placeholder={props.t("Calling Code")}
                type="text"
                errorMessage={props.t("Enter valid calling code")}
                validate={{ required: { value: true } }}
              />
            </div>
            <div className="mb-3">
              <AvField
                name="ar"
                label={props.t("Ar")}
                placeholder={props.t("AR")}
                type="text"
                errorMessage={props.t("Enter valid ar")}
                validate={{ required: { value: true } }}
              />
            </div>
            <div className="mb-3">
              <AvField
                name="en"
                label={props.t("EN")}
                placeholder={props.t("en")}
                type="text"
                errorMessage={props.t("Enter valid en")}
                validate={{ required: { value: true } }}
              />
            </div>
            
            <div className='text-center pt-3 p-2'>
              <Button  type="submit" color="primary" className="">
                {props.t("Add New Country")}
              </Button>
            </div>
          </AvForm>
          {props.error && <UncontrolledAlert color="danger">
            <i className="mdi mdi-block-helper me-2"></i>
            {props.t(props.editError)}
          </UncontrolledAlert>}
          {props.showAddSuccessMessage && <UncontrolledAlert color="success">
            <i className="mdi mdi-check-all me-2"></i>
            {props.t("Country has been added successfully!")}
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
  showAddSuccessMessage:state.dictionaryReducer.showAddSuccessMessage,
  dictionariesPermissions :state.Profile.dictionariesPermissions || {}
});
export default connect(mapStateToProps, null)(withTranslation()(CountriesAdd));