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
import { updateEmailProviderStart } from "store/dictionary/actions";
function EmailProviderEdit(props){
  const { open, onClose, selectedEmailProvider = {} } = props;
  const dispatch = useDispatch();
  const { emailProviders } = selectedEmailProvider;

  return (
    <React.Fragment >
      
      <Modal isOpen={open} toggle={onClose} centered={true}>
        <ModalHeader toggle={onClose} tag="h4">
          {props.t("Edit Email Provider")}
        </ModalHeader>
        <ModalBody >
          <AvForm
            className='p-4'
            onValidSubmit={(e, v) => {
              e.preventDefault();
              const { newEmailProvider } = v;
              dispatch(updateEmailProviderStart({
                body:selectedEmailProvider,
                value:newEmailProvider
              }));
            }}
          >
            
            <div className="mb-3">
              <AvField
                name="newEmailProvider"
                label={props.t("Email Provider")}
                placeholder={props.t("Enter Email Provider")}
                type="text"
                value = {emailProviders}
                errorMessage={props.t("Enter valid Email Provider")}
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
            {props.error}
          </UncontrolledAlert>}
          {props.editSuccess && <UncontrolledAlert color="success">
            <i className="mdi mdi-check-all me-2"></i>
            {props.t("Email Provider has been updated successfully!")}
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
  editSuccess: state.dictionaryReducer.editSuccess,
  disableEditButton : state.dictionaryReducer.disableEditButton
});
export default connect(mapStateToProps, null)(withTranslation()(EmailProviderEdit));