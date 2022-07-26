import { useDispatch, connect } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  UncontrolledAlert,
} from "reactstrap";
import { withTranslation } from "react-i18next";
import React from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { updateCountryStart } from "store/dictionary/actions";
function CountriesEdit(props){
  const { open, onClose, country = {} } = props;
  const dispatch = useDispatch();
  const { alpha2, alpha3, ar, en, callingCode } = country;
  return (
    <React.Fragment >
      
      <Modal isOpen={open} toggle={onClose} centered={true}>
        <ModalHeader toggle={onClose} tag="h4">
          {props.t("Edit Country")}
        </ModalHeader>
        <ModalBody >
          <AvForm
            className='p-4'
            onValidSubmit={(e, v) => {
              e.preventDefault();
              dispatch(updateCountryStart({
                value:v,
                body:{
                  countries :{ _id:country._id }
                }
              }));
            }}
          >
            
            
            <div className="mb-3">
              <AvField
                name="alpha2"
                label={props.t("Alpha2")}
                placeholder={props.t("Alpha2")}
                type="text"
                errorMessage={props.t("Enter valid alpha2")}
                value={props.t(alpha2)}
                validate={{ required: { value: true } }}
              />
            </div>
            <div className="mb-3">
              <AvField
                name="alpha3"
                label={props.t("Alpha3")}
                placeholder={props.t("Alpha3")}
                type="text"
                value = {props.t(alpha3)}
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
                value = {props.t(callingCode)}
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
                value = {props.t(ar)}
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
                value = {props.t(en)}
                errorMessage={props.t("Enter valid en")}
                validate={{ required: { value: true } }}
              />
            </div>
            
            <div className='text-center pt-3 p-2'>
              <Button disabled = {props.disableEditButton} type="submit" color="primary" className="">
                {props.t("Edit")}
              </Button>
            </div>
          </AvForm>
          {props.error && <UncontrolledAlert color="danger">
            <i className="mdi mdi-block-helper me-2"></i>
            {props.t(props.error)}
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
  editSuccess:state.dictionaryReducer.editSuccess,
  disableEditButton : state.dictionaryReducer.disableEditButton
});
export default connect(mapStateToProps, null)(withTranslation()(CountriesEdit));